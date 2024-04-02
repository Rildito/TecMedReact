import { Outlet, useNavigate } from "react-router-dom";
import loginImg from '../public/images/fondo.jpeg';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useProyect from "../hooks/useProyect";
import CryptoJS from "crypto-js"

export default function AuthLayout() {

    const { changeView } = useProyect()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('usuario')) {
            const informacionDesencriptada = CryptoJS.AES.decrypt(localStorage.getItem('usuario'), 'secret_key')
            const usuarioObtenido = informacionDesencriptada.toString(CryptoJS.enc.Utf8)
            const userLogged = JSON.parse(usuarioObtenido)
            
            if (userLogged.tipo == 'estudiante') {
                navigate('/estudiante')
                changeView('materiales')
            } else if (userLogged.tipo == 'administrativo') {
                navigate('/administrativo/correspondencia-recibida')
                changeView('correspondencia recibida')
            } else if (userLogged.tipo == 'administrador') {
                navigate('/administrador/usuarios')
                changeView('usuarios')
            } else if (userLogged.tipo == 'colaborador') {
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
