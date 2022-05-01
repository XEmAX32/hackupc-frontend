import React, { useEffect, useState } from "react";
import './App.css';
import Registration from "./registration";
import { loginUser, socket } from "./socketWorker";
import Wall from './Wall';
import Win from './Win';
import Lobby from './Lobby'

function App() {
  const [status, setStatus] = useState("registration");
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');
  const [userId, setUserId] = useState();
  const [members, setMembers] = useState([]);
  const [time, setTime] = useState();
  const [wallImage, setWallImage] = useState('');
  const [objects, setObjects] = useState([]);

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
      console.log('app', data)
      setWallImage(data.wall)
      setObjects(data.objects)
    })

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

    default:
    // case 'filling':
      return (
        <main id="pager">
          <Lobby userId={userId} members={members}/>
        </main>
      );
    
    // case 'searching':
    //   return (
    //     <></>
    //   );

    // case 'ready':
    //   socket.emit("rotate", true);
    //   return (
    //     <main id="pager">
    //       <div>waiting</div>
    //     </main>
    //   );

    // case 'playing':
    //   return (
    //     <main id="pager">
    //       <Wall image={wallImage} objects={objects} setTime={setTime} />
    //     </main>
    //   );

    // case 'ended':
    //   return (
    //     <main id="pager">
    //       <Win time={time}/>
    //     </main>
    //   );
  }
}

export default App;
