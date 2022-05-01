import React, { useEffect, useState } from "react";
import './App.css';
import Registration from "./registration";
import { loginUser, socket } from "./socketWorker";
import Wall from './Wall';
import Win from './Win';
import Lobby from './Lobby'
import rotateIcon from './assets/rotateIcon.svg';

function App() {
  const { innerWidth: width, innerHeight: height } = window;
  const [isPortrait, setPortrait] = useState(height>width);
  const [status, setStatus] = useState('registration');
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
      setStatus(() => newStatus);
      console.log('updatedstatus', status)
    })

	  socket.on('members', (members) => setMembers(members))

    socket.onAny((method, content) => console.log(method, content))

    socket.on("questions", (data) => {
      setWallImage(data.wall)
      setObjects(data.objects)
    })

    window.addEventListener('resize', () => {
      const { innerWidth: width, innerHeight: height } = window;
      setPortrait(height > width);
      console.log('ciacia', height < width, status)
      socket.emit('rotate', true);

      if(height < width && status == "ready") {
        console.log('test')
        socket.emit('rotate', true);
      }
    });

    return () => window.removeEventListener('resize');
  }, []);

  switch(status) {
    case 'registration':
      return (
        <main id="pager">
          <Registration setUserId={setUserId}/>
        </main>
      );

    case 'filling':
      return (
        <main id="pager">
          <Lobby userId={userId} members={members}/>
        </main>
      );
    
    case 'searching':
      return (
        <></>
      );

    case 'ready':
      return (
        <main id="pager">
          {isPortrait && <div className="rotateNotificationContainer">
            <div className="description" style={{marginBottom: 10}}>rotate your phone to play.</div>
            <img src={rotateIcon}/>
          </div>}
        </main>
      );

    case 'playing':
      return (
        <main id="pager" style={{padding:0}}>
          <Wall image={wallImage} objects={objects} setTime={setTime}/>
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
