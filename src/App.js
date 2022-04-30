import React, { useEffect, useState } from "react";
import './App.css';
import Registration from "./Registration";
import { socket } from "./socketWorker";
import Wall from './Wall';
import Win from './Win';

function App() {
  const [status, setStatus] = useState("filling");
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');

  useEffect(() => {
    socket.on('status', (newStatus) => {
      setStatus(newStatus);
    })
  }, []);

  switch(status) {
    case 'filling':
      return (
        <main id="pager">
          <Registration />
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
