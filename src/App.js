import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import { QrReader } from '@blackbox-vision/react-qr-reader';
import adapter from 'webrtc-adapter';
const ENDPOINT = "http://192.168.223.145:3232";

function App() {
  let socket;
  const [status, setStatus] = useState("not-logged-in");
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');

  const forwardUser = (userId) => {
    console.log(userId)
    socket.emit("register", {id: userId})
  }

  useEffect(() => {
    socket = socketIOClient(ENDPOINT, {
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 10,
    });
    socket.on("connect", data => {
      console.log(data)
    });
    socket.on("message", data => {
      console.log(data)
      setResponse(data);
    });
    socket.on("disconnect", data => {
      console.log(data)
    });
  }, []);

  if(status == "not-logged-in") {
    console.log('sta',status);
    return (
      <div className="App">
        {/* <video
          id="qr-code"
          width="100%"
          height="100%"
        >
        </video> */}
        <QrReader
          // videoId="qr-code"
          ViewFinder={() => <div style={{position: 'absolute', top:200, zIndex: 9999}}>test</div>}
          videoContainerStyle={{margin: 0}}
          onResult={(result, error) => {
            if (!!result) {
              console.log(result);
              setData(result?.text);
              forwardUser(result?.text);
            }

            if (!!error) {
              //console.info(error);
            }
          }}
        />
      </div>
    );
  } else {
    console.log('other')
    return (
      <div>

      </div>
    );
  }
}

export default App;
