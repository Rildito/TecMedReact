import { Link, useNavigate } from "react-router-dom";
import Encabezado from "../components/Encabezado";
import useProyect from "../hooks/useProyect";
import { useState, useEffect } from "react";
import { convertirFecha, convertirFechaSinHora } from "../helpers/CajaChica";

export default function Notificaciones() {

    const { correspondenciasNotificacion } = useProyect();

    const navigate = useNavigate();

    const token = localStorage.getItem('AUTH_TOKEN')

    // const [apiItems, setApiItems] = useState([]);
    // const [filteredItems, setFilteredItems] = useState([])

    return (
        <>
            <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between p-2 rounded-lg shadow-2xl bg-white">
                <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between w-full lg:mr-5">
                    <p className="font-black md:text-4xl text-3xl text-blue-950 capitalize md:mr-3 text-center">Notificaciones</p>
                    <Link
                        to={-1}
                        className='bg-blue-950 text-white font-black p-3 rounded-lg flex gap-1 items-center'
                    >Volver  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg></Link>
                </div>
            </div>

            <div className="relative overflow-x-auto mt-3">
                <table className="w-full text-sm text-center mx-auto">
                    <thead className="uppercase bg-gray-600 text-white">
                        <tr>
                            <th scope="col" className="p-2">
                                Correspondencia
                            </th>
                            <th scope="col" className="p-2">
                                tipo
                            </th>
                            <th scope="col" className="p-2">
                                Descripcion
                            </th>
                            <th scope="col" className="p-2">
                                Observaciones
                            </th>
                            <th scope="col" className="p-2">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            correspondenciasNotificacion?.map(correspondencia => (
                                <tr className="bg-white border-b" key={correspondencia.id}>
                                    <td className="font-bold p-2 bg-slate-100">
                                        {correspondencia.nombre}
                                    </td>
                                    <th scope="row" className="p-2 font-normal">
                                        {correspondencia.tipo}
                                    </th>
                                    <th scope="row" className="p-2 font-normal">
                                        {correspondencia.descripcion}
                                    </th>
                                    <td className="p-2">
                                        La correspondencia se creo el dia {convertirFecha(correspondencia.created_at)} y no se ha finalizado su estado es : <span className="font-bold">{correspondencia.estado}</span>
                                    </td>
                                    <th>
                                    <Link className="bg-red-600 hover:bg-red-700 font-bold text-white p-1 rounded-lg text-xs" to={`/administrativo/correspondencia-${correspondencia.tipo}/editar/${correspondencia.id}`}>Ir a correspondencia</Link>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
