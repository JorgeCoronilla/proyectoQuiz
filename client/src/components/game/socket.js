import io from "socket.io-client";

let socket = io('http://localhost:4000');

export default socket;