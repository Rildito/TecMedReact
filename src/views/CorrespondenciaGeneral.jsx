
import useSWR from "swr";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Encabezado from "../components/Encabezado";
import useProyect from "../hooks/useProyect";
import Cargando from "../components/Cargando";
import clienteAxios from "../config/axios";
import { convertirFecha } from '../helpers/CajaChica';


export default function CorrespondenciaGeneral() {

    const { changeStateModalCorrespondencia, usuarioLogin, setDocumentoElegido, documentoElegido } = useProyect();
    const navigate = useNavigate();
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios(`/api/collaborators/correspondences/${usuarioLogin.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR(`/api/collaborators/correspondences/${usuarioLogin.id}`, fetcher, {
        refreshInterval: 1000
    })

    if (isLoading) return <Cargando />

    const correspondencias = data

    return (
        <>
            <Encabezado />
            <div className="relative overflow-x-auto pt-5">
                <table className="w-full text-sm text-center">
                    <thead className="text-sm uppercase bg-gray-600 text-white">
                        <tr>
                            <th scope="col" className="p-2">
                                Nombre
                            </th>
                            <th scope="col" className="p-2">
                                Fecha de creación
                            </th>
                            <th scope="col" className="p-2">
                                Descripcion
                            </th>
                            <th scope="col" className="p-2">
                                Documento Inicial
                            </th>
                            <th scope="col" className="p-2">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            correspondencias.map((correspondencia) => (
                                <tr className="bg-white border-b" key={correspondencia.correspondence.id}>

                                    <th scope="row" className="p-2 font-medium">
                                        {correspondencia.correspondence.nombre}
                                    </th>
                                    <td className="p-2">
                                        {convertirFecha(correspondencia.correspondence.created_at)}
                                    </td>
                                    <td className="p-2">
                                        {correspondencia.correspondence.descripcion}
                                    </td>
                                    <td className="p-2">
                                        <button className="bg-blue-700 hover:bg-blue-900 w-8 h-8 rounded-full"
                                            onClick={() => {
                                                setDocumentoElegido({
                                                    nombre: correspondencia.correspondence.nombre,
                                                    imagen: correspondencia.correspondence.documento_inicial
                                                })
                                                
                                                changeStateModalCorrespondencia()
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6 text-white mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="p-2 flex gap-1
                                     justify-center items-center">

                                        <button className="bg-yellow-500 hover:bg-yellow-700 w-full p-3 rounded-lg font-black"
                                            onClick={() => {
                                                navigate(`responder/${correspondencia.correspondence.id}`)
                                            }}>
                                            Ver historial
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    correspondencias.length === 0 && <p className='text-center font-black mt-2 text-2xl'>Sin correspondencias</p>
                }
            </div >
        </>
    )
}
