import { useEffect, useState } from 'react'
import useProyect from '../hooks/useProyect'
import Cargando from './Cargando';
import Alerta from './Alerta';
import clienteAxios from '../config/axios';
import useSWR from 'swr';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormularioColaborador() {

    const { cargando, crearRespuesta, usuarioCreador, changeStateModalRespuesta, usuarioColaborador, respuestaElegida,editarRespuesta} = useProyect();
    const params = useParams();
    const { id } = params

    const [errores, setErrores] = useState([])
    // const [estadoDocumento, setEstadoDocumento] = useState('reemplazar')

    const [respuesta, setRespuesta] = useState('');
    const [file, setFile] = useState({})

    const handleFileSelect = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let resultado = false
        const datos = {
            respuesta,
            documento: file,
            creador_id: usuarioCreador,
            creador_secundario_id: usuarioColaborador,
            correspondencia_id: id,
            // estadoDocumento
        }

        if (respuestaElegida) {
            resultado = await editarRespuesta(datos, setErrores)
        } else {
            resultado = await crearRespuesta(datos, setErrores)
        }

        if (resultado) {
            changeStateModalRespuesta();
        }
    }

    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => (
        clienteAxios(`/api/response/${respuestaElegida}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    )

    const { data, error, isLoading} = useSWR(()=> respuestaElegida ? `/api/response/${respuestaElegida}`: null, fetcher,{
        refreshInterval:1000
    })
    useEffect(() => {
        if (respuestaElegida && !isLoading) {
            setRespuesta(data.data.response)
        }
    }, [isLoading])

    if (isLoading) return <Cargando />

    return (
        <>
            <p className='bg-sky-800 p-2 mt-2 rounded-lg text-white text-lg'>Crea o edita una respuesta para la correspondencia que seleccionaste puedes enviar solo la respuesta y si gustas tambien el documento.</p>
            <form className="max-w-[500px] w-full mx-auto mt-5 bg-gray-900 px-5 py-1 rounded-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <div className="flex flex-col text-gray-400 py-1">
                    <label className="text-gray-200" htmlFor="respuesta">Respuesta</label>
                    <textarea
                        className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white h-24'
                        value={respuesta} onChange={e => setRespuesta(e.target.value)} id='respuesta' name='respuesta'
                    />
                </div>
                {
                    respuestaElegida ? Boolean(data?.data?.document) ? <>
                    {/* <div className='flex justify-around mt-2'>
                        <button type="button" className={` bg-blue-500 ${estadoDocumento === 'reemplazar' && 'bg-blue-800'} font-bold text-white p-2 rounded-lg`} onClick={()=>setEstadoDocumento('reemplazar')}>Reemplazar</button>
                        <button type="button" className={`bg-blue-500 ${estadoDocumento === 'aumentar' && 'bg-blue-800'} font-bold text-white p-2 rounded-lg`} onClick={()=>setEstadoDocumento('aumentar')}>Aumentar</button>
                    </div> */}
                    <p className='text-yellow-500 text-center font-bold mt-1'>Ya existe un documento guardado</p>
                    </> : <p className='text-yellow-500 text-center font-bold mt-1'>No existe un documento guardado</p> : null
                }
                <div className="flex flex-col text-gray-400">
                    <label className="text-gray-200" htmlFor="foto">Documento (.pdf)</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white w-full" type="file" id="foto" onChange={handleFileSelect} name="documento" accept=".pdf" />
                </div>
                <button className="w-full my-5 py-3 bg-blue-500 shadow-lg  hover:bg-blue-600 text-white font-semibold rounded-lg" disabled={cargando}>{respuestaElegida ? 'Guardar cambios' : 'Enviar respuesta'}</button>
            </form>
        </>
    )
}
