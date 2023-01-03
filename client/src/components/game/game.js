import React, { useEffect, useState } from 'react';
import { initiateSocket, disconnectSocket,
    subscribeToChat, sendMessage } from './socketHelpers';

export const Game = (props) => {
    const rooms = ['A', 'B', 'C'];
    const [room, setRoom] = useState(rooms[0]);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    useEffect(() => {
        console.log(message)
      if (room) initiateSocket(room);
      subscribeToChat((err, data) => {
        if(err) return;
        setChat(oldChats =>[data, ...oldChats])
      });

      return () => {
        disconnectSocket();
      }
    }, [room]);

    const send = () =>{
        console.log(message)
        sendMessage(room,message)
    }


  return (
      <div>
        <h1>Room: {room}</h1>
        { rooms.map((r, i) =>
          <button onClick={() => setRoom(r)} key={i}>{r}</button>)}
        <h1>Live Chat:</h1>
        <input type="text" name="name" value={message}
          onChange={e => setMessage(e.target.value)} />
        <button onClick={send}>Send</button>
        { chat.map((m,i) => <p key={i}>{m}</p>) }
      </div>
    );
  }