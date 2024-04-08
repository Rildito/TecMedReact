import { Link } from 'react-router-dom'
import useProyect from '../hooks/useProyect'

export default function EstudianteOpciones() {

    const { changeView } = useProyect()
    return (
        <div className="my-5 px-5 flex flex-col items-center wrap gap-3 ">
            <Link
                className="text-centerw-full p-3 font-bold text-white hover:text-yellow-500 truncate rounded-xl max-md:w-96 max-sm:w-full flex gap-1 items-center justify-center"
                to="/estudiante"
                onClick={() => {
                    changeView('materiales')
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
                </svg>
                Materiales
            </Link>
            {/* <Link
                className="text-center bg-teal-600 shadow-lg hover:bg-teal-700 w-full p-3 font-bold text-white truncate rounded-xl max-md:w-96 max-sm:w-full"
                to="/estudiante/correspondencia"
                onClick={() => {
                    changeView('correspondencia')
                }}
            >
                Correspondencia
            </Link> */}
        </div>
    )
}
