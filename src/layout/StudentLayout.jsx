import { Outlet } from "react-router-dom";
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import useProyect from "../hooks/useProyect";
import Sidebar from "../components/Sidebar";
import ModalMaterial from "../components/ModalMaterial";
import SinPermisos from "../components/SinPermisos";
import ModalDocumento from "../components/ModalDocumento";
import ModalRespuesta from "../components/ModalRespuesta";
import ModalRecuperarContraseña from "../components/ModalRecuperarContraseña";
import { useEffect } from "react";

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

export default function StudentLayout() {

  const { modalMaterial, usuarioLogin, modalCorrespondencia, modalRespuesta, modalContraseña, changeStateModalContraseña } = useProyect();
  
  useEffect(()=>{
    if (usuarioLogin.resetear === '1') {
      changeStateModalContraseña(true)
    }
  },[usuarioLogin])

  if (!Boolean(usuarioLogin)) return <SinPermisos />
  if (usuarioLogin.tipo == 'estudiante') {
    return (
      <>
        <div className='md:flex'>
          <Sidebar />

          <main className='flex-1 h-screen overflow-y-scroll bg-indigo-50 p-3'>
            <Outlet />
          </main>
        </div>

        <Modal isOpen={modalContraseña} style={customStyles}>
          <ModalRecuperarContraseña />
        </Modal>

        <Modal isOpen={modalMaterial} style={customStyles}>
          <ModalMaterial />
        </Modal>

        <Modal isOpen={modalCorrespondencia} style={customStyles}>
          <ModalDocumento />
        </Modal>

        <Modal isOpen={modalRespuesta} style={customStyles}>
          <ModalRespuesta/>
        </Modal>
        <ToastContainer />
      </>
    )
  } else {
    return <SinPermisos />
  }


}