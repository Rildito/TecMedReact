import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import AuthLayout from './layout/AuthLayout'
import Login from './views/Login'
import Registro from './views/Registro'
import CajaChica from './views/CajaChica'
import Materiales from './views/Materiales'
import StudentLayout from './layout/StudentLayout'
import MaterialesPrestamos from './views/MaterialesPrestamos'
import FormCorrespondencia from './views/FormCorrespondencia'
import FormCajaChica from './views/FormCajaChica'
import AdminLayout from './layout/AdminLayout'
import Usuarios from './views/Usuarios'
import Unidades from './views/Unidades'
import Docentes from './views/Docentes'
import Materias from './views/Materias'
import FormUsuario from './views/FormUsuario'
import FormUnidad from './views/FormUnidad'
import FormDocente from './views/FormDocente'
import FormMateria from './views/FormMateria'
import MaterialesAdmin from './views/MaterialesAdmin'
import FormMaterial from './views/FormMaterial'
import CajaChicaAdmin from './views/CajaChicaAdmin'
import Custodios from './views/Custodios'
import EncargadoCajaChica from './views/EncargadoCajaChica'
import FormCustodio from './views/FormCustodio'
import RecuperarContraseña from './views/RecuperarContraseña'
import ReestablecerContraseña from './views/ReestablecerContraseña'
import Inicio from './views/Inicio'
import CorrespondenciaRecibida from './views/CorrespondenciaRecibida'
import CorrespondenciaDespachada from './views/CorrespondenciaDespachada'
import Colaboradores from './views/Colaboradores'
import CorrespondenciaGeneral from './views/CorrespondenciaGeneral'
import ColaboradorEstudiante from './views/ColaboradorEstudiante'
import DirectorCajaChica from './views/DirectorCajaChica'
import ColaboradorLayout from './layout/ColaboradorLayout'
import MensajeConfirmacion from './components/MensajeConfirmacion'
import UsuariosActivar from './views/UsuariosActivar'
import HistorialCajaChica from './views/HistorialCajaChica'
import RecuperarCorrespondencia from './views/RecuperarCorrespondencia'
import Notificaciones from './views/Notificaciones'

const router = createBrowserRouter([
    {
        path:'/',
        element: <Inicio />
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            },
            {
                path: '/auth/recuperar-contraseña',
                element: <RecuperarContraseña />
            },
            {
                path: '/auth/recuperar-contraseña/verificado/:token/:email',
                element: <ReestablecerContraseña />
            },
        ]
    },
    {
        path: '/administrativo',
        element: <Layout />,
        children: [
            {
                path:'/administrativo/correspondencia-recibida',
                element: <CorrespondenciaRecibida />
            },
            {
                path:'/administrativo/correspondencia-recibida/:id/colaboradores',
                element: <Colaboradores />
            },
            {
                path:'/administrativo/correspondencia-recibida/nuevo',
                element: <FormCorrespondencia />
            },
            {
                path:'/administrativo/correspondencia-recibida/editar/:id',
                element: <FormCorrespondencia />
            },
            {
                path:'/administrativo/correspondencia-despachada',
                element: <CorrespondenciaDespachada />
            },
            {
                path:'/administrativo/correspondencia-despachada/nuevo',
                element: <FormCorrespondencia />
            },
            {
                path:'/administrativo/correspondencia-despachada/editar/:id',
                element: <FormCorrespondencia />
            },
            {
                path: '/administrativo/caja-chica',
                element: <CajaChica />
            },
            {
                path: '/administrativo/caja-chica/historial',
                element: <HistorialCajaChica />
            },
            {
                path: '/administrativo/caja-chica/nuevo',
                element: <FormCajaChica />
            },
            {
                path: '/administrativo/caja-chica/editar/:id',
                element: <FormCajaChica />
            },
            {
                path: '/administrativo/materiales',
                element: <Materiales />
            },
            {
                path: '/administrativo/materiales/nuevo',
                element: <MaterialesPrestamos />
            },
            {
                path: '/administrativo/notificaciones',
                element: <Notificaciones />
            },
        ]
    },

    {
        path:'/administrador',
        element: <AdminLayout />,
        children: [
            {
                path:'/administrador/usuarios',
                element: <Usuarios />
            },
            {
                path:'/administrador/activar-usuarios',
                element: <UsuariosActivar />
            },
            {
                path:'/administrador/usuarios/nuevo',
                element: <FormUsuario />
            },
            {
                path:'/administrador/usuarios/editar/:id',
                element: <FormUsuario />
            },
            {
                path:'/administrador/correspondencia_eliminada',
                element: <RecuperarCorrespondencia />
            },
            {
                path:'/administrador/unidades',
                element: <Unidades />
            },
            {
                path:'/administrador/unidades/nuevo',
                element: <FormUnidad />
            },
            {
                path:'/administrador/unidades/editar/:id',
                element: <FormUnidad />
            },
            {
                path:'/administrador/docentes',
                element: <Docentes />
            },
            {
                path:'/administrador/docentes/nuevo',
                element: <FormDocente />
            },
            {
                path:'/administrador/docentes/editar/:id',
                element: <FormDocente />
            },
            {
                path:'/administrador/materias',
                element: <Materias />
            },
            {
                path:'/administrador/materias/nuevo',
                element: <FormMateria />
            },
            {
                path:'/administrador/materias/editar/:id',
                element: <FormMateria />
            },
            {
                path:'/administrador/materiales',
                element: <MaterialesAdmin />
            },
            {
                path:'/administrador/materiales/nuevo',
                element: <FormMaterial />
            },
            {
                path:'/administrador/materiales/editar/:id',
                element: <FormMaterial />
            },
            {
                path:'/administrador/caja-chica',
                element: <CajaChicaAdmin />,
                children: [
                    {
                        index:true,
                        element: <div className='w-full h-28 flex justify-center items-center'><p className='font-black md:text-4xl text-3xl text-black capitalize'>Elige una opción...</p></div>
                    },
                    {
                        path:'/administrador/caja-chica/custodio',
                        element: <Custodios />
                    },
                    {
                        path:'/administrador/caja-chica/custodio/nuevo',
                        element: <FormCustodio />
                    },
                    {
                        path:'/administrador/caja-chica/custodio/editar/:id',
                        element: <FormCustodio />
                    },
                    {
                        path:'/administrador/caja-chica/director',
                        element: <DirectorCajaChica />
                    },
                    {
                        path:'/administrador/caja-chica/encargado',
                        element: <EncargadoCajaChica />
                    },
                ]
            },
        ]
    },
    {
        path: '/estudiante',
        element: <StudentLayout />,
        children: [
            {
                index: true,
                element: <MaterialesPrestamos />
            },
            {
                path:'/estudiante/correspondencia',
                element: <CorrespondenciaGeneral />
            },
            {
                path:'/estudiante/correspondencia/responder/:id',
                element: <ColaboradorEstudiante />
            }
        ]
    },
    {
        path: '/colaborador',
        element: <ColaboradorLayout />,
        children: [
            {
                path:'/colaborador/correspondencia',
                element: <CorrespondenciaGeneral />
            },
            {
                path:'/colaborador/correspondencia/responder/:id',
                element: <ColaboradorEstudiante />
            }
        ]
    },
    {
        path:'/sin-permiso',
        element: <MensajeConfirmacion />
    }
])

export default router