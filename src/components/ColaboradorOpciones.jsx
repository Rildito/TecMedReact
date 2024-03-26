import { Link } from 'react-router-dom'
import useProyect from '../hooks/useProyect'

export default function ColaboradorOpciones() {

    const { changeView } = useProyect()
    return (
        <div className="my-5 px-5 flex flex-col items-center wrap gap-3 ">

            <Link
                className="text-center bg-teal-600 shadow-lg hover:bg-teal-700 w-full p-3 font-bold text-white truncate rounded-xl max-md:w-96 max-sm:w-full"
                to="/colaborador/correspondencia"
                onClick={() => {
                    changeView('correspondencia')
                }}
            >
                Correspondencia
            </Link>

            {/* <Link
                className="text-center bg-teal-600 shadow-lg hover:bg-teal-700 w-full p-3 font-bold text-white truncate rounded-xl max-md:w-96 max-sm:w-full"
                to="/colaborador/materiales"
                onClick={() => {
                    changeView('materiales')
                }}
            >
                Materiales
            </Link> */}
        </div>
    )
}
