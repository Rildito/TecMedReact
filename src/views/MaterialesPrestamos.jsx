import { useEffect, useState } from "react";
import Card from "../components/Card";
import Cargando from "../components/Cargando";
import Encabezado from "../components/Encabezado";
import Pedidos from "../components/Pedidos";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";
import useProyect from "../hooks/useProyect";


export default function MaterialesPrestamos() {

  const { pedido, changeViewMenu, menuMateriales, usuarioLogin, setPedido } = useProyect();
  const [docente, setDocente] = useState('');
  const [materia, setMateria] = useState('');

  const token = localStorage.getItem('AUTH_TOKEN')

  const fetcher = (urls) => {
    const f = url => clienteAxios(url,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(data => data.data)
    return Promise.all(urls.map(url => f(url)))
  }


  const urls = ['/api/teachers', '/api/subjects', '/api/materials/student']
  // const { data: [dataDocentes, dataMaterias, dataMateriales], error, isLoading } = useSWR(urls, fetcher)
  const { data, error, isLoading } = useSWR(urls, fetcher)

  useEffect(() => {
    return () => {
      setPedido([])
    }
  }, [])
  if (isLoading) return <Cargando />

  const docentes = data[0].data
  const materias = data[1].data
  const materiales = data[2].data

  return (
    <>
      <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between p-3 rounded-lg shadow-2xl bg-white">
        <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between w-full lg:mr-5">
          {
            <p className="font-black md:text-4xl text-3xl text-blue-900 capitalize md:mr-3">Materiales prestamo</p>
          }

          <div className="flex gap-2 ">
            {
              (pedido.length > 0) && (
                <button
                  className='bg-blue-950 text-center text-white font-black p-3 rounded-lg'
                  onClick={changeViewMenu}
                >{menuMateriales ? 'Ocultar pedido' : 'Ver pedido'}</button>)
            }
            {
              usuarioLogin.tipo !== 'estudiante' &&
              <Link
                to={-1}
                className='bg-blue-950 text-center text-white font-black p-3 rounded-lg flex gap-1 items-center'
              >Volver <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg></Link>

            }

          </div>
        </div>
      </div>
      <Pedidos
        docente={docente}
        setDocente={setDocente}
        materia={materia}
        setMateria={setMateria}
      />
      <div className="mt-2">
        <p className="text-lg font-bold">Elige un docente y la materia solicitante</p>
        <div className="bg-white shadow-xl flex flex-col lg:flex-row justify-around items-center p-4 my-4 rounded">
          <div className="flex items-center justify-center gap-1">
            <label className="font-bold text-center">Docente: </label>
            <select
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white w-full"
              value={docente.id || ''}
              onChange={(e) => {
                const docenteElegido = docentes?.filter(docente => docente.id == e.target.value)
                if (docenteElegido.length > 0) {
                  setDocente(docenteElegido[0])
                }
              }}
            >
              <option value={""}>Elige un docente</option>
              {
                docentes?.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.nombreCompleto}</option>
                ))
              }
            </select>
          </div>
          <div className="flex items-center justify-center gap-1">
            <label className="font-bold">Materia: </label>
            <select
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white w-full"
              value={materia.id || ''}
              onChange={(e) => {
                const materiaElegida = materias.filter(materia => materia.id == e.target.value)
                if (materiaElegida.length > 0) {
                  setMateria(materiaElegida[0])
                }
              }}>
              <option value={""}>Elige una materia</option>
              {
                materias.map(materia => (
                  <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                ))
              }
            </select>
          </div>
        </div>
        <p className="text-lg font-bold">Materiales disponibles para prestamos</p>
        <div className="flex flex-wrap gap-4 justify-center mt-3">
          {
            materiales.map(material => (
              <Card
                key={material.id}
                imagen={material.imagen}
                nombre={material.nombre}
                descripcion={material.descripcion}
                id={material.id}
              />
            ))
          }
        </div>

      </div>
    </>
  )
}
