import { useNavigate, useParams } from "react-router-dom"
import clienteAxios from "../config/axios"
import useProyect from "../hooks/useProyect"
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import Cargando from "./Cargando";
import Alerta from "./Alerta";

export default function FormularioMateria() {

    const { editarMateria, crearMateria, cargando } = useProyect()
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate()

    const [materia, setMateria] = useState('')
    const [mencion, setMencion] = useState('')
    const [errores, setErrores] = useState([])

    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => (
        clienteAxios(`/api/subjects/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    )

    const { data, error, isLoading } = useSWR(()=> id ? `/api/subject/${id}` : null, fetcher, {
        refreshInterval: 1000
    })

    useEffect(() => {
        if (id && !isLoading) {
            setMateria(data.data.nombre)
            setMencion(data.data.mention.id)
        }
    }, [isLoading,data])

    const handleSubmit = async (e) => {
        let resultado = false
        e.preventDefault()
        const datos = {
            nombre:materia,
            mencion:String(mencion)
        }
        console.log(datos)
        if (id) {
            resultado = await editarMateria({ ...datos, id }, setErrores)
            mutate(datos)
        } else {
            resultado = await crearMateria(datos, setErrores)
        }
        if (resultado) {
            navigate('/administrador/materias');
        }
    }
    if (isLoading) return <Cargando />

    return (
        <>
            <form className="max-w-[500px] w-full mx-auto mt-5 bg-gray-900 px-5 py-2 rounded-lg" onSubmit={handleSubmit}>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="user">Materia</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="user" placeholder="Ej. Reunion de delegados" value={materia} onChange={e => setMateria(e.target.value)} />
                </div>
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="user">Mencion</label>
                    <select className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white' value={mencion} onChange={e => setMencion(e.target.value)}>
                        <option value={""}>Elige una mencion</option>
                        <option value="1">Bioimagenología</option>
                        <option value="2">Laboratorio clínico</option>
                        <option value="3">Fisioterapia y Kinesiología</option>
                    </select>
                </div>

                <button className="w-full my-5 py-3 bg-blue-500 shadow-lg  hover:bg-blue-600 text-white font-semibold rounded-lg" disabled={cargando}>{id ? 'Guardar cambios' : 'Crear materia'}</button>
            </form>
        </>
    )
}
