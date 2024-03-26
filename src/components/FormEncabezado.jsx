import { Link, useParams } from 'react-router-dom';

import useProyect from '../hooks/useProyect'

export default function FormEncabezado() {

    const params = useParams();
    const { id } = params;

    let action = id ? 'Editando...' : 'Crear...';

    return (
        <>
            <div className="flex justify-between p-2 rounded-lg shadow-2xl bg-white">
                <div className="flex items-center justify-between w-full mr-5">
                    <p className="font-black text-4xl text-blue-900 sm:ml-2 capitalize">
                        {action}
                    </p>
                    <Link
                        to={-1}
                        className='bg-blue-950 text-white font-black p-3 rounded-lg flex gap-1 items-center'
                    >Volver  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg></Link>
                </div>
            </div>
        </>
    )
}
