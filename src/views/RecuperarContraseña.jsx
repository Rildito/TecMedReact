import { Link } from 'react-router-dom'
import useProyect from '../hooks/useProyect';
import { useAuth } from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import { createRef, useState } from 'react';

export default function RecuperarContraseña() {


    const { cargando } = useProyect();

    const { recover_password, respuesta } = useAuth()

    const [errores, setErrores] = useState([])
    const emailRef = createRef()

    const handleSubmit = e => {

        e.preventDefault()

        const datos = {
            email: emailRef.current.value
        }

        recover_password(datos, setErrores)

    }

    return (
        <>
            <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-5 rounded-lg" onSubmit={handleSubmit} noValidate>
                <h2 className="text-4xl text-yellow-500 font-bold text-center pb-2">Recuperar contraseña</h2>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <p className='text-white'>Hola.</p>
                <p className='text-white text-justify'>
                    Te enviaremos un email a tu correo registrado para que puedas recuperar tu cuenta, sigue los pasos indicados en el mismo.</p>
                {
                    respuesta &&
                    <div className='flex items-center justify-center text-green-400 mt-2'>
                        <p className=''>Se envio el correo correctamente</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                }
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="ci">Email</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="ci" name='ci' placeholder="Ej. pedrito@gmail.com" ref={emailRef} />
                </div>

                <button type="submit" className="w-full my-5 py-3 bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" disabled={cargando}>Recuperar contraseña</button>

            </form>
            <nav className="text-center mt-3">
                <Link to="/auth/login">
                    ¿Ya tienes una cuenta?, Inicia sesion
                </Link>
            </nav>


        </>
    )
}
