import { useNavigate, useParams } from "react-router-dom";
import useProyect from "../hooks/useProyect";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import useSWR from "swr";
import Cargando from "./Cargando";
import Alerta from "./Alerta";

export default function FormularioInterested() {

  const { editarCustodio, crearCustodio, cargando } = useProyect()
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [errores, setErrores] = useState([])

  const token = localStorage.getItem('AUTH_TOKEN')

  const fetcher = () => (
    clienteAxios(`/api/interesteds/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  )

  const { data, error, isLoading, mutate } = useSWR(id ? `/api/interesteds/${id}` : null, fetcher, {
    refreshInterval: 1000
  })

  useEffect(() => {
    if (id && !isLoading) {
      setNombre(data.data.nombreCompleto)
    }
  }, [isLoading])

  const handleSubmit = async (e) => {
    let resultado = false
    e.preventDefault()
    const datos = {
      nombreCompleto: nombre
    }

    if (id) {
      resultado = await editarCustodio({ ...datos, id }, setErrores)
      mutate(datos)
    } else {
      resultado = await crearCustodio(datos, setErrores)
    }

    if (resultado) {
      navigate('/administrador/caja-chica/custodio');
    }
  }
  if (isLoading) return <Cargando />

  return (
    <>
      <form className="max-w-[500px] w-full mx-auto mt-5 bg-gray-900 px-5 py-2 rounded-lg" onSubmit={handleSubmit}>
        {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
        <div className="flex flex-col text-gray-400 py-2">
          <label className="text-gray-200" htmlFor="user">Nombre de custodio</label>
          <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="user" placeholder="Ej. Reunion de delegados" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>

        <button className="w-full my-5 py-3 bg-blue-500 shadow-lg  hover:bg-blue-600 text-white font-semibold rounded-lg" disabled={cargando}>{id ? 'Guardar cambios' : 'Crear custodio'}</button>
      </form>
    </>
  )
}
