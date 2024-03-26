import { useContext } from 'react'
import ProyContext from '../context/ProyContext'

const useProyect = () => {
    return useContext(ProyContext)
}

export default useProyect

