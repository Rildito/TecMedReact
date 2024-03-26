
import useProyect from '../hooks/useProyect';
import UsuariosColaboradores from './UsuariosColaboradores';
export default function ModalColaboradores() {

    const { showCollaborators } = useProyect();

    return (

        <>
            <div className="flex justify-between items-center pb-3">
                <p className='font-bold uppercase text-2xl'>Agregar colaboradores</p>
                <button onClick={showCollaborators}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rose-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <div className='md:h-[37rem] md:w-[50rem] h-[30rem] overflow-hidden relative overflow-y-auto'>
                <UsuariosColaboradores />
            </div>

        </>

    )
}
