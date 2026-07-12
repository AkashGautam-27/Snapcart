import axios from 'axios'
import React from 'react'

async function emitEventHandler(event:string,data:any,socketId?:string) {
try {
    console.log("socket server",process.env.NEXT_PUBLIC_SOCKET_SERVER);
    await axios.post(`${process.env.NEXT_PUBLIC_SOCKET_SERVER}/notify`,{socketId,event,data})
} catch (error) {
    console.log(error)
}
}

export default emitEventHandler
