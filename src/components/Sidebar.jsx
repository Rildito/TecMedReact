import logoImg from '../../public/images/logoTecMed.png'
import useProyect from '../hooks/useProyect'
import AdministradorOpciones from './AdministradorOpciones';
import AdministrativoOpciones from './AdministrativoOpciones'
import { useAuth } from '../hooks/useAuth';
import ColaboradorOpciones from './ColaboradorOpciones';
import EstudianteOpciones from './EstudianteOpciones';
import Notificaciones from './Notificaciones';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const { viewAdministrativo, changeViewAdministrativo, usuarioLogin } = useProyect();
    const { logout } = useAuth();

    return (
        <aside className="md:w-72 bg-slate-900 pb-2">
            <div className="pt-5 px-4 flex items-center justify-center gap-2">
                <img
                    className="w-14"
                    src={logoImg}
                    alt="Imagen Logo"
                    style={{
                        filter: 'drop-shadow(-1px 1px 10px rgba(255, 255, 255, 1))'
                    }}
                />
                <h2 className='text-center font-black text-yellow-500'>DOCUMENTACIÓN INTERNA - CARRERA DE TECNOLOGÍA MÉDICA</h2>
            </div>
            <button type="button" className='w-full bg-red-500 hover:bg-red-600 mt-4 p-3 font-black text-white text-sm' onClick={logout}>Cerrar Sesion</button>
            {
                usuarioLogin.tipo !== 'administrador' && (
                    <Link to={`/${usuarioLogin.tipo}/editarDatos`} className='w-full block text-center bg-blue-500 hover:bg-blue-600 mt-4 p-3 font-black text-white text-sm'>Editar datos</Link>
                )
            }
           
            <div className='mt-5 p-2 flex items-center gap-1 justify-center border border-x-0 border-yellow-500'>
                <div className='relative'>
                    <img
                        className="w-12 h-12 rounded-full border-2"
                        src={usuarioLogin.imagen}
                        alt="Imagen Logo"
                    />
                    {
                        usuarioLogin.tipo == 'administrativo' && <Notificaciones />
                    }
                </div>
                <p className="text-center text-white">Hola: <span className='font-bold text-yellow-300'>{usuarioLogin.nombres}</span></p>

            </div>
            {
                usuarioLogin.tipo == 'administrativo' && (
                    <AdministrativoOpciones
                        viewAdministrativo={viewAdministrativo}
                        changeViewAdministrativo={changeViewAdministrativo}
                    />
                )
            }

            {
                usuarioLogin.tipo == 'administrador' && (
                    <AdministradorOpciones
                    />
                )
            }

            {
                usuarioLogin.tipo == 'estudiante' && (
                    <EstudianteOpciones />
                )
            }

            {
                usuarioLogin.tipo == 'colaborador' && (
                    <ColaboradorOpciones />
                )
            }

        </aside>
    )
}
