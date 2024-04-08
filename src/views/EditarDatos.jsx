import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProyect from "../hooks/useProyect";
import Alerta from "../components/Alerta";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Cargando from "../components/Cargando";
import { toast } from 'react-toastify'

export default function EditarDatos() {

    const navigate = useNavigate();
    const { cargando, editarUsuario, usuarioLogin } = useProyect();
    const [tipoUsuario, setTipoUsuario] = useState('estudiante');

    const [errores, setErrores] = useState()
    const [file, setFile] = useState({})
    const [nombre, setNombre] = useState('');
    const [apellidoPat, setApellidoPat] = useState('');
    const [apellidoMat, setApellidoMat] = useState('');
    const [date, setDate] = useState('');
    const [ci, setCi] = useState('');
    const [ru, setRu] = useState('');
    const [mencion, setMencion] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');


    const handleFileSelect = (e) => {
        // console.log(e)
        setFile(e.target.files[0])
    }
    const handleSubmit = async e => {

        let resultado = false
        e.preventDefault()

        const datos = {
            name: nombre,
            app: apellidoPat,
            apm: apellidoMat,
            date,
            ci,
            ru: ru || 'Sin registro',
            perfil: file,
            email,
            password,
            password_confirmation: passwordConfirmation,
            mencion: mencion || 'Sin mencion',
            tipo: tipoUsuario,
            id: usuarioLogin.id
        }
        resultado = await editarUsuario(datos, setErrores)

        if (resultado) {
            navigate(-1)
            toast.success('Vera los cambios en el proximo inicio de sesión')
        }
    }

    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios(`/api/users/${usuarioLogin.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR(`/api/users/${usuarioLogin.id}`, fetcher)

    useEffect(() => {
        if (!isLoading) {
            setNombre(data.nombres);
            setApellidoPat(data.apellidoPaterno);
            setApellidoMat(data.apellidoMaterno);
            setDate(data.fechaNacimiento);
            setCi(data.ci);
            setRu(data.student?.ru || '');
            setMencion(data.student?.mention_id || '');
            setEmail(data.email);
            setTipoUsuario(data.tipo)
        }

    }, [isLoading, data])

    if (isLoading) return <Cargando />

    return (
        <>
            <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between p-2 rounded-lg shadow-2xl bg-white">
                <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between w-full lg:mr-5">
                    <p className="font-black md:text-4xl text-3xl text-blue-950 capitalize md:mr-3 text-center">Ajustes</p>
                    <Link
                        to={-1}
                        className='bg-blue-950 text-white font-black p-3 rounded-lg flex gap-1 items-center'
                    >Volver  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg></Link>
                </div>
            </div>
            <>
                <form
                    className="max-w-[550px] w-full mx-auto bg-gray-900 p-5 rounded-lg mt-5"
                    noValidate
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    id="formRegistro"
                >
                    <h2 className="text-4xl text-yellow-500 font-bold text-center mb-3">Editar Datos</h2>
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
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
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
                                    value={apellidoPat}
                                    onChange={e => setApellidoPat(e.target.value)}
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
                                    value={apellidoMat}
                                    onChange={e => setApellidoMat(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:gap-2">
                            <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                                <label className="text-gray-200" htmlFor="date">Fecha de nacimiento</label>
                                <input
                                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                                <label className="text-gray-200" htmlFor="ci">Carnet de identidad</label>
                                <input
                                    className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                    type="text"
                                    id="ci"
                                    name="ci"
                                    placeholder="Ej. 815214 - 1231921-e"
                                    value={ci}
                                    onChange={e => setCi(e.target.value)}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        {
                            usuarioLogin.tipo == 'estudiante' &&
                            <div className="flex flex-col sm:flex-row sm:gap-2">
                                <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                                    <label className="text-gray-200" htmlFor="ru">Registro Universitario</label>
                                    <input
                                        className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                        type="text"
                                        id="ru"
                                        name="ru"
                                        placeholder="Ej. 1778612"
                                        value={ru}
                                        onChange={e => setRu(e.target.value)}
                                        disabled={true}
                                    />
                                </div>

                                <div className="flex flex-col basis-2/4 text-gray-400 py-2">
                                    <label className="text-gray-200" htmlFor="ref">Mención</label>
                                    <select className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" name="mencion" id="ref" value={mencion} onChange={e => setMencion(e.target.value)}>
                                        <option value="">Elige una mencion</option>
                                        <option value="1">Bioimagenología</option>
                                        <option value="2">Laboratorio clínico</option>
                                        <option value="3">Fisioterapia y Kinesiología</option>
                                    </select>

                                </div>
                            </div>
                        }

                        <img className="w-14 h-14 m-auto mt-4 rounded-full" src={data.imagen} />


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
                            <label className="text-gray-200" htmlFor="email">Email</label>
                            <input
                                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ej. pedro124@gmail.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </fieldset>

                    <button type="submit" className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded" disabled={cargando}>
                        {'Guardar cambios'}
                    </button>

                </form >

            </>
        </>
    )
}
