import React, { useEffect, useState } from "react";
import './styles.css';
import {socket} from './socketWorker';

function Lobby(args) {
  const [me, setMe] = useState();
  useEffect(() => {
    setMe(args.members.findIndex(members => members.id == args.userId));
    console.log('members',args.members)
    console.log(args.userId)
    // console.log(process.env.REACT_APP_IMG_SERVER_ADDRESS,args.members[me].icon)

  }, [args.members]);
  return (
    <div className="pageContainer" style={{width: '100%', marginLeft: -20, marginRight: -20}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 30}}>
        <div className="playerIcon" style={{marginBottom: '20px', backgroundImage: (args.members && args.members[me]) ? `url(${process.env.REACT_APP_IMG_SERVER_ADDRESS+args.members[me].icon})` : ""}}></div>
        <div className="special">{(args.members && args.members[me]) ? args.members[me].name : ""}</div>
        <div>{(args.members && args.members[me]) ? args.members[me].team : ""}</div>
      </div>
      <div className="description" style={{marginTop: 50, marginBottom: 50}}>
        <div>📆 {(args.members && args.members[me]) ? args.members[me].birth : ""}</div>
        <div>📍 from {(args.members && args.members[me]) ? args.members[me].city : ""}</div>
        <div>🎓 {(args.members && args.members[me]) ? args.members[me].university : ""}</div>
      </div>
      <div style={{backgroundColor: '#64FCD9', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div className="description" style={{marginTop: 20, marginBottom: 20, textAlign: 'center'}}>{args.members.length}/4 PLAYERS ONLINE</div>
        <div style={{marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: "wrap"}}>
          {args.members.map(member => (
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div className="playerIcon" />
              <div className="special" style={{fontSize: 15}}>{member.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lobby;
