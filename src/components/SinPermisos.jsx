import { Link } from 'react-router-dom'

export default function SinPermisos() {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 h-screen mx-auto gap-5">
      <img
        src="/images/sinPermiso.png"
      />
      <p className="font-black text-5xl text-center">Lo siento, no tienes permisos para ver esta pagina.</p>

      <Link to="/auth/login" className='bg-blue-900 hover:bg-blue-950 p-3 rounded-lg font-black text-white mt-2'>¿Iniciar Sesion?</Link>
    </div>
  )
}
