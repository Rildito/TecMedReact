import useProyect from "../hooks/useProyect"
import Cargando from "./Cargando"
import { useEffect, useState } from "react";

export default function InformacionPrestamo() {

  const [descripcion, setDescripcion] = useState('')
  const { pedidoUrl, cargandoModal, confirmarPrestamo, showDetails } = useProyect()

  const { usuario, docente, materia, materiales, id: idPedido, descripcion: descripcionPedido } = pedidoUrl;

  useEffect(() => {
    if (descripcionPedido?.length != 0) {
      setDescripcion(descripcionPedido)
    }
  }, [descripcionPedido])

  const handleSubmit = async () => {
    
    await confirmarPrestamo({ idPedido, descripcion, materiales })
    showDetails()
  }

  if (cargandoModal) return <Cargando />
  
  return (
    <>
      <div>
        <div className="flex justify-between items-center border-4 border-gray-900 bg-gray-900 p-3 px-5">
          <div className="text-white text-lg">
            <p>{usuario?.ru === 'Sin ru' ? 'Administrativo:' : 'Estudiante:'} <span className="font-bold">{usuario?.nombreCompleto}</span> </p>
            <p>Carnet de Identidad: <span className="font-bold">{usuario?.ci}</span></p>
            {
              usuario?.ru != 'Sin ru' &&
              <p>Número de matricula: <span className="font-bold">{usuario?.ru}</span></p>
            }
          </div>
          <img
            src={usuario?.imagen}
            className="w-20 h-20 rounded-full border-2"
          />
        </div>
        <div className="py-3">
          <p className="text-center pt-2">Docente Solicitante: <span className="font-bold">{docente?.nombreCompleto}</span></p>
          <p className="text-center">Materia: <span className="font-bold ">{materia?.nombreMateria}</span></p>
          {
            usuario?.mencion != 'Sin mencion' &&
            <p className="text-center">Mención: <span className="font-bold">{usuario?.mencion}</span></p>
          }
          <p className="text-center font-black text-xl text-yellow-600">Materiales Solicitados</p>
        </div>
        <div className="relative overflow-x-auto border-2">
          <table className="w-full text-center">
            <thead className="uppercase bg-gray-600 text-white">
              <tr>
                <th scope="col" className="p-2">
                  Material
                </th>
                <th scope="col" className="p-2">
                  Cantidad
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Acciones
                </th> */}
              </tr>
            </thead>
            <tbody>
              {
                materiales?.map(({ id, nombre, cantidad }) => (
                  <tr className="bg-white border-b" key={id}>
                    <th scope="row" className="p-2 font-medium">
                      {nombre}
                    </th>
                    <td className="p-2">
                      {cantidad}
                    </td>
                    {/* <td className="px-6 py-4">
                
                      <button className="bg-yellow-500 hover:bg-yellow-700 w-7 h-7 rounded-full mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 w-7 h-7 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white mx-auto">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </td> */}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="user" className="font-bold">Descripción:</label>
          <textarea
            className='rounded-lg bg-gray-700 mt-2 p-1 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white w-4/5 mx-auto h-14'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

      </div>
      <div className="flex">
        <button type="button" className="py-2 bg-yellow-500 hover:bg-yellow-600 w-52 mt-2 mx-auto text-white font-bold rounded-lg" onClick={handleSubmit} disabled={pedidoUrl.estado == 'Finalizado' && true}>{pedidoUrl.estado == 'Sin habilitar' ? 'Confirmar Prestamo' : 'Finalizar prestamo'}</button>
      </div>
    </>
  )
}
