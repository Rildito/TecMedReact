import useSWR from "swr";
import clienteAxios from "../config/axios";
import useProyect from "../hooks/useProyect";
import Cargando from "./Cargando";

export default function ModalDocumentoGeneradoCorrespondencia() {

    const { changeStateModalDocumentoGenerado, fechasDocumento } = useProyect();
    const { dateOne, dateTwo, tipoCorrespondencia } = fechasDocumento;
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios(`/api/correspondences/${dateOne}/${dateTwo}/${tipoCorrespondencia}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR(`/api/moneybox/${dateOne}/${dateTwo}/${tipoCorrespondencia}`, fetcher)

    if (isLoading) return <Cargando />
    console.log(error)
    console.log(data)
    return (

        <>
            <div className="flex justify-between items-center pb-3">

                <p className='font-bold uppercase text-2xl'>Corrrespondencia documento generado</p>

                <button onClick={changeStateModalDocumentoGenerado}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rose-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <div className="md:h-[37rem] md:w-[50rem] h-[30rem] overflow-hidden relative overflow-y-auto">
                <iframe
                    className="w-full h-full"
                    src={`data:application/pdf;base64,${data?.pdfContent}`}
                />
            </div>

        </>

    )
}
