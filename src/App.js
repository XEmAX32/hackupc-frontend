import React, { useEffect, useState } from "react";
import './App.css';
import Registration from "./registration";
import { socket } from "./socketWorker";
import Wall from './Wall';
import Win from './Win';
import Lobby from './Lobby'

function App() {
  const [status, setStatus] = useState("registration");
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');

  useEffect(() => {
    console.log('here')
    console.log(socket)
    socket.onAny((tt, content) => console.log(tt, content))
    socket.on('status', (newStatus) => {
      console.log('status', newStatus)
      setStatus(newStatus);
    })

	socket.on('members', ()=>null)

  }, []);

  switch(status) {
    case 'registration':
      return (
        <main id="pager">
          <Registration />
        </main>
      );

    case 'filling':
      return (
        <main id="pager">
          <Lobby />
        </main>
      );
    
    case 'searching':
      return (
        <></>
      );

    case 'ready':
      return (
        <></>
      );

    case 'playing':
      return (
        <main id="pager">
          <Wall />
        </main>
      );

    case 'ended':
      return (
        <main id="pager">
          <Win />
        </main>
      );
  }
}

export default App;
