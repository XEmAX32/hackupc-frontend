import React, { useState } from "react";
import { loginUser } from './socketWorker'
import { QrReader } from 'react-qr-reader';
import './styles.css';
import img1 from './assets/Image1.jpg';
import img2 from './assets/Image2.jpg';
import img3 from './assets/Image3.jpg';
import img4 from './assets/Image4.jpg';
import backBtn from './assets/backBtn.svg'

function Registration(socket, status, setStatus) {  
  const [pageNumber, setPageNumber] = useState(0);
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');
  const [QRPopupStatus, setQRPopupStatus] = useState(0);

  const totalPages = 5;
  const images = [img1, img2, img3, img4];
  const titles = ["Find three more hackers to start the game.", "Put your phones togheter to create the room.", "Explore the walls to find three keys.", "Unlock the door and escape."];
  const descriptions = ["📍 Your phone will help you find them inside the campus.", "😉 Every phone represent a wall: look at the game logo to know how.", "❓ Everytime you’ll interact with an object you have to answer a question. Work together to solve them. ", "💡 Easy, right? I won’t be that sure. Look carefully at the keys and follow the right  suggestions. "];

  return (
    <div className="pageContainer">
      {pageNumber > 3 ? 
        <div>
          <div className="title">Log in with your HackUPC ID.</div>
          <div style={{display: 'flex', justifyContent: 'center', overflow: 'hidden'}}>
            <div id="qrcode-scanner" style={{position: 'absolute', width: 400, height: 400}}>

            </div>  
            <video id="qrcode-live" style={{width: 'auto', height: 400}}/>
          </div>
          <QrReader
            videoId="qrcode-live"
            // ViewFinder={() => <div style={{position: 'absolute', top:200, zIndex: 9999}}>test</div>}
            videoContainerStyle={{margin: 0}}
            onResult={(result, error) => {
              if (!!result) {
                console.log(result)
                loginUser(socket, result?.text);
              }

              if (!!error) {
                //console.info(error);
              }
            }}
          />
        </div>
      :
        <div>
          <div style={{marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div className="route">INSTRUCTIONS</div>
            <div className="route">{pageNumber+1}/{totalPages}</div>
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
      }
        {/* <QrReader
          // videoId="qr-code"
          // ViewFinder={() => <div style={{position: 'absolute', top:200, zIndex: 9999}}>test</div>}
          videoContainerStyle={{margin: 0}}
          onResult={(result, error) => {
            if (!!result) {
              console.log(result)
              loginUser(socket, result?.text);
            }

            if (!!error) {
              //console.info(error);
            }
          }}
        /> */}
    </div>
  );
}

export default Registration;
