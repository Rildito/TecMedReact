import { useEffect, useState } from "react";
import Cargando from "../components/Cargando";
import Encabezado from "../components/Encabezado";
import useProyect from "../hooks/useProyect";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2'

export default function Materiales() {

    const { showDetails, eliminarPrestamo, obtenerPrestamo,filtrado } = useProyect();

    const [apiItems, setApiItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([])


    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios('/api/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR('/api/orders', fetcher, {
        refreshInterval: 1000
    })

    useEffect(() => {
        const itemsFiltrados = apiItems.filter(item => (
            item.usuario.nombreCompleto.toLowerCase().includes(filtrado.toLowerCase())
        ))
        setFilteredItems(itemsFiltrados);
    }, [filtrado])

    useEffect(() => {
        if (!isLoading) {
            setApiItems(data.data)
            setFilteredItems(data.data)
        }
    }, [isLoading, data])

    if (isLoading) return <Cargando />

    const handleDelete = (nombre, id) => {
        Swal.fire({
            title: `Eliminar prestamo de ${nombre}`,
            text: "Esta seguro de querer eliminar el gasto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                const mostrarRespuesta = async () => {
                    const respuesta = await eliminarPrestamo(id);
                    Swal.fire({
                        title: "Eliminado!",
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
            <Encabezado />
            <div className="relative overflow-x-auto pt-5">
                <table className="w-full text-sm text-center">
                    <thead className="text-sm uppercase bg-gray-600 text-white">
                        <tr>
                            <th scope="col" className="p-2">
                                Prestante
                            </th>
                            <th scope="col" className="p-2">
                                Docente
                            </th>
                            <th scope="col" className="p-2">
                                Materia
                            </th>
                            <th scope="col" className="p-2">
                                Estado
                            </th>
                            <th scope="col" className="p-2">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            filteredItems.map(({ usuario, docente, materia, id, estado }) => (
                                <tr className="bg-white border-b" key={id}>
                                    <th scope="row" className="font-medium p-2">
                                        {`${usuario.nombreCompleto}`}
                                    </th>
                                    <td className="p-2">
                                        {`${docente.nombreCompleto}`}
                                    </td>
                                    <td className="p-2">
                                        {materia.nombreMateria}
                                    </td>

                                    <td className={`
                                        ${estado == 'Sin habilitar' ? 'bg-red-500 '
                                            : estado == 'En curso' ? 'bg-yellow-500' : 'bg-green-700'}
                                        text-white font-bold p-2`}>
                                        {estado}
                                    </td>

                                    <td className="p-2">
                                        <button
                                            className="bg-blue-700 hover:bg-blue-900 w-8 h-8 rounded-full"
                                            onClick={() => {
                                                obtenerPrestamo(id)
                                                showDetails()
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 w-8 h-8 rounded-full sm:mx-1" onClick={() => {
                                            handleDelete(usuario.nombreCompleto, id)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
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
