import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

let stompClient = null;
const messages = []

export function connectChat() {
    const socket = new SockJS('http://localhost:9000/gs-guide-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/messages', message=> {
            console.log('hello')
            console.log(JSON.parse(message.body))
            messages.forEach(handler=>handler(JSON.parse(message.body)))
        })
    })
}

export function addMessages(handler){
    messages.push(handler)
}

export function disconnectChat() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Disconnected")
}

export function sendMessage(message){
    stompClient.send("/app/addMessage",{}, JSON.stringify(message))
}