import { useEffect, useMemo } from 'react'
import Pusher from 'pusher-js'

const usePusher = (channelName, eventName,callback) => {
    const pusher = useMemo(()=>{
        return new Pusher('940b308f6377bc384353', {
            cluster: 'us2',
            debug: true
        })
    },[])

    useEffect(()=>{
        const channel = pusher.subscribe(channelName)
        channel.bind(eventName, callback)

        return () => {
            pusher.unsubscribe(channelName)
        }
    },[pusher, channelName, eventName, callback])

    return pusher
}

export {
    usePusher
}