import { Link } from "react-router-dom";
import FormularioInterested from "../components/FormularioInterested";

export default function FormCustodio() {
  return (
    <>
      <div className="flex justify-center mt-3">
        <Link
          to={-1}
          className='bg-blue-950 text-center text-white font-black p-3 rounded-lg'
        >Volver pantalla principal</Link>
      </div>

      <FormularioInterested />
    </>
  )
}
