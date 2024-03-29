import { createRef, useEffect, useState } from 'react'
import useProyect from '../hooks/useProyect'
import Cargando from './Cargando';
import Alerta from './Alerta';
import clienteAxios from '../config/axios';
import useSWR from 'swr';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function FormularioCorrespondencia() {

    const { cargando, crearCorrespondencia, editarCorrespondencia, usuarioLogin, obtenerUnidades } = useProyect();

    const params = useParams();
    const location = useLocation();
    const { pathname } = location;

    const { id } = params
    const navigate = useNavigate();

    const [errores, setErrores] = useState([])
    const [nombre, setNombre] = useState('');
    const [hojaDeRuta, setHojaDeRuta] = useState('');
    const [area, setArea] = useState('');
    const [unidades, setUnidades] = useState([]);
    const [unidad, setUnidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [receptor, setReceptor] = useState('');
    const [tipoCorrespondencia, setTipoCorrespondencia] = useState('');
    const [estado, setEstado] = useState('Activo');

    const [file, setFile] = useState({})

    const handleFileSelect = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let resultado = false
        const datos = {
            nombre,
            hojaDeRuta,
            unit_id: unidad,
            area,
            descripcion,
            documento: file,
            receptor: receptor || '',
            creadorCorrespondencia: usuarioLogin.id,
            tipoCorrespondencia,
            estado
        }
        //console.log(datos)
        if (id) {
            resultado = await editarCorrespondencia(datos, setErrores, id)
        } else {
            resultado = await crearCorrespondencia(datos, setErrores);
        }
        //Cambiar a recibida y despachada
        if (resultado) {
            navigate(-1);
        }
    }

    let url = id ? `/api/correspondences/${id}` : `/api/correspondences/hojaDeRuta`

    const handleUnit = async (areaSelected) => {
        const unidadesObtenidas = await obtenerUnidades(areaSelected)
        setUnidades(unidadesObtenidas)
    }

    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => (
        clienteAxios(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    )


    const { data, error, isLoading } = useSWR(url, fetcher, {
        // revalidateIfStale: false,
        // revalidateOnFocus: false,
        // revalidateOnReconnect: false
    })

    useEffect(() => {
        if (pathname.includes('recibida')) {
            setTipoCorrespondencia('recibida')
        } else {
            setTipoCorrespondencia('despachada')
        }
    }, [])

    useEffect(() => {
        const obtenerDatos = async () => {
            if (id && !isLoading) {
                const unidadesObtenidas = await obtenerUnidades(data.data.unit.area)
                setUnidades(unidadesObtenidas)
                setArea(data.data.unit.area)
                setNombre(data.data.nombre)
                setHojaDeRuta(data.data.hojaDeRuta)
                setUnidad(data.data.unit.id)
                setDescripcion(data.data.descripcion)
                setFile(data.data.documento)
                setReceptor(data.data.receptor || '')
                setEstado(data.data.estado)
            }
        }
        obtenerDatos();
    }, [isLoading, data])

    useEffect(() => {
        if (Boolean(id) === false && !isLoading && pathname.includes('despachada')) {
            setHojaDeRuta(data.data.identificador);
        }
    }, [isLoading, data])

    if (isLoading) return <Cargando />

    return (
        <>
            <form className="max-w-[500px] w-full mx-auto mt-5 bg-gray-900 p-6 rounded-lg text" onSubmit={handleSubmit} encType='multipart/form-data'>
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                <div className="flex flex-col text-gray-400 pb-1">
                    <label className="text-gray-200 font-bold" htmlFor="nombre">Nombre de documento</label>
                    <input
                        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="nombre" placeholder="Ej. Reunion de delegados" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="flex flex-col text-gray-400 py-1">
                    <label className="text-gray-200 font-bold" htmlFor="hojaDeRuta">Indentificador</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="hojaDeRuta" placeholder="Ej. 812512" name="hojaDeRuta" value={hojaDeRuta} onChange={e => setHojaDeRuta(e.target.value)} />
                </div>
                <div className="flex flex-col text-gray-400 py-1">
                    <label className="text-gray-200 font-bold" htmlFor="area">Area</label>
                    <select className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white' value={area} onChange={e => {
                        setArea(e.target.value)
                        handleUnit(e.target.value)
                    }} name='area' id='area'>
                        <option value={""}>Elige un area</option>
                        <option value={"Area central"}>Area central</option>
                        <option value={"Bibliotecas"}>Bibliotecas</option>
                        <option value={"Carreras"}>Carreras</option>
                        <option value={"Facultades"}>Facultades</option>
                        <option value={"Institucion externa"}>Institucion externa</option>
                        <option value={"Institutos"}>Institutos</option>
                        <option value={"Proyectos"}>Proyectos</option>
                        <option value={"Unidad de posgrado"}>Unidad de posgrado</option>
                        <option value={"Unidad externa"}>Unidad externa</option>
                        <option value={"Externo central"}>Externo Central</option>
                    </select>
                </div>

                <div className="flex flex-col text-gray-400 py-1">
                    <label className="text-gray-200 font-bold" htmlFor="unidad">Unidad</label>
                    <select className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white' value={unidad} onChange={e => setUnidad(e.target.value)} name='unidad' id='unidad'>
                        <option value={""}>Elige una unidad</option>
                        {unidades.length > 0 && unidades.map(unidad => (
                            <option key={unidad.id} value={unidad.id}>{unidad.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col text-gray-400 py-1">
                    <label className="text-gray-200 font-bold" htmlFor="descripcion">Descripción</label>
                    <textarea
                        className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white'
                        name='descripcion'
                        value={descripcion} onChange={e => setDescripcion(e.target.value)}
                    />
                </div>
                {
                    id && <>
                        <div className="flex flex-col text-gray-400 py-1">
                            <label className="text-gray-200 font-bold" htmlFor="estado">Estado</label>
                            <select className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white' value={estado} onChange={e => setEstado(e.target.value)} id='estado' name='estado'>
                                <option value={""}>Elige un estado</option>
                                <option value={"Activo"}>Activo</option>
                                <option value={"Revisado"}>Revisado</option>
                                <option value={"Entregado"}>Entregado</option>
                                <option value={"Finalizado"}>Finalizado</option>
                                <option value={"Archivado"}>Archivado</option>
                            </select>
                        </div>

                        <div className="flex flex-col text-gray-400 py-1">
                            <label className="text-gray-200 font-bold" htmlFor="recepter">Entregado a:</label>
                            <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white" type="text" id="receptor" placeholder="Sin receptor" name="receptor" value={receptor} onChange={e => setReceptor(e.target.value)} />
                        </div>
                    </>
                }

                {
                    id && <p className='text-center font-bold text-yellow-500 my-2'>Ya existe un documento guardado</p>
                }
                <div className="flex flex-col text-gray-400">
                    <label className="text-gray-200 font-bold" htmlFor="foto">Documento (.pdf)</label>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white w-full" type="file" id="foto" onChange={handleFileSelect} name="documento" accept=".pdf" />
                </div>
                <button className="w-full mt-5 py-3 bg-blue-500 shadow-lg  hover:bg-blue-600 text-white rounded-lg font-bold" disabled={cargando}>{id ? 'Guardar cambios' : 'Crear correspondencia'}</button>
            </form>
        </>
    )
}
