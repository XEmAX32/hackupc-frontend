import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import { QrReader } from 'react-qr-reader';
const ENDPOINT = "http://192.168.223.145:3232";

function App() {
  const [response, setResponse] = useState("");
  const [data, setData] = useState('No result');
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          god have spoken: {response}.
          qrcode: {data}
        </p>
      </header>
      {/* <video
        id="qr-code"
      >

      </video>
      <QrReader
        videoId="qr-code"
        onResult={(result, error) => {
          if (!!result) {
            console.log(result);
            setData(result?.text);
          }

          if (!!error) {
            //console.info(error);
          }
        }}
        style={{ width: '100%' }}
      /> */}
    </div>
  );
}

export default App;
