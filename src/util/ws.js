import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

let stompClient = null;
const handlers = []

export function connect() {
    const socket = new SockJS('http://localhost:9000/gs-guide-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/articles', message=> {
            handlers.forEach(handler=>handler(JSON.parse(message.body)))
        })
    })
}

export function addHandler(handler){
    handlers.push(handler)
}

export function disconnectChat() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    // setConnected(false)
    console.log("Disconnected")
}

export function sendArticle(article) {
    stompClient.send("/app/addArticle", {}, JSON.stringify(article))
}

export function sendMessage(message){
    stompClient.send("/app/addMessage",{}, JSON.stringify(message))
}