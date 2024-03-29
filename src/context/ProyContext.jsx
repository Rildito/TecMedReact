import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import clienteAxios from '../config/axios';
import CryptoJS from "crypto-js"


const ProyContext = createContext()

const ProyProvider = ({ children }) => {

    //Utilidades
    const [cargando, setCargando] = useState(false);
    const [cargandoModal, setCargandoModal] = useState(false);
    const [usuarioLogin, setUsuarioLogin] = useState({});
    const [view, setView] = useState('');
    const [modalCorrespondencia, setModalCorrespondencia] = useState(false)
    const [modalCajaChica, setModalCajaChica] = useState(false)
    const [modalCajaChicaDocumento, setModalCajaChicaDocumento] = useState(false)
    const [modalMaterial, setModalMaterial] = useState(false)
    const [menuMateriales, setMenuMateriales] = useState(false);
    const [modalMoreDetails, setModalMoreDetails] = useState(false);
    const [modalColaboradores, setModalColaboradores] = useState(false);
    const [modalRespuesta, setModalRespuesta] = useState(false);
    const [modalDocumentoGeneradoCorrespondencia, setModalDocumentoGeneradoCorrespondencia] = useState(false);
    const [modalNavegacion, setModalNavegacion] = useState(false);
    const [filtrado, setFiltrado] = useState('');

    const [documentoElegido, setDocumentoElegido] = useState({});
    const [gastoElegido, setGastoElegido] = useState({});
    const [fechasGasto, setFechasGasto] = useState({});
    const [fechasDocumento, setFechasDocumento] = useState({});
    const [usuarioColaborador, setUsuarioColaborador] = useState('');
    const [usuarioCreador, setUsuarioCreador] = useState('');
    const [respuestaElegida, setRespuestaElegida] = useState('');
    const [respuestaNavegacion, setRespuestaNavegacion] = useState('');


    //Pedidos de materiales

    const [material, setMaterial] = useState({});
    const [pedido, setPedido] = useState([])
    const [pedidoUrl, setPedidoUrl] = useState([])
    const [pedidos, setPedidos] = useState([])

    //Const editado de formularios


    const aumentarPedido = (pedidoUsuario) => {
        setPedido([...pedido, pedidoUsuario])
    }

    const changeView = (viewWord) => {
        setView(viewWord)
    }

    const changeConfirmationNavegation = () => {
        setModalNavegacion(!modalNavegacion)
    }
    const changeStateModalCorrespondencia = () => {
        setModalCorrespondencia(!modalCorrespondencia)
    }

    const changeStateModalCajaChica = () => {
        setModalCajaChica(!modalCajaChica)
    }

    const changeStateModalCajaChicaDocumento = () => {
        setModalCajaChicaDocumento(!modalCajaChicaDocumento)
    }

    const changeStateModalDocumentoGenerado = () => {
        setModalDocumentoGeneradoCorrespondencia(!modalDocumentoGeneradoCorrespondencia)
    }
    const changeStateModalMaterial = () => {
        setModalMaterial(!modalMaterial)
    }
    const changeStateModalRespuesta = () => {
        setModalRespuesta(!modalRespuesta)
    }

    const changeViewMenu = () => {
        setMenuMateriales(!menuMateriales)
    }

    const showDetails = () => {
        setModalMoreDetails(!modalMoreDetails)
    }

    const showCollaborators = () => {
        setModalColaboradores(!modalColaboradores)
    }

    //Correspondence

    const crearCorrespondencia = async (correspondence, setErrores) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post('/api/correspondences', correspondence, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors))
        } finally {
            setCargando(false)
        }
    }

    const editarCorrespondencia = async (correspondence, setErrores, id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post(`/api/correspondences/${id}`, { ...correspondence, id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors))
        } finally {
            setCargando(false)
        }
    }

    const eliminarCorrespondencia = async (id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.delete(`/api/correspondences/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return data.message
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors))
        } finally {
            setCargando(false)
        }
    }

    const confirmarEliminarCorrespondencia = async (id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.delete(`/api/correspondences/recover/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return data.message
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors))
        } finally {
            setCargando(false)
        }
    }
    const recuperarCorrespondencia = async (id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post(`/api/correspondences/recover/${id}`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return data.message
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors))
        } finally {
            setCargando(false)
        }
    }
    //Colaboradores
    const agregarColaborador = async (colaborator_id, user_id, correspondence_id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post(`/api/collaborators`, {
                secondary_user_id: colaborator_id,
                primary_user_id: user_id,
                correspondence_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return data.message
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    const crearRespuesta = async (datos, setErrores) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post('/api/response', datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors || []))
        } finally {
            setCargando(false)
        }
    };

    const editarRespuesta = async (datos, setErrores) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post(`/api/response/edit/${respuestaElegida}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'multipart/form-data'
                }
            })
            console.log(data)
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false)
        }
    };

    const eliminarRespuesta = async (id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.delete(`/api/response/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return data.message
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }
    //Caja Chica

    const crearGasto = async (spent, setErrores) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post('/api/spents', spent, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false)
        }
    }

    const editarGasto = async (spent, setErrores, id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.put(`/api/spents/${id}`, { ...spent, id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors))
        } finally {
            setCargando(false)
        }
    }

    const eliminarGasto = async (id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.delete(`/api/spents/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return data.message
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    //Pedidos
    const disminuirPedido = (id) => {
        const nuevoPedido = pedido.filter(material => material.id != id);
        setPedido(nuevoPedido)
        if (pedido.length == 0) {
            changeViewMenu()
        }
    }

    const editarPedido = (materialEditado) => {
        const nuevoPedido = pedido.map(material => material.id != materialEditado.id ? material : materialEditado);
        setPedido(nuevoPedido)
    }

    const realizarPedido = async (pedido, setErrores) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios.post('/api/orders', pedido, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            setPedido([])
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false)
        }
    }

    const obtenerMaterialId = async (id, cantidad = 0) => {
        setCargandoModal(true)
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios(`/api/materials/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (cantidad != 0) {
                setMaterial({ ...data, cantidad });
            } else {
                setMaterial(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setCargandoModal(false)
        }
    }

    const confirmarPrestamo = async datos => {
        setCargandoModal(true);
        const token = localStorage.getItem('AUTH_TOKEN')
        try {

            const { data } = await clienteAxios.post(`/api/orders/${datos.idPedido}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPedidoUrl([]);
            toast.success(data.message);
        } catch (error) {
            console.log(error)
        } finally {
            setCargandoModal(false)
        }
    }

    const eliminarPrestamo = async id => {
        setCargando(true)
        const token = localStorage.getItem('AUTH_TOKEN')

        try {

            const { data } = await clienteAxios.delete(`/api/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
            return data.message
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    const obtenerPrestamo = async id => {
        setCargandoModal(true);
        const token = localStorage.getItem('AUTH_TOKEN')
        try {

            const { data } = await clienteAxios(`/api/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPedidoUrl(data.data);
        } catch (error) {
            console.log(error)
        } finally {
            setCargandoModal(false)
        }
    }

    const obtenerPrestamos = async () => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN')
        try {

            const { data } = await clienteAxios('/api/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPedidos(data.data);
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    //Usuarios

    const activarUsuario = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.put(`/api/users/activated/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    const crearUsuario = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.post(`/api/registroUsuario`, datos, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
            document.getElementById('formRegistro').scrollIntoView({top:0, behavior:'smooth'})
        } finally {
            setCargando(false);
        }

    }

    const editarUsuario = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.post(`/api/users/${datos.id}`, datos, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }

    }

    const eliminarUsuario = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    //Materias

    const crearMateria = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.post(`/api/subjects`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }

    const editarMateria = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.put(`/api/subjects/${datos.id}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }

    const eliminarMateria = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.delete(`/api/subjects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    //Unidades
    const crearUnidad = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.post(`/api/units`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }

    const editarUnidad = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.put(`/api/units/${datos.id}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
            return true
        } finally {
            setCargando(false);
        }
    }
    const eliminarUnidad = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.delete(`/api/units/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    //Docentes

    const crearDocente = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.post(`/api/teachers`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }

    const editarDocente = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.put(`/api/teachers/${datos.id}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }

    const eliminarDocente = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.delete(`/api/teachers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    //Materiales

    const crearMaterial = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.post(`/api/materials`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }

    const editarMaterial = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.post(`/api/materials/${datos.id}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success(data.message)
            return true

        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }

    const eliminarMaterial = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.delete(`/api/materials/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }


    //Interesteds

    const crearCustodio = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.post(`/api/interesteds`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true
        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }

    const editarCustodio = async (datos, setErrores) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.put(`/api/interesteds/${datos.id}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message)
            return true

        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors))
        } finally {
            setCargando(false);
        }
    }

    const eliminarCustodio = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.delete(`/api/interesteds/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    //Elegir responsable

    const elegirResponsable = async (datos) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.patch(`/api/moneybox/${datos.id}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    //Elegir director

    const elegirDirector = async (datos) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            setCargando(true);
            const { data } = await clienteAxios.patch(`/api/moneybox/director/${datos.id}`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    //Recargas
    const crearRecarga = async (monto) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            const { data } = await clienteAxios.post(`/api/recharges/create`, { monto }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.message
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    //Obtener unidad seleccionada

    const obtenerUnidades = async (unidad) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios(`/api/units/selected/${unidad}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        const informacionDesencriptada = CryptoJS.AES.decrypt(localStorage.getItem('usuario'),'secret_key')
        const usuarioJSON = informacionDesencriptada.toString(CryptoJS.enc.Utf8)
        setUsuarioLogin(JSON.parse(usuarioJSON))
    }, [])


    return (
        <ProyContext.Provider value={{
            cargando,
            cargandoModal,
            documentoElegido,
            gastoElegido,
            fechasGasto,
            fechasDocumento,
            filtrado,
            material,
            menuMateriales,
            modalCajaChica,
            modalCajaChicaDocumento,
            modalDocumentoGeneradoCorrespondencia,
            modalCorrespondencia,
            modalColaboradores,
            modalMaterial,
            modalMoreDetails,
            modalRespuesta,
            modalNavegacion,
            pedido,
            pedidoUrl,
            pedidos,
            respuestaElegida,
            respuestaNavegacion,
            usuarioLogin,
            usuarioColaborador,
            usuarioCreador,
            view,
            activarUsuario,
            agregarColaborador,
            aumentarPedido,
            changeView,
            changeConfirmationNavegation,
            crearCorrespondencia,
            crearCustodio,
            crearGasto,
            crearRespuesta,
            crearRecarga,
            crearDocente,
            crearMateria,
            crearMaterial,
            crearUnidad,
            crearUsuario,
            confirmarEliminarCorrespondencia,
            obtenerMaterialId,
            changeStateModalCajaChica,
            changeStateModalCajaChicaDocumento,
            changeStateModalCorrespondencia,
            changeStateModalDocumentoGenerado,
            changeStateModalMaterial,
            changeStateModalRespuesta,
            changeViewMenu,
            confirmarPrestamo,
            disminuirPedido,
            editarCustodio,
            editarDocente,
            editarPedido,
            editarGasto,
            editarCorrespondencia,
            editarMateria,
            editarMaterial,
            editarRespuesta,
            editarUsuario,
            editarUnidad,
            elegirResponsable,
            elegirDirector,
            eliminarCustodio,
            eliminarDocente,
            eliminarPrestamo,
            eliminarRespuesta,
            eliminarGasto,
            eliminarCorrespondencia,
            eliminarMateria,
            eliminarMaterial,
            eliminarUsuario,
            eliminarUnidad,
            obtenerPrestamo,
            obtenerPrestamos,
            obtenerUnidades,
            realizarPedido,
            recuperarCorrespondencia,
            setCargando,
            setFechasGasto,
            setFechasDocumento,
            setRespuestaElegida,
            setUsuarioLogin,
            setFiltrado,
            setDocumentoElegido,
            setGastoElegido,
            setPedido,
            setUsuarioColaborador,
            setUsuarioCreador,
            setRespuestaNavegacion,
            showDetails,
            showCollaborators
        }}>
            {children}
        </ProyContext.Provider>
    )
}

export { ProyProvider }

export default ProyContext