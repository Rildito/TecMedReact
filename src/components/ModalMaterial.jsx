import { useEffect, useState } from "react";
import useProyect from "../hooks/useProyect";
import Cargando from "./Cargando";

export default function ModalMaterial() {

    const [cantidad, setCantidad] = useState(1);

    const { changeStateModalMaterial, material, cargandoModal, aumentarPedido, editarPedido, pedido, changeViewMenu, menuMateriales } = useProyect();

    const aumentarCantidad = () => {
        setCantidad(Math.min(cantidad + 1, material.cantidad_disponible))
    }

    const reducirCantidad = () => {
        setCantidad(Math.max(cantidad - 1, 1))
    }

    const agregarPedido = () => {

        const pedidoEncontrado = pedido.some(element => element.id === material.id)

        if (!pedidoEncontrado) {
            aumentarPedido({
                id: material.id,
                nombre: material.nombre,
                cantidad
            });
        }
    }

    useEffect(() => {
        if (material.cantidad) {
            setCantidad(material.cantidad)
        }
        return () => {
            setCantidad(1)
        }
    }, [material])

    if (cargandoModal) return <Cargando />

    return (

        <>
            <div className="flex justify-between items-center pb-2">

                <p className='font-bold uppercase text-2xl'>{material.nombre}</p>

                <button onClick={changeStateModalMaterial}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rose-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <p>{material.descripcion}</p>
            <div className="md:h-[20rem] md:w-[35rem] h-[23rem] overflow-y-auto border mt-3 bg-gray-900">
                <div className="h-full flex flex-col md:flex-row items-center justify-around">
                    <div className="shadow-lg md:w-56 w-40">
                        <img
                            src={material.imagen}
                            className='rounded bg-white max-md:mt-5'
                        />
                    </div>
                    <div className="flex flex-col shadow-lg p-5 gap-5">
                        <p className="text-lg text-white">Cantidad disponible: <span className="font-black">{material.cantidad_utilizada}</span></p>
                        <div className="flex justify-between items-center">
                            <button className="bg-yellow-500 hover:bg-yellow-600 rounded-full w-7 h-7 flex items-center justify-center" onClick={reducirCantidad}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>
                            </button>
                            <span className="text-2xl font-bold text-white">{material.cantidad_utilizada !== 0 ? cantidad: 0}</span>
                            <button className="bg-green-500 hover:bg-green-600 rounded-full w-7 h-7 flex items-center justify-center" onClick={aumentarCantidad}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                        <button className="w-full bg-blue-700 hover:bg-blue-900 text-white font-black py-1 rounded-full" disabled={material.cantidad_utilizada === 0} onClick={() => {
                            agregarPedido()
                            changeStateModalMaterial()
                            if (material.cantidad) {
                                editarPedido({ nombre: material.nombre, id: material.id, cantidad })
                            }
                            if (!menuMateriales) {
                                changeViewMenu()
                            }

                            if (window.innerWidth <= 639) {
                                changeViewMenu()
                            }
                        }}
                        >{material.cantidad ? 'GUARDAR CAMBIOS' : 'PEDIR'}</button>
                    </div>
                </div>

            </div>

        </>

    )
}