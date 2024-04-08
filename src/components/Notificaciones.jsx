import { useEffect, useState } from "react"
import useSWR from "swr"
import clienteAxios from "../config/axios"
import { useNavigate } from "react-router-dom"
import useProyect from "../hooks/useProyect"


export default function Notificaciones() {

    const { setCorrespondenciasNotificacion } = useProyect()
    const [notificaciones, setNotificaciones] = useState(0)
    const navigate = useNavigate();
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => (
        clienteAxios(`/api/correspondences/notifications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    )

    const { data, error, isLoading } = useSWR(`/api/correspondences/notifications`, fetcher, {refreshInterval:1000})

    useEffect(() => {
        if (!isLoading) {
            setNotificaciones(data.data.length)
            setCorrespondenciasNotificacion(data?.data)
        }
    }, [isLoading, data])

    const handleSubmit = () => {
        navigate('/administrativo/notificaciones')
    }

    if (isLoading) return <></>
    return (
        <button className="absolute -top-1 -right-1" type="button" onClick={handleSubmit}>
            {
                notificaciones > 0 && <span className="font-bold bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">{notificaciones}</span>
            }

        </button>
    )
}
