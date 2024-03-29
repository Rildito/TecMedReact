import { Outlet, useNavigate } from "react-router-dom";
import loginImg from '../public/images/fondo.jpeg';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useProyect from "../hooks/useProyect";

export default function AuthLayout() {

    const { changeView } = useProyect()
    const navigate = useNavigate()

    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem('usuario'))
        if (Boolean(userLogged)) {
            if (userLogged.tipo == 'estudiante') {
                navigate('/estudiante')
                changeView('materiales')
            }

            if (userLogged.tipo == 'administrativo') {
                navigate('/administrativo/correspondencia-recibida')
                changeView('correspondencia recibida')
            }

            if (userLogged.tipo == 'administrador') {
                navigate('/administrador/usuarios')
                changeView('usuarios')
            }

            if (userLogged.tipo == 'colaborador') {
                navigate('/colaborador/correspondencia')
                changeView('correspondencia')
            }
        }
    }, [])

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">

                <div className="hidden sm:block ">
                    <img className="w-full h-full object-cover" src={loginImg} alt="loginImg" />
                </div>

                <div className="bg-white bg-[radial-gradient(circle_500px_at_55%_500px,#C9EBFF,transparent)] flex flex-col justify-center">
                    <Outlet />
                </div>

            </div>
            <ToastContainer />
        </>
    )
}
