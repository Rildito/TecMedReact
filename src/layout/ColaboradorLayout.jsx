import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ModalDocumento from '../components/ModalDocumento';
import ModalRespuesta from '../components/ModalRespuesta';

import Modal from 'react-modal'
import useProyect from '../hooks/useProyect'
import Sidebar from '../components/Sidebar'
import SinPermisos from '../components/SinPermisos';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",

    },
};

Modal.setAppElement('#root')

export default function ColaboradorLayout() {
    const { usuarioLogin, modalCorrespondencia, modalRespuesta } = useProyect();
    if (!Boolean(usuarioLogin)) return <SinPermisos />
    if (usuarioLogin.tipo == 'colaborador') {
        return (
            <>
                <div className='md:flex'>
                    <Sidebar />

                    <main className='flex-1 h-screen overflow-y-scroll bg-indigo-50 p-3'>
                        <Outlet />
                    </main>
                </div>
                <Modal isOpen={modalRespuesta} style={customStyles}>
                    <ModalRespuesta />
                </Modal>
                <Modal isOpen={modalCorrespondencia} style={customStyles}>
                    <ModalDocumento />
                </Modal>
                <ToastContainer />
            </>
        )
    } else {
        return <SinPermisos />
    }

}

