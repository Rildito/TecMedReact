import { useNavigate } from "react-router-dom";
import Encabezado from "../components/Encabezado";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import useProyect from "../hooks/useProyect";
import Cargando from "../components/Cargando";
import Swal from "sweetalert2";
import { useState,useEffect } from "react";

export default function MaterialesAdmin() {

    const { eliminarMaterial,filtrado } = useProyect();
    const navigate = useNavigate();

    const [apiItems, setApiItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([])

    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios('/api/materials', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR('/api/materials', fetcher, {
        refreshInterval: 1000
    })

    useEffect(() => {
        const itemsFiltrados = apiItems.filter(item => (
            item.nombre.toLowerCase().includes(filtrado.toLowerCase())
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
            title: nombre,
            text: "Esta seguro de querer eliminar el material",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                const mostrarRespuesta = async () => {
                    const respuesta = await eliminarMaterial(id);
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
                <table className="text-sm text-center mx-auto">
                    <thead className="w-4/5 text-sm uppercase bg-gray-600 text-white">
                        <tr>
                            <th scope="col" className="p-2">
                                Material
                            </th>
                            <th scope="col" className="p-2">
                                Cantidad Disponible
                            </th>
                            <th scope="col" className="p-2">
                                Cantidad utilizada
                            </th>
                            <th scope="col" className="p-2">
                                Descripcion
                            </th>
                            <th scope="col" className="p-2">
                                Imagen
                            </th>
                            <th scope="col" className="p-2">
                                Estado
                            </th>
                            <th scope="col" className="p-2">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredItems.map(material => (
                                <tr className="bg-white border-b" key={material.id}>
                                    <th scope="row" className="p-2 font-medium uppercase">
                                        {material.nombre}
                                    </th>
                                    <th scope="row" className="p-2 font-medium">
                                        {material.cantidad_disponible}
                                    </th>
                                    <th scope="row" className="p-2 font-medium">
                                        {material.cantidad_utilizada}
                                    </th>
                                    <th scope="row" className="p-2 font-medium">
                                        {material.descripcion}
                                    </th>
                                    <th scope="row" className="p-2 font-medium">
                                        <img 
                                            className="w-16"
                                            src={material.imagen}
                                        />
                                    </th>
                                    <th scope="row" className="p-2 font-medium capitalize">
                                        {material.estado}
                                    </th>
                                    <td className="p-2 flex">
                                        <button className="bg-yellow-500 hover:bg-yellow-700 w-8 h-8 rounded-full sm:mx-1" onClick={() => {
                                            navigate(`/administrador/materiales/editar/${material.id}`)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 w-8 h-8 rounded-full" onClick={() => {
                                            handleDelete(material.nombre, material.id)
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
