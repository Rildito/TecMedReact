
import { Link } from 'react-router-dom';
import useProyect from '../hooks/useProyect';
export default function ModalConfirmarNavegacion() {

    const { changeConfirmationNavegation, respuestaNavegacion } = useProyect();
    // console.log(respuestaNavegacion)
    return (

        <>
            <div className="flex justify-between items-center pb-3">
                <p className='font-bold uppercase text-2xl'>NUEVO MENSAJE</p>
                <button onClick={changeConfirmationNavegation}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rose-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <div className='md:h-[10rem] md:w-[30rem] h-[30rem] overflow-hidden relative overflow-y-auto'>
                {/* <p className='bg-blue-950'>{respuestaNavegacion.message}</p>
                <Link to={`/administrativo/correspondencia-recibida/${respuestaNavegacion.id}/colaboradores`}>Ir a la correspondencia?</Link>
                <button className='' onClick={changeConfirmationNavegation}>Cancelar</button> */}
                <p className='bg-blue-900 text-white font-bold text-xl p-3'>Nuevo mensaje de: <span className='text-yellow-500'>{respuestaNavegacion.nombreCompleto}</span> de la correspondencia: <span className='text-yellow-500'>{respuestaNavegacion.nombreCorrespondencia}</span></p>
                <div className='flex items-center justify-center mt-2 gap-2 flex-wrap'>
                    <Link to={`/administrativo/correspondencia-recibida/${respuestaNavegacion.id}/colaboradores`} className='bg-blue-950 text-white font-black text-lg rounded-lg p-2' onClick={changeConfirmationNavegation}>¿Ir a la correspondencia?</Link>
                    <button className='bg-red-700 text-white font-black text-lg rounded-lg p-2' onClick={changeConfirmationNavegation}>Cancelar</button>
                </div>
            </div>

        </>

    )
}
