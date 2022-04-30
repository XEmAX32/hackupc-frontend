import React, { useEffect, useState } from "react";
import './styles.css';
import {socket} from './socketWorker';

function Lobby(args) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    socket.on('members', (members) => setPlayers(members))
  }, []);

  return (
    <>
      {players.length > 0 && (<div className="pageContainer">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 30}}>
          <div className="playerIcon" style={{marginBottom: '20px'}}></div>
          <div className="special">{players[0].name}</div>
          <div>TEAM VULCANO</div>
        </div>
        <div className="description">
          <div>📆 02/03/2002 - 20 y/o</div>
          <div>📍 from Milan, Italy</div>
          <div>🎓 NABA - Nuova Accademia di Belle Arti</div>
        </div>
        <div style={{backgroundColor: '#64FCD9', display: 'flex', flexDirection: 'column', width: '100%'}}>
          <div className="description">{players.length+1}/4 PLAYERS ONLINE</div>
          <div style={{display: 'flex', flexDirection: 'column'}}>{players.map(player => (
            <div>
              <div className="playerIcon" />
              <div className="special" style={{fontSize: 15}}>{player.name}</div>
            </div>
          ))}</div>
        </div>
      </div>)}
    </>
  );
}

export default Lobby;
