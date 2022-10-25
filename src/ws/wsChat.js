
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

let stompClient = null;
const handlers = []

export function connectChat() {
    const socket = new SockJS('http://localhost:9000/gs-guide-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/messages', message=> {
            console.log(JSON.parse(message.body))
            handlers.forEach(handler=>handler(JSON.parse(message.body)))
        })
    })
}

export function addHandler(handler){
    handlers.push(handler)
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Disconnected")
}

export function sendMessage(message){
    stompClient.send("/app/addMessage",{}, JSON.stringify(message))
}