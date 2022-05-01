import React, { useEffect, useState } from "react";
import './styles.css';
import closeBtn from './assets/closeBtn.svg';

function Question(args) {
  const [selected, setSelected] = useState(0);

  const success = () => {
    setSelected(1);
    setTimeout(() => {
      args.successfullCallback();
    }, 400);
  }

  return (
   <>
    <div class="rectangular-container">
      <div onClick={() => args.close()} style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', right: -15, top: -15, border: "2px solid #000", background: '#FFF', padding: 10, cursor: "pointer"}}>
        <img src={closeBtn} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="description" style={{fontSize: 15}}>Answer the question to interact:</div>
        <div className="special" style={{fontSize: 25, marginTop: 10}}>{args.question}</div>
        <div style={{border: "1px solid #000", width: 350, marginTop: 30, marginBottom: 39}}/>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          {args.options.map((opt, i) => (
            <div className="question-option" style={{backgroundColor: (i == args.correct && selected) ? '#64FCD9' : '#FFF'}} onClick={() => i == args.correct ? success() : args.errouneousCallback()}>
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
   </>
  );
}

export default Question;
