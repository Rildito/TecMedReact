import { Link } from 'react-router-dom'
import useProyect from '../hooks/useProyect';
import { useAuth } from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import { createRef, useState } from 'react';

export default function Login() {


    const { usuarioElegido, changeTypeUser, cargando } = useProyect();

    const { login } = useAuth()

    const [errores, setErrores] = useState()
    const nameRef = createRef()
    const passwordRef = createRef()

    const handleSubmit = e => {

        e.preventDefault()

        const datos = {
            ci: nameRef.current.value,
            password: passwordRef.current.value,
        }

        login(datos, setErrores)

    }

    return (
        <>
            <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-5 rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-4xl text-yellow-500 font-bold text-center pb-2">Iniciar Sesion</h2>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="ci">Usuario (Carnet de identidad)</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="ci" name='ci' placeholder="Ej. 812512" ref={nameRef} />
                </div>
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="password">Contraseña</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="password" id="password" name='password' placeholder="********" ref={passwordRef} />
                </div>
                <button type="submit" className="w-full my-5 py-3 bg-teal-500 shadow-lg shadow-teal-500/40 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" disabled={cargando}>Iniciar Sesion</button>
                <nav className="text-white">
                    <Link to="/auth/registro">
                        ¿No tienes cuenta? Crea una
                    </Link>
                </nav>
            </form>
            <nav className="text-center mt-3">
                <Link to="/auth/recuperar-contraseña">
                    ¿Olvidaste tu contraseña?
                </Link>
            </nav>
        </>
    )
}
