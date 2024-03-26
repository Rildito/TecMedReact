import { Glow, GlowCapture } from '@codaworks/react-glow'
import useProyect from '../hooks/useProyect'

export default function Card({ imagen, nombre, descripcion, id }) {

    const { changeStateModalMaterial, obtenerMaterialId, setCargando } = useProyect();

    return (

        <GlowCapture>
            <Glow>
                <div className="bg-gray-700 w-56 h-96 p-4 flex flex-col items-center gap-2 rounded-lg glow:bg-gray-900 box-border">
                    <div className="shadow-lg">
                        <img
                            src={imagen}
                            className='rounded bg-white h-40'
                        />
                    </div>
                    <div className='h-full flex flex-col justify-between items-center'>
                        <p className="font-black text-2xl text-yellow-500">{nombre}</p>
                        <p className="text-justify text-sky-50 max-h-28 max-w-full overflow-hidden">{descripcion}</p>
                        <button
                            type="button"
                            className="font-black text-1xl bg-slate-50 text-blue-600 text-center w-full mt-2 py-1 rounded-lg uppercase hover:bg-slate-100"
                            onClick={() => {
                                changeStateModalMaterial()
                                obtenerMaterialId(id)
                            }}
                        >Solicitar</button>
                    </div>

                </div>
            </Glow>
        </GlowCapture>
    )
}
