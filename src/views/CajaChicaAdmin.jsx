import { Link, Outlet } from "react-router-dom";
import Encabezado from "../components/Encabezado";


export default function CajaChicaAdmin() {

    return (
        <>
            <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between p-3 rounded-lg shadow-2xl bg-white">
                <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between w-full lg:mr-5">
                    <p className="font-black md:text-4xl text-3xl text-blue-900 capitalize md:mr-3">Caja Chica</p>
                </div>
            </div>
            <div className="relative overflow-x-auto pt-5">
                <div className="flex justify-around">
                    <Link to='/administrador/caja-chica/custodio' className="text-white font-bold bg-blue-700 hover:bg-blue-800 p-3 rounded-lg">Custodios</Link>
                    <Link to='/administrador/caja-chica/director' className="text-white font-bold bg-blue-700 hover:bg-blue-800 p-3 rounded-lg">Elegir director</Link>
                    <Link to='/administrador/caja-chica/encargado' className="text-white font-bold bg-blue-700 hover:bg-blue-800 p-3 rounded-lg">Elegir encargado</Link>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}
