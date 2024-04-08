import { useNavigate, useParams } from "react-router-dom"
import clienteAxios from "../config/axios"
import useProyect from "../hooks/useProyect"
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import Cargando from "./Cargando";
import Alerta from "./Alerta";

export default function FormularioMaterial() {

    const { editarMaterial, crearMaterial, cargando } = useProyect()
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(1)
    const [estado, setEstado] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [file, setFile] = useState({})

    const [errores, setErrores] = useState([])

    const handleFileSelect = (e) => {
        // console.log(e)
        setFile(e.target.files[0])
    }

    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => (
        clienteAxios(`/api/materials/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    )

    const { data, error, isLoading } = useSWR(() => id ? `/api/materials/${id}` : null, fetcher, {
        refreshInterval: 1000
    })

    useEffect(() => {
        if (id && !isLoading) {
            setNombre(data.data.nombre)
            setCantidad(data.data.cantidad_disponible)
            setEstado(data.data.estado)
            setDescripcion(data.data.descripcion)

        }
    }, [isLoading])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const datos = {
            nombre,
            cantidad,
            estado,
            descripcion,
            imagen: file
        }
        let resultado = false


        if (id) {
            mutate(datos)
            resultado = await editarMaterial({ ...datos, id }, setErrores)
        } else {
            resultado = await crearMaterial(datos, setErrores)
        }
        if (resultado) {
            navigate('/administrador/materiales');
        }
    }
    if (isLoading) return <Cargando />
    return (
        <>
            <form className="max-w-[500px] w-full mx-auto mt-5 bg-gray-900 px-5 py-2 rounded-lg" onSubmit={handleSubmit} encType="multipart/form-data">
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="name">Nombre</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" name="name" id="name" placeholder="Ej. Reunion de delegados" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>

                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="cantidad">Cantidad</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="number" step="1" id="cantidad" min={1} name="cantidad" placeholder="Ej. Reunion de delegados" value={cantidad} onChange={e => setCantidad(e.target.value)} />
                </div>
                
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="estado">Estado</label>
                    <select className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white' name="estado" id="estado" value={estado} onChange={e => setEstado(e.target.value)}>
                        <option value={""}>Elige un estado</option>
                        <option value={"disponible"}>Disponible</option>
                        <option value={"No disponible"}>No disponible</option>
                    </select>
                </div>

                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="descripcion">Descripción</label>
                    <textarea
                        className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white' name="descripcion" id="descripcion"
                        value={descripcion} onChange={e => setDescripcion(e.target.value)}
                    />
                </div>

                {
                    data?.data?.imagen &&
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-yellow-500">Existe una imagen registrada</p>
                        <img
                            className="w-20"
                            src={data.data.imagen}
                        />
                    </div>
                }
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="imagen">Imagen de material</label>
                    <input
                        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white w-full"
                        type="file"
                        id="imagen"
                        name="imagen"
                        accept=".jpeg,.jpg,.png"
                        onChange={handleFileSelect}
                    />
                </div>

                <button className="w-full my-5 py-3 bg-blue-500 shadow-lg  hover:bg-blue-600 text-white font-semibold rounded-lg" disabled={cargando}>{id ? 'Guardar cambios' : 'Crear material'}</button>
            </form>
        </>
    )
}
