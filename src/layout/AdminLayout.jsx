import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import SinPermisos from '../components/SinPermisos';
import useProyect from '../hooks/useProyect';
import { ToastContainer } from 'react-toastify';

export default function AdminLayout() {
    const { usuarioLogin } = useProyect();
    if (!Boolean(usuarioLogin)) return <SinPermisos />
    if (usuarioLogin.tipo == 'administrador') {
        return (
            <>
                <div className='md:flex'>
                    <Sidebar />
                    <main className='flex-1 h-screen overflow-y-scroll bg-indigo-50 p-3'>
                        <Outlet />
                    </main>
                </div>
                <ToastContainer />
            </>
        )
    } else {
        return <SinPermisos />
    }

}

