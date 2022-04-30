import React, { useEffect, useState } from "react";
import './styles.css';
import closeBtn from './assets/closeBtn.svg';

function Question(args) {
  const [selected, setSelected] = useState(0);

  const success = () => {
    args.successfullCallback();
    setSelected(1);
  }

  return (
   <>
    <div class="rectangular-container">
      <div onClick={() => {}} style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', right: -15, top: -15, border: "2px solid #000", background: '#FFF', padding: 10, cursor: "pointer"}}>
        <img src={closeBtn} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="description" style={{fontSize: 15}}>Answer the question to interact:</div>
        <div className="special" style={{fontSize: 25, marginTop: 10}}>{args.question}</div>
        <div style={{border: "1px solid #000", width: 350, marginTop: 30, marginBottom: 39}}/>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          {args.options.map(opt => (
            <div className="question-option" style={{backgroundColor: (opt.type == 1 && selected) ? '#64FCD9' : '#FFF'}} onClick={() => opt.type == 1 ? success() : args.erronousCallback()}>
              {opt.text}
            </div>
          ))}
        </div>
      </div>
    </div>
   </>
  );
}

export default Question;
