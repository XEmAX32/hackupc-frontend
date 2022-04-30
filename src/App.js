import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Registration from "./registration";
import FoundKey from './FoundKey';

function App() {
  const [status, setStatus] = useState("logged-in");
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');
  const question = {
    text: "Which of the following names belongs to an HackUPC Organizer?",
    options: [{text: "ciao", type: 0}, {text: "ciaone", type: 1}, {text: "triple ciao", type: 0}, {text: "no clue", type: 0}]
  }

  if(status == "not-logged-in") {  
    return (
      <main id="pager">
        <Registration status setStatus/>
      </main>
    );
  } else {
    return (
      <main id="pager">
        <FoundKey curiosity="UPC was ranked as the best university in Spain in computer science, mathematics, atmospheric science and water resources (2021)." img="/prize.png"/>
        {/* <Question question={question.text} options={question.options} successfullCallback={() => {}} erronousCallback={() => {}}/> */}
      </main>
    );
  }
}

export default App;
