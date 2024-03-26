import { Link, useLocation } from 'react-router-dom';

import useProyect from '../hooks/useProyect'

export default function Encabezado() {

    const { filtrado, setFiltrado } = useProyect();
    const location = useLocation();
    const { view, changeViewMenu, menuMateriales, usuarioLogin, pedido } = useProyect();
    return (
        <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between p-2 rounded-lg shadow-2xl bg-white">
            <div className="flex max-lg:flex-col max-lg:gap-3 items-center justify-between w-full lg:mr-5">
                {
                    <p className="font-black md:text-4xl text-3xl text-blue-950 capitalize md:mr-3 text-center">{view}</p>
                }
                <div className='flex gap-2'>
                    {
                        (usuarioLogin.tipo === 'administrativo' ||
                            usuarioLogin.tipo === 'administrador') ? (
                            <Link
                                to={'nuevo'}
                                className='bg-blue-950 text-center text-white font-black p-3 rounded-lg'
                            >Crear</Link>
                        ) : null
                    }
                    {
                        (pedido.length > 0) && (
                            <button
                                className='bg-blue-950 text-center text-white font-black p-3 rounded-lg'
                                onClick={changeViewMenu}
                            >{menuMateriales ? 'Ocultar pedido' : 'Ver pedido'}</button>)
                    }
                    {
                        location.pathname === '/administrativo/caja-chica' && (
                            <>
                                <Link
                                    to={'historial'}
                                    className='bg-blue-800 text-center text-white font-black p-3 rounded-lg'
                                >Historial</Link>
                            </>
                        )

                    }

                </div>
            </div>
            <div>
                <form>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="md:w-40 w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Escribe algo..."
                            value={filtrado}
                            onChange={e => setFiltrado(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </div >
    )
}
