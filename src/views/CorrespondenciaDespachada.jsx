import Modal from 'react-modal'
import Swal from 'sweetalert2'


import useSWR from "swr";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Encabezado from "../components/Encabezado";
import useProyect from "../hooks/useProyect";
import Cargando from "../components/Cargando";
import clienteAxios from "../config/axios";
import Alerta from '../components/Alerta';
import { convertirFecha, convertirFechaSinHora } from '../helpers/CajaChica';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export default function CorrespondenciaDespachada() {


    const { changeStateModalCorrespondencia, eliminarCorrespondencia, setDocumentoElegido, setFechasDocumento,changeStateModalDocumentoGenerado, filtrado } = useProyect();
    const navigate = useNavigate();
    const [dateOne, setDateOne] = useState('');
    const [dateTwo, setDateTwo] = useState('');
    const [errores, setErrores] = useState('');
    const token = localStorage.getItem('AUTH_TOKEN')

    const [apiItems, setApiItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([])

    const fetcher = () => clienteAxios('/api/correspondences/despachada', {
        headers: {
            Authorization: `Bearer ${token}`,

        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR('/api/correspondences/despachada', fetcher, {
        refreshInterval: 1000
    })

    useEffect(() => {
        // const itemsFiltrados = apiItems.filter(item => (
        //     item.nombre.toLowerCase().includes(filtrado.toLowerCase())
        // ))
        const itemsFiltrados = apiItems.filter(item => (
            item.nombre.toLowerCase().includes(filtrado.toLowerCase()) 
            || convertirFechaSinHora(item.fechaCreacion).toLowerCase().includes(filtrado.toLowerCase())
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
            text: "Esta seguro de querer eliminar la correspondencia",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                const mostrarRespuesta = async () => {
                    const respuesta = await eliminarCorrespondencia(id);
                    if (Boolean(respuesta)) {
                        Swal.fire({
                            title: "Eliminado!",
                            text: respuesta,
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            icon: "Error",
                            title: "Oops...ocurrio un error",
                            text: "Fallo en el servidor!",
                        });
                    }
                }
                mostrarRespuesta();
            }
        });
    };

    const handleDocument = (e) => {
        e.preventDefault();

        let erroresFuncion = []
        setErrores([])

        if ([dateOne, dateTwo].includes('')) {
            setErrores(['Las 2 fechas son obligatorias'])
            erroresFuncion = ['hay errores']
        }

        if (new Date(dateOne) > new Date(dateTwo)) {
            setErrores(['La fecha de inicio debe de ser menor o igual a la fecha fin'])
            erroresFuncion = ['hay errores']
        }

        if (erroresFuncion.length === 0) {
            setFechasDocumento({
                dateOne,
                dateTwo,
                tipoCorrespondencia:'despachada'
            })
            changeStateModalDocumentoGenerado()
        }
    }
    return (
        <>
            <Encabezado />
            <form className="mt-2 rounded-lg md:flex-row md:gap-0 flex-col gap-2 items-center bg-sky-50 text-sm p-2" onSubmit={handleDocument}>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <div className="flex justify-around items-center md:flex-row flex-col md:gap-0 gap-2">
                    <div>
                        <label className="font-black" htmlFor="dateOne">Fecha Inicio: </label>
                        <input type="date" name="dateOne" id="dateOne" className="font-bold text-black rounded-lg" value={dateOne} onChange={e => setDateOne(e.target.value)} />
                    </div>
                    <div>
                        <label className="font-black" htmlFor="dateTwo">Fecha Fin: </label>
                        <input type="date" name="dateOne" id="dateTwo" className="font-bold text-black rounded-lg" value={dateTwo} onChange={e => setDateTwo(e.target.value)} />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg font-bold text-white">Generar Documento</button>
                </div>
            </form>
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
                                Fecha de entrega
                            </th>
                            <th scope="col" className="p-2">
                                Unidad
                            </th>
                            <th scope="col" className="p-2">
                                Hoja de ruta
                            </th>
                            <th scope="col" className="p-2">
                                Observaciones
                            </th>
                            <th scope="col" className="p-2">
                                Receptor
                            </th>
                            <th scope="col" className="p-2">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredItems.map(correspondencia => (
                                <tr className="bg-white border-b" key={correspondencia.id}>

                                    <th scope="row" className="font-medium p-2">
                                        {correspondencia.nombre}
                                    </th>
                                    <td className='p-2'>
                                        {convertirFecha(correspondencia.fechaCreacion)}
                                    </td>
                                    <td className='p-2'>
                                        {correspondencia.fechaEntregado ? convertirFecha(correspondencia.fechaEntregado) : 'Sin fecha de entrega'}
                                    </td>
                                    <td className='p-2'>
                                        {correspondencia.unit.nombre}
                                    </td>
                                    <td className="p-2">
                                        {correspondencia.hojaDeRuta}
                                    </td>
                                    <td className="p-2">
                                        {correspondencia.descripcion}
                                    </td>
                                    <td className={`p-2 font-bold ${correspondencia.receptor ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {correspondencia.receptor || 'Sin receptor'}
                                    </td>
                                    <td className="p-2">
                                        <button className="bg-blue-700 hover:bg-blue-900 w-8 h-8 rounded-full"
                                            onClick={() => {
                                                changeStateModalCorrespondencia()
                                                setDocumentoElegido({
                                                    nombre: correspondencia.nombre,
                                                    imagen: correspondencia.documento
                                                })
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                        </button>
                                        <button className="bg-yellow-500 hover:bg-yellow-700 w-8 h-8 rounded-full sm:mx-1"
                                            onClick={() => {
                                                navigate(`/administrativo/correspondencia-recibida/editar/${correspondencia.id}`)
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 w-8 h-8 rounded-full" onClick={() => handleDelete(correspondencia.nombre, correspondencia.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5 text-white mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    data.data.length === 0 && <p className='text-center mt-1 font-bold'>Sin correspondencias</p>
                }
            </div>
        </>
    )
}
