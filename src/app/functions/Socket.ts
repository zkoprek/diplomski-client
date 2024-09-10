import io from "socket.io-client";

const socket = io("http://192.168.1.188:8080");

export default socket;
