import { useNavigate, useParams } from "react-router-dom";
import useProyect from "../hooks/useProyect";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import useSWR from "swr";
import Cargando from "./Cargando";
import Alerta from "./Alerta";


export default function FormularioDocente() {
    const { editarDocente, crearDocente, cargando } = useProyect()
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate()

    const [nombreCompleto, setNombreCompleto] = useState('')
    const [gradoAcademico, setGradoAcademico] = useState('')
    const [errores, setErrores] = useState([])

    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => (
        clienteAxios(`/api/teachers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    )

    const { data, error, isLoading, mutate } = useSWR(() => id ? `/api/teachers/${id}` : null, fetcher, {
        refreshInterval: 1000
    })

    useEffect(() => {
        if (id && !isLoading) {
            setNombreCompleto(data.data.nombreCompleto)
            setGradoAcademico(data.data.gradoAcademico)
        }
    }, [isLoading])

    const handleSubmit = async (e) => {
        let resultado = false
        e.preventDefault()
        const datos = {
            nombreCompleto,
            gradoAcademico
        }
        if (id) {
            resultado = await editarDocente({ ...datos, id }, setErrores)
            mutate(datos)
        } else {
            resultado = await crearDocente(datos, setErrores)
        }

        if (resultado) {
            navigate('/administrador/docentes');
        }
    }
    if (isLoading) return <Cargando />

    return (
        <>
            <form className="max-w-[500px] w-full mx-auto mt-5 bg-gray-900 px-5 py-2 rounded-lg" onSubmit={handleSubmit}>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="user">Nombre Completo</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="user" placeholder="Ej. Reunion de delegados" value={nombreCompleto} onChange={e => setNombreCompleto(e.target.value)} />
                </div>
                <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="user">gradoAcademico</label>
                    <select className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white' value={gradoAcademico} onChange={e => setGradoAcademico(e.target.value)}>
                        <option value={""}>Elige un grado Academico</option>
                        <option value={"Licenciado"}>Licenciado</option>
                        <option value={"Licenciada"}>Licenciada</option>
                        <option value={"Doctor"}>Doctor</option>
                        <option value={"Doctora"}>Doctora</option>
                        <option value={"Magister"}>Magister</option>
                        <option value={"Ingeniero"}>Ingeniero</option>
                        <option value={"Ingeniera"}>Ingeniera</option>
                    </select>
                </div>
                {/* <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-200" htmlFor="user">Mencion</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="user" placeholder="Ej. 812512" />
                </div> */}
                <button className="w-full my-5 py-3 bg-blue-500 shadow-lg  hover:bg-blue-600 text-white font-semibold rounded-lg">{id ? 'Guardar Cambios' : 'Crear docente'}</button>
            </form>
        </>
    )
}
