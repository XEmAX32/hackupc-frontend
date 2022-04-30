import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { establishConnection } from "./socketWorker";
import Registration from "./registration";

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
    socket = establishConnection();
  }, []);

  if(status == "not-logged-in") {  
    return (
      <div style={{width:"30%", margin: "0 auto"}}>
        <Registration socket status setStatus/>
      </div>
    );
  } else {
    return (
      <div>

      </div>
    );
  }
}

export default App;
