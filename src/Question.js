import React, { useEffect, useState } from "react";
import './styles.css';
import closeBtn from './assets/closeBtn.svg';

function Question(args) {  
  return (
   <>
    <div class="question">
      <div style={{position: 'absolute', right: -15, top: -15, border: "2px solid #000", background: '#FFF', padding: 10}}>
        <img src={closeBtn} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="description" style={{fontSize: 15}}>Answer the question to interact:</div>
        <div className="special" style={{fontSize: 25}}>{args.question}</div>
        <div style={{border: "1px solid #000", width: 200}}/>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          {args.options.map(opt => (
            <div className="question-option" onClick={() => opt.type == 1 ? args.successfullCallback() : args.erronousCallback()}>
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
