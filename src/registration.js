import React, { useEffect, useState } from "react";
import { socket, loginUser } from './socketWorker'
import { QrReader } from 'react-qr-reader';
import './styles.css';
import img1 from './assets/Image1.jpg';
import img2 from './assets/Image2.jpg';
import img3 from './assets/Image3.jpg';
import img4 from './assets/Image4.jpg';
import backBtn from './assets/backBtn.svg'
import QRCodeGraphics from './assets/qrcode-graphics.svg';
import player_types from './assets/players-skins.json';

function Registration(status, setStatus) {  
  const [pageNumber, setPageNumber] = useState(0);
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');
  const [QRPopupStatus, setQRPopupStatus] = useState(0);
  const [players, setPlayers] = useState([]);

  var registrationSent = false;
  const totalPages = 5;
  const images = [img1, img2, img3, img4];
  const titles = ["Find three more hackers to start the game.", "Put your phones togheter to create the room.", "Explore the walls to find three keys.", "Unlock the door and escape."];
  const descriptions = ["📍 Your phone will help you find them inside the campus.", "😉 Every phone represent a wall: look at the game logo to know how.", "❓ Everytime you’ll interact with an object you have to answer a question. Work together to solve them. ", "💡 Easy, right? I won’t be that sure. Look carefully at the keys and follow the right  suggestions. "];

  if(pageNumber == 4) {
    return (
      <div className="pageContainer">
        <div>
            <div className="title" style={{marginBottom: 20}}>Log in with your HackUPC ID.</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div id="qrcode-container">
                <div id="qrcode-scanner">

                </div>  
                <video id="qrcode-live"/>
              </div>
            </div>
            <img style={{width: '100%', marginLeft: -20, marginRight: -20}} src={QRCodeGraphics} />
            <QrReader
              videoId="qrcode-live"
              // ViewFinder={() => <div style={{position: 'absolute', top:200, zIndex: 9999}}>test</div>}
              videoContainerStyle={{margin: 0}}
              onResult={(result, error) => {
                if (!!result) {
                  //console.log(result)
                  if(!registrationSent) {
                    //console.log('test')
                    loginUser(result.text);
                    registrationSent = true;
                  }
                }

                if (!!error) {
                  //console.info(error);
                }
              }}
            />
        </div>
      </div>
    )
  } else if (pageNumber == 5) {
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
  } else {
    return (
      <div className="pageContainer">
        <div>
          <div style={{marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div className="route">INSTRUCTIONS</div>
            <div className="route">{pageNumber+1}/{4}</div>
          </div>
          <div className="title" style={{marginBottom: '20px'}}>
          {titles[pageNumber]}
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <img src={images[pageNumber]} style={{marginBottom: '20px', width: '200px', height: '200px'}}/>
          </div>
          <div className="description" style={{marginBottom: '20px'}}>{descriptions[pageNumber]}</div>
          <div className="buttons" style={{justifyContent: pageNumber > 0 ? 'space-between' : 'right'}}>
            {pageNumber > 0 && <div className="backBtn" onClick={() => setPageNumber(prevState => prevState-1)}><img src={backBtn}/></div>}
            <div className="nextBtn" style={{marginLeft: pageNumber > 0 ? 0 : 'auto'}} onClick={() => setPageNumber(prevState => prevState+1)}>Next →</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
