
import { useState } from 'react';
import useProyect from '../hooks/useProyect'
import Pedido from './Pedido';
import Alerta from './Alerta';


export default function Pedidos({ docente, setDocente, materia, setMateria }) {

    const { menuMateriales, pedido, realizarPedido, usuarioLogin, changeViewMenu } = useProyect();

    const [errores, setErrores] = useState([]);
    const handleSubmit = async () => {

        let erroresEncontrados = [];
        const pedidoEnviar = {
            pedido,
            usuarioId: usuarioLogin.id,
            docenteId: docente.id,
            materiaId: materia.id
        }

        if (pedido.length === 0) {
            erroresEncontrados.push('Tiene que existir al menos un material para realizar el prestamo')
        }

        if (docente === '') {
            erroresEncontrados.push('El docente es obligatorio')
        }

        if (materia === '') {
            erroresEncontrados.push('La materia es obligatoria')
        }
        setErrores(erroresEncontrados)

        if (erroresEncontrados.length === 0) {
            let resultado = false;
            resultado = await realizarPedido(pedidoEnviar, setErrores)
            if (resultado) {
                setMateria('')
                setDocente('')
                changeViewMenu();
            }
        }
    }
    //Arreglar cuando se elimina un gasto que se aumente al monot
    //Arreglar no genera el documento pdf de php
    return (
        <div className={`h-screen sm:w-80 w-full bg-gray-100 fixed top-0 right-0 p-6 ${menuMateriales ? 'opacity-100 z-10' : 'opacity-0 -z-10'} transition duration-500 overflow-y-scroll`}>
            <div className='flex justify-center items-center'>
                <button
                    className='absolute bg-blue-950 text-center text-white font-black p-1 rounded-full mb-1 right-0 mt-2'
                    onClick={changeViewMenu}
                ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>

            <h2 className='text-center font-black text-3xl text-blue-950'>Materiales pedidos</h2>
            {errores.length > 0 ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
            <p className='mt-3'>Aqui podrás ver el resumen de lo materiales que solicitaste.</p>
            {
                pedido.map(material => (
                    <Pedido
                        key={material.id}
                        nombre={material.nombre}
                        cantidad={material.cantidad}
                        id={material.id}
                    />
                ))
            }
            <p className='mt-3'>Docente: <span className='font-bold'>{docente.nombreCompleto}</span></p>
            <p className='my-3'>Materia: <span className='font-bold'>{materia.nombre}</span></p>
            <button type="button" className='font-black bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded-lg' onClick={handleSubmit}>Realizar pedido</button>
        </div>
    )
}