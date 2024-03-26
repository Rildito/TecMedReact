import { Link, useLocation } from "react-router-dom";
import { createRef, useState } from "react";

// import InformacionCuenta from "../components/InformacionCuenta";
// import InformacionPersonal from "../components/InformacionPersonal";

import useProyect from "../hooks/useProyect";
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";

export default function Registro() {

    const { cargando } = useProyect();
    const { register } = useAuth()

    const [tipoUsuario, setTipoUsuario] = useState('estudiante');

    const [errores, setErrores] = useState()
    const [file, setFile] = useState(null)

    const nameRef = createRef()
    const apellidoPatRef = createRef()
    const apellidoMatRef = createRef()
    const dateRef = createRef()
    const ciRef = createRef()
    const ruRef = createRef()
    const mencionRef = createRef()
    const passwordRef = createRef()
    const password_ConfirmationRef = createRef()
    const emailRef = createRef()
    const gradoRef = createRef()

    const handleFileSelect = (e) => {
        // console.log(e)
        setFile(e.target.files[0])
    }
    const handleSubmit = e => {

        e.preventDefault()
        setErrores([])
        if (gradoRef.current?.value === '' && tipoUsuario === 'colaborador') {
            setErrores(['El grado academico es obligatorio'])
            return
        }

        const datos = {
            name: tipoUsuario === 'colaborador' ? gradoRef.current.value + ' ' + nameRef.current.value : nameRef.current.value,
            app: apellidoPatRef.current.value,
            apm: apellidoMatRef.current.value,
            date: dateRef.current.value,
            ci: ciRef.current.value,
            ru: ruRef.current?.value || 'Sin registro',
            perfil: file,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: password_ConfirmationRef.current.value,
            mencion: mencionRef.current?.value || 'Sin mencion',
            tipo: tipoUsuario
        }
        register(datos, setErrores)

    }

    return (
        <>
            <form
                className="max-w-[550px] w-full mx-auto bg-gray-900 p-5 rounded-lg mt-5"
                noValidate
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <h2 className="text-4xl text-yellow-500 font-bold text-center mb-3">Registrarse</h2>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <fieldset className="border border-solid border-yellow-300 px-3 pb-3 mb-3 rounded-lg">
                    <legend className="text-sm text-yellow-500 px-3 font-bold">Información personal</legend>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label className="text-gray-200" htmlFor="name">Nombres</label>
                        <input
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ej. Ana Carolina"
                            ref={nameRef}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-2">
                        <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                            <label className="text-gray-200" htmlFor="app">Apellido paterno</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                type="text"
                                id="app"
                                name="app"
                                placeholder="Ej. Perez"
                                ref={apellidoPatRef}
                            />
                        </div>
                        <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                            <label className="text-gray-200" htmlFor="apm">Apellido materno</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                type="text"
                                id="apm"
                                name="apm"
                                placeholder="Ej. Flores"
                                ref={apellidoMatRef}
                            />
                        </div>
                    </div>
                    {
                        tipoUsuario == 'colaborador' &&

                        <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                            <label className="text-gray-200" htmlFor="grado">Grado academico</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                type="text"
                                id="grado"
                                name="grado"
                                placeholder="Ej. 1778612"
                                ref={gradoRef} />
                        </div>

                    }
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                        <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                            <label className="text-gray-200" htmlFor="date">Fecha de nacimiento</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                type="date"
                                id="date"
                                name="date"
                                ref={dateRef}
                            />
                        </div>
                        <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                            <label className="text-gray-200" htmlFor="ci">Carnet de identidad</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                type="text"
                                id="ci"
                                name="ci"
                                placeholder="Ej. 815214 - 1231921-e"
                                ref={ciRef}
                            />
                        </div>
                    </div>


                    <p className="text-gray-200">Elige el tipo de usuario</p>
                    <div className="flex justify-around mt-2">
                        <button
                            type="button"
                            className={`${tipoUsuario == 'estudiante' ? 'bg-blue-500' : 'bg-blue-300'} font-bold p-2 rounded-lg`}
                            onClick={() => setTipoUsuario('estudiante')}
                        >Estudiante</button>
                        {/* <button
                            type="button"
                            className={`${tipoUsuario == 'colaborador' ? 'bg-blue-500' : 'bg-blue-300'} font-bold p-2 rounded-lg`}
                            onClick={() => setTipoUsuario('colaborador')}
                        >Colaborador</button> */}
                        <button
                            type="button"
                            className={`${tipoUsuario == 'administrativo' ? 'bg-blue-500' : 'bg-blue-300'} font-bold p-2 rounded-lg`}
                            onClick={() => setTipoUsuario('administrativo')}
                        >Administrativo</button>
                    </div>



                    {
                        tipoUsuario == 'estudiante' &&
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                            <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                                <label className="text-gray-200" htmlFor="ru">Registro Universitario</label>
                                <input
                                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                    type="text"
                                    id="ru"
                                    name="ru"
                                    placeholder="Ej. 1778612"
                                    ref={ruRef} />
                            </div>

                            <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                                <label className="text-gray-200" htmlFor="ref">Mención</label>
                                <select className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" ref={mencionRef} name="mencion" id="ref">
                                    <option value="">Elige una mencion</option>
                                    <option value="1">Bioimagenología</option>
                                    <option value="2">Laboratorio clínico</option>
                                    <option value="3">Fisioterapia y Kinesiología</option>
                                </select>

                            </div>
                        </div>
                    }

                    <div className="flex flex-col text-gray-400 py-2">
                        <label className="text-gray-200" htmlFor="perfil">Foto de perfil</label>
                        <input
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white w-full"
                            type="file"
                            id="perfil"
                            name="perfil"
                            accept=".jpeg,.jpg,.png"
                            onChange={handleFileSelect}
                        />
                    </div>
                </fieldset>

                <fieldset className="border border-solid border-yellow-300 px-3 pb-3 mb-3 rounded-lg">
                    <legend className="text-sm text-yellow-500 px-3 py-2 font-bold">Información de cuenta</legend>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label className="text-gray-200" htmlFor="password">Contraseña</label>
                        <input
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu contraseña"
                            ref={passwordRef}
                        />
                    </div>

                    <div className="flex flex-col text-gray-400 py-2">
                        <label className="text-gray-200" htmlFor="password_confirmation">Confirmar contraseña</label>
                        <input
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Repite la contraseña"
                            ref={password_ConfirmationRef}
                        />
                    </div>

                    <div className="flex flex-col text-gray-400 py-2">
                        <label className="text-gray-200" htmlFor="email">Email</label>
                        <input
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ej. pedro124@gmail.com"
                            ref={emailRef}
                        />
                    </div>
                </fieldset>

                <button type="submit" className="w-full p-3  bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-bold rounded" disabled={cargando}>
                    Registrarse
                </button>

            </form >
            <nav className="text-center my-3">
                <Link to="/auth/login">
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>

        </>

    )
}
