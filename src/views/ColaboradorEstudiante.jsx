import { Link, useParams } from "react-router-dom";
import useProyect from "../hooks/useProyect";
import clienteAxios from "../config/axios";
import useSWR from 'swr'
import Cargando from "../components/Cargando";
import Swal from "sweetalert2";
import { convertirFecha } from "../helpers/CajaChica";


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

export default function ColaboradorEstudiante() {

    const { usuarioLogin, changeStateModalCorrespondencia, changeStateModalRespuesta, setDocumentoElegido, setUsuarioColaborador, setRespuestaElegida, eliminarRespuesta, setUsuarioCreador } = useProyect();
    const params = useParams();
    const { id } = params;
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios(`/api/collaborator/${id}/${usuarioLogin.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR(`/api/collaborator/${id}/${usuarioLogin.id}`, fetcher, {
        refreshInterval: 1000
    })

    if (isLoading) return <Cargando />

    const historial = data.data[0] || []

    const handleDelete = (nombre, id) => {
        Swal.fire({
            title: nombre,
            text: "Esta seguro de querer eliminar la respuesta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                const mostrarRespuesta = async () => {
                    const respuesta = await eliminarRespuesta(id);
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

    return (
        <>
            <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between p-2 rounded-lg shadow-2xl bg-white">
                <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between w-full lg:mr-5">
                    <p className="font-black md:text-4xl text-3xl text-blue-900 capitalize md:mr-3">
                        Colaborador de : <span className="text-yellow-500">{historial.correspondencia.nombre}</span>
                    </p>
                    <div className="flex gap-2">
                        <Link
                            to={-1}
                            className='bg-blue-950 text-center text-white font-black p-3 rounded-lg'
                        >Volver pantalla principal</Link>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 items-center justify-between bg-blue-950 rounded-lg p-3 mt-2">
                <h2 className="font-black text-3xl text-center text-white">Mi historial</h2>
                <button className="bg-slate-50 hover:bg-yellow-300 font-black p-2 rounded-lg" onClick={() => {
                    setUsuarioColaborador(usuarioLogin.id)
                    setUsuarioCreador(usuarioLogin.id)
                    setRespuestaElegida('')
                    changeStateModalRespuesta()
                }
                }>Agregar nueva respuesta</button>
            </div>

            <div className="relative overflow-x-auto pt-5 flex flex-col gap-3"> {
                <div className="flex flex-col items-center justify-center gap-2">

                    <table className="w-full md:w-3/4 text-sm text-center">
                        <thead className="text-sm uppercase bg-gray-600 text-white">
                            <tr>
                                <th scope="col" className="p-2">
                                    Creador
                                </th>
                                <th scope="col" className="p-2">
                                    Respuestas
                                </th>
                                <th scope="col" className="p-2">
                                    Fecha de subida o respuesta
                                </th>
                                <th scope="col" className="p-2">
                                    Documento Recibido
                                </th>
                                <th scope="col" className="p-2">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                historial.respuestas.map(respuesta => (
                                    <tr className="bg-white border-b" key={respuesta.id}>
                                        <th scope="row" className="p-2 font-medium">
                                            {historial.usuario_creador === respuesta.creador ? historial.usuarioCreador.nombreCompleto : 'Yo'
                                            }
                                        </th>
                                        <th scope="row" className="p-2 font-medium">
                                            {respuesta.response}
                                        </th>
                                        <td className="p-2">
                                            {convertirFecha(respuesta.creado)}
                                        </td>

                                        <td className="p-2">
                                            {
                                                respuesta.documento ? (
                                                    <>
                                                        <button className="bg-blue-700 hover:bg-blue-900 w-8 h-8 rounded-full"
                                                            onClick={() => {

                                                                setDocumentoElegido({
                                                                    nombre: historial.correspondencia.nombre,
                                                                    imagen: respuesta.documento.nombreDocumento
                                                                })

                                                                changeStateModalCorrespondencia()
                                                            }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                            </svg>
                                                        </button>

                                                    </>) :
                                                    <p>Sin documento</p>
                                            }
                                        </td>
                                        <td className="p-2 my-auto">
                                            {
                                                historial.usuario_creador !== respuesta.creador ? (
                                                    <div className="flex">
                                                        <button className="bg-yellow-500 hover:bg-yellow-700 w-8 h-8 rounded-full sm:mx-1"
                                                            onClick={() => {
                                                                setRespuestaElegida(respuesta.id)
                                                                changeStateModalRespuesta()
                                                            }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </button>
                                                        <button className="bg-red-500 hover:bg-red-700 w-8 h-8 rounded-full" onClick={() => handleDelete(respuesta.response,respuesta.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>

                                                        </button>
                                                    </div>
                                                ) : (<p>Sin permisos</p>)
                                            }
                                        </td>
                                    </tr>
                                ))

                            }

                        </tbody>

                    </table>
                    {
                        historial.respuestas.length === 0 && <p className="text-center text-2xl font-black">Sin historial</p>
                    }
                </div>

            }

            </div >
        </>
    )
}
