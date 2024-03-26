import Encabezado from "../components/Encabezado";
import { useNavigate } from 'react-router-dom'
import useProyect from "../hooks/useProyect";
import useSWR from "swr";
import Cargando from "../components/Cargando";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

export default function UsuariosActivar() {


    const [apiItems, setApiItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([])

    const { filtrado, activarUsuario } = useProyect();
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios('/api/users/activated', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR('/api/users/activated', fetcher, {
        refreshInterval: 1000
    })
    
    useEffect(() => {
        const itemsFiltrados = apiItems.filter(item => (
            item.nombreCompleto.toLowerCase().includes(filtrado.toLowerCase())
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

    const handleActivated = (nombre, id) => {
        Swal.fire({
            title: nombre,
            text: "Esta seguro de activar al usuario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, activar"
        }).then((result) => {
            if (result.isConfirmed) {
                const mostrarRespuesta = async () => {
                    const respuesta = await activarUsuario(id);
                    Swal.fire({
                        title: "Activado!",
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
                <table className="w-3/4 text-sm text-center mx-auto">
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
                            filteredItems.map(user => (
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
                                            className="w-12 h-12 rounded-full border-black border-2 mx-auto"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <button className="bg-yellow-500 hover:bg-yellow-700 rounded-full sm:mx-1 p-3 font-bold" onClick={()=>{
                                            handleActivated(user.nombreCompleto,user.id)
                                        }}>
                                            Activar usuario
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
