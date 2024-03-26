import { Outlet } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import Modal from 'react-modal'
import useProyect from '../hooks/useProyect'
import Sidebar from '../components/Sidebar'
import ModalDetallesMateriales from '../components/ModalDetallesMateriales';
import ModalMaterial from '../components/ModalMaterial';
import SinPermisos from '../components/SinPermisos';
import ModalColaboradores from '../components/ModalColaboradores';
import ModalCajaChica from '../components/ModalCajaChica';
import ModalCajaChicaDocumento from '../components/ModalCajaChicaDocumento';
import ModalDocumento from '../components/ModalDocumento';
import ModalRespuesta from '../components/ModalRespuesta';
import ModalDocumentoGeneradoCorrespondencia from '../components/ModalDocumentoGeneradoCorrespondencia';
import { usePusher } from '../hooks/usePusher';
import ModalConfirmarNavegacion from '../components/ModalConfirmarNavegacion';


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

export default function Layout() {
  const { modalMoreDetails, modalMaterial, usuarioLogin, modalCorrespondencia, modalCajaChica, modalCajaChicaDocumento, modalColaboradores, modalRespuesta, modalDocumentoGeneradoCorrespondencia, changeConfirmationNavegation, setRespuestaNavegacion, modalNavegacion } = useProyect();
  const pusher = usePusher('my-channel', 'event-notification', data => {
    console.log(data)
    const audio = new Audio('/musica/notificacion.mp3')
    audio.play();
    setRespuestaNavegacion({
      nombreCompleto: data.nombreCompleto,
      nombreCorrespondencia: data.correspondencia,
      id: data.id
    })
    changeConfirmationNavegation();
    // alert(data.message)
  })
  if (!Boolean(usuarioLogin)) return <SinPermisos />
  if (usuarioLogin.tipo == 'administrativo') {
    return (
      <>
        <div className='md:flex'>
          <Sidebar />

          <main className='flex-1 h-screen overflow-y-scroll bg-slate-200 p-3'>
            <Outlet />
          </main>
        </div>

        <Modal isOpen={modalMoreDetails} style={customStyles}>
          <ModalDetallesMateriales />
        </Modal>

        <Modal isOpen={modalMaterial} style={customStyles}>
          <ModalMaterial />
        </Modal>

        <Modal isOpen={modalCajaChica} style={customStyles}>
          <ModalCajaChica />
        </Modal>

        <Modal isOpen={modalCajaChicaDocumento} style={customStyles}>
          <ModalCajaChicaDocumento />
        </Modal>

        <Modal isOpen={modalCorrespondencia} style={customStyles}>
          <ModalDocumento />
        </Modal>

        <Modal isOpen={modalColaboradores} style={customStyles}>
          <ModalColaboradores />
        </Modal>

        <Modal isOpen={modalRespuesta} style={customStyles}>
          <ModalRespuesta />
        </Modal>

        <Modal isOpen={modalDocumentoGeneradoCorrespondencia} style={customStyles}>
          <ModalDocumentoGeneradoCorrespondencia />
        </Modal>

        <Modal isOpen={modalNavegacion} style={customStyles}>
          <ModalConfirmarNavegacion />
        </Modal>
        <ToastContainer />
      </>
    )
  } else {
    return <SinPermisos />
  }

}

