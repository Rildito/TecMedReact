import useProyect from "../hooks/useProyect";
import { createRef, useState } from "react";
import Alerta from "./Alerta";
export default function ModalRecuperarContraseña() {

    const { cargando, usuarioLogin,changeStateModalContraseña, actualizarContraseña } = useProyect();

    const [errores, setErrores] = useState([])

    const passwordRef = createRef()
    const password_ConfirmationRef = createRef()


    const handleSubmit = async e => {

        e.preventDefault()
        let resultado = false
        const datos = {
            password: passwordRef.current.value,
            password_confirmation: password_ConfirmationRef.current.value,
            id: usuarioLogin.id
        }
        resultado = await actualizarContraseña(datos, setErrores)

        if (resultado) {
            changeStateModalContraseña(false)
        }
    }

    return (

        <>
            <p className='font-bold uppercase text-2xl mb-1'>Resetea tu contraseña</p>

            {/* <button onClick={showDetails}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rose-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button> */}

            <p>Escribe la nueva contraseña</p>
            <li>Minimo 8 caracteres</li>
            <li>Debe contener al menos un simbolo especial</li>
            <li className="mb-2">Debe contener al menos un número</li>

            <div className="md:h-[20rem] md:w-[30rem] h-[30rem] overflow-hidden relative overflow-y-auto">
                <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-5 rounded-lg" onSubmit={handleSubmit} noValidate>

                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
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

                    <button type="submit" className="w-full my-5 py-3 bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" disabled={cargando}>Cambiar contraseña</button>

                </form>
            </div>

        </>

    )
}
