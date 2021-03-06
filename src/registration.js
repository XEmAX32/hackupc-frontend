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

function Registration(args) {  
  const [pageNumber, setPageNumber] = useState(0);
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');
  const [QRPopupStatus, setQRPopupStatus] = useState(0);

  var registrationSent = false;
  const totalPages = 4;
  const images = [img1, img2, img3, img4];
  const titles = ["Find three more hackers to start the game.", "Put your phones togheter to create the room.", "Explore the walls to find three keys.", "Unlock the door and escape."];
  const descriptions = ["๐ Your phone will help you find them inside the campus.", "๐ Every phone represent a wall: look at the game logo to know how.", "โ Everytime youโll interact with an object you have to answer a question. Work together to solve them. ", "๐ก Easy, right? I wonโt be that sure. Look carefully at the keys and follow the right  suggestions. "];

  if(pageNumber == 4) {
    return (
      <div className="pageContainer" style={{height: '100%', marginLeft: -20, marginRight: -20, overflow: 'hidden'}}>
        <div>
            <div className="title" style={{marginBottom: 20, marginLeft: 10, marginRight: 10, marginTop: 20}}>Log in with your HackUPC ID.</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div id="qrcode-container">
                <div id="qrcode-scanner" />
                <video id="qrcode-live"/>
              </div>
            </div>
            <img style={{width: '100%'}} src={QRCodeGraphics} />
            <QrReader
              videoId="qrcode-live"
              videoStyle={{height: 0}}
              containerStyle={{display: 'none'}}
              // ViewFinder={() => <div style={{position: 'absolute', top:200, zIndex: 9999}}>test</div>}
              videoContainerStyle={{margin: 0}}
              onResult={(result, error) => {
                if (!!result) {
                  //console.log(result)
                  if(!registrationSent) {
                    //console.log('test')
                    loginUser(result.text);
                    args.setUserId(result.text);
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
            <div className="nextBtn" style={{marginLeft: pageNumber > 0 ? 0 : 'auto'}} onClick={() => setPageNumber(prevState => prevState+1)}>Next โ</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
