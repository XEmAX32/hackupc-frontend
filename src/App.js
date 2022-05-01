import React, { useEffect, useState } from "react";
import './App.css';
import Registration from "./registration";
import { loginUser, socket } from "./socketWorker";
import Wall from './Wall';
import Win from './Win';
import Lobby from './Lobby'

function App() {
  const { innerWidth: width, innerHeight: height } = window;
  const [isPortrait, setPortrait] = useState(height>width);
  const [status, setStatus] = useState("registration");
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');
  const [userId, setUserId] = useState();
  const [members, setMembers] = useState([]);
  const [time, setTime] = useState();
  const [wallImage, setWallImage] = useState('');
  const [objects, setObjects] = useState([]);
  const [keys, setKeys] = useState([]);

  console.log('orient', isPortrait)

  useEffect(() => {
    
    console.log('here')
    console.log(socket)

    socket.on('status', (newStatus) => {
      console.log('status', newStatus)
      setStatus(newStatus);
    })

	  socket.on('members', (members) => setMembers(members))

    socket.onAny((method, content) => console.log(method, content))

    socket.on("questions", (data) => {
      setWallImage(data.wall)
      setObjects(data.objects)
//       setKeys(data.objects.items.filter(item => item.keys))
    })

    window.addEventListener('resize', () => {
      const { innerWidth: width, innerHeight: height } = window;
      setPortrait(height > width);
      console.log('orient2', height > width)
    });

    return () => window.removeEventListener('resize');
  }, []);

  switch(status) {
    case 'registration':
loginUser('53P1TRQmXLhJJ')
    return
      return (
        <main id="pager">
          <Registration setUserId={setUserId}/>
        </main>
      );

    case 'filling':
      return (
        <main id="pager">
          <Lobby userId={"53P1TRQmXLhJJ"} members={members}/>
        </main>
      );
    
    case 'searching':
      return (
        <></>
      );

    case 'ready':
      socket.emit("rotate", true);
      return (
        <main id="pager">
          <div>waiting</div>
        </main>
      );

    case 'playing':
      return (
        <main id="pager" style={{padding:0}}>
          <Wall image={wallImage} objects={objects} setTime={setTime} keys={keys}/>
        </main>
      );

    case 'ended':
      return (
        <main id="pager">
          <Win time={time}/>
        </main>
      );
  }
}

export default App;
