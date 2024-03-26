import React from 'react'
import { Link } from 'react-router-dom'

export default function MensajeConfirmacion() {
    return (
        <>
            <div className="min-w-screen min-h-screen flex md:flex-row flex-col-reverse justify-center items-center bg-gradient-to-r from-slate-900 to-slate-700 gap-5 p-6">
                <div className="flex flex-col items-center justify-center gap-5 md:w-2/4">
                    <div className="text-center">
                        <p className='mb-5'>
                            <span className='bg-gradient-to-t from-[#fbcb0b] to-[#ffffff] bg-clip-text md:text-5xl text-3xl font-black text-transparent'>
                                Carrera de Tecnología Médica
                            </span>
                        </p>
                        <p>
                            <span className='bg-gradient-to-t from-[#fbcb0b] to-[#ffffff] bg-clip-text md:text-5xl text-3xl font-black text-transparent'>
                                Sistema Web de Seguimiento y Control de Documentos Internos
                            </span>
                        </p>
                    </div>
                    <p className='text-white text-center text-xl'>Gracias por registrarte en este sistema si eres un usuario administrativo o colaborador comunicate con el personal para que tu cuenta sea activada y asi puedas acceder al sistema. </p>
                    <p className='text-yellow-400 text-center text-xl'>Una vez activada tu cuenta presiona el boton de iniciar sesion o dirigete a la url: <Link to="/auth/login" className='hover:text-blue-600'>http://documentacioninternatecmed.umsa.bo</Link></p>
                    <div className="flex gap-2 justify-center md:flex-row flex-col">
                        <Link to="/auth/login" className="inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 text-center">Iniciar Sesion</Link>
                       
                    </div>
                </div>
                <div className="">
                    <img
                        style={{
                            filter: 'drop-shadow(-2px 2px 25px rgba(255, 255, 255, 1))'
                        }}
                        src="./images/logoTecMed.png"
                    />
                </div>

            </div>
        </>
    )
}
