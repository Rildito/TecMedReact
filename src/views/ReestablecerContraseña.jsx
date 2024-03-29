import { Link, useLocation, useParams } from 'react-router-dom'
import useProyect from '../hooks/useProyect';
import { useAuth } from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import { createRef, useState } from 'react';

export default function ReestablecerContraseña() {


    const params = useParams()

    const {token , email} = params;

    const { cargando } = useProyect();

    const { upgrade_password } = useAuth()

    const [errores, setErrores] = useState([])

    const passwordRef = createRef()
    const password_ConfirmationRef = createRef()


    const handleSubmit = e => {

        e.preventDefault()

        const datos = {
            password: passwordRef.current.value,
            password_confirmation: password_ConfirmationRef.current.value,
            token,
            email
        }
        upgrade_password(datos, setErrores)

    }

    return (
        <>
            <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-5 rounded-lg" onSubmit={handleSubmit} noValidate>
                <h2 className="text-4xl text-yellow-500 font-bold text-center pb-2">Nueva contraseña</h2>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <p className='text-white'>Hola. Escribe la nueva contraseña</p>
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
            <nav className="text-center mt-3">
                <Link to="/auth/login">
                    ¿Ya tienes una cuenta?, Inicia sesion
                </Link>
            </nav>


        </>
    )
}
