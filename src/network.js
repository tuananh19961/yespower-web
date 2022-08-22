const webSocket = new WebSocket(url, protocols);

let openSocket = null;
webSocket.onopen = (event) => {
    //webSocket.send("Here's some text that the server is urgently awaiting!");
    openSocket = webSocket;
};

export function send(obj){
    
}
