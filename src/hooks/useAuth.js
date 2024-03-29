import { useNavigate } from "react-router-dom"
import useSWR from 'swr'
import clienteAxios from "../config/axios"
import { useState } from "react"
import useProyect from "./useProyect"
import { toast } from "react-toastify"
import CryptoJS from "crypto-js"

export const useAuth = () => {

    const { setUsuarioLogin, setCargando, usuarioLogin, changeView } = useProyect()
    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const [respuesta, setRespuesta] = useState('')

    const { data: user, error, mutate } = useSWR('/api/user', () => (
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })
    ))

    const login = async (datos, setErrores) => {
        try {
            setCargando(true);
            const { data } = await clienteAxios.post('/api/login', datos)
            if (data.user.estado === 'Sin activar') {
                navigate('/sin-permiso')
                return
            }

            const informacionEncriptada = CryptoJS.AES.encrypt(JSON.stringify(data.user),'secret_key')
            localStorage.setItem('AUTH_TOKEN', data.token)
            localStorage.setItem('usuario', informacionEncriptada)
            setErrores([])
            await mutate()

            setUsuarioLogin(data.user)
            if (data.user.tipo == 'estudiante') {
                navigate('/estudiante')
                changeView('materiales')
            }

            if (data.user.tipo == 'administrativo') {
                navigate('/administrativo/correspondencia-recibida')
                changeView('correspondencia recibida')
            }

            if (data.user.tipo == 'administrador') {
                navigate('/administrador/usuarios')
                changeView('usuarios')
            }

            if (data.user.tipo == 'colaborador') {
                navigate('/colaborador/correspondencia')
                changeView('correspondencia')
            }

        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false)
        }
    }

    const register = async (datos, setErrores) => {
        try {
            setCargando(true);

            const { data } = await clienteAxios.post('/api/registro', datos, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (data.user.estado === 'Sin activar') {
                navigate('/sin-permiso')
                return
            }

            const informacionEncriptada = CryptoJS.AES.encrypt(JSON.stringify(data.user),'secret_key')
            localStorage.setItem('AUTH_TOKEN', data.token)
            localStorage.setItem('usuario', informacionEncriptada)
            setUsuarioLogin(data.user)
            setErrores([])
            await mutate()

            if (data.user.tipo == 'estudiante') {
                navigate('/estudiante')
            }

            if (data.user.tipo == 'administrativo') {
                navigate('/administrativo/correspondencia-recibida')
            }

            if (data.user.tipo == 'administrador') {
                navigate('/administrador/usuarios')
            }

            if (data.user.tipo == 'colaborador') {
                navigate('/colaborador')
            }

        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
            window.scrollTo({top:0, behavior:'smooth'})
        } finally {
            setCargando(false);
        }

    }

    const logout = async () => {

        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            localStorage.removeItem('usuario')
            await mutate(undefined)
            setUsuarioLogin({})
            changeView('')
            navigate('/')
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    const recover_password = async (datos, setErrores) => {
        setRespuesta('')
        try {
            setCargando(true);

            const { data } = await clienteAxios.post('/api/recuperar-contrasenia', datos)
            setErrores([])
            await mutate()
            setRespuesta(data.message)

        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false)
        }
    }

    const upgrade_password = async (datos, setErrores) => {

        try {
            setCargando(true);
            const { data } = await clienteAxios.post('/api/reestablecer-contrasenia', datos)

            localStorage.setItem('AUTH_TOKEN', data.token)
            localStorage.setItem('usuario', JSON.stringify(data.user))

            setUsuarioLogin(data.user)
            toast.success(data.message)

            setErrores([])
            await mutate()

            if (data.user.tipo == 'estudiante') {
                navigate('/estudiante')
            }

            if (data.user.tipo == 'administrativo') {
                navigate('/administrativo/correspondencia-recibida')
            }

            if (data.user.tipo == 'administrador') {
                navigate('/administrador/usuarios')
            }

        } catch (error) {
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors || []))
        } finally {
            setCargando(false);
        }
    }
    return {
        login,
        register,
        logout,
        recover_password,
        upgrade_password,
        respuesta
    }
}