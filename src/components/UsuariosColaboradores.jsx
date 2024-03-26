import Encabezado from "../components/Encabezado";
import { useNavigate, useParams } from 'react-router-dom'
import useProyect from "../hooks/useProyect";
import useSWR from "swr";
import Cargando from "../components/Cargando";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

export default function UsuariosColaboradores() {

    const params = useParams();
    
    const { usuarioLogin, agregarColaborador } = useProyect();

    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios(`/api/collaborators-available/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR(`/api/collaborators-available/${params.id}`, fetcher, {
        refreshInterval: 1000
    })


    if (isLoading) return <Cargando />
    const users = data.data

    const handleSubmit = (nombre, id) => {
        Swal.fire({
            title: nombre,
            text: "Esta seguro de querer agregar como colaborador",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, agregar"
        }).then((result) => {
            if (result.isConfirmed) {
                const mostrarRespuesta = async () => {
                    const respuesta = await agregarColaborador(id, usuarioLogin.id, params.id);
                    Swal.fire({
                        title: "Agregado correctamente!",
                        text: respuesta,
                        icon: "success"
                    });
                }
                mostrarRespuesta();
            }
        });
    };
    return (
        <>
            <div className="relative overflow-x-auto pt-5">
                <table className="w-full text-sm text-center">
                    <thead className="text-sm uppercase bg-gray-600 text-white">
                        <tr>
                            <th scope="col" className="p-2">
                                Nombre Completo
                            </th>
                            <th scope="col" className="p-2">
                                Tipo de usuario
                            </th>
                            <th scope="col" className="p-2">
                                Foto
                            </th>
                            <th scope="col" className="p-2">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => user.id !== usuarioLogin.id && (
                                <tr className="bg-white border-b" key={user.id}>
                                    <th scope="row" className="p-2 font-medium">
                                        {user.nombreCompleto}
                                    </th>
                                    <td className="p-2 capitalize">
                                        {user.tipo}
                                    </td>
                                    <td className="p-2">
                                        <img
                                            src={user.imagen}
                                            className="w-12 h-12 rounded-full border-black border-2"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <button className="bg-green-500 hover:bg-green-700 w-full rounded-lg sm:mx-1 p-2 font-bold" onClick={() => {
                                            handleSubmit(user.nombreCompleto, user.id)
                                        }}>
                                            Añadir
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
