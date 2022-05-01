import React, { useEffect, useState } from "react";
import './styles.css';
import closeBtn from './assets/closeBtn.svg';
import star from './assets/Star.svg';

function Question({time}) {

  return (
   <>
    <div class="rectangular-container" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div className="special" style={{fontSize: 35, marginBottom: 10, display: 'flex', alignItems: 'center', letterSpacing: '0.03em'}}>
        <img src={star} style={{marginRight: 15}}/>
        You Won!
        <img src={star} style={{marginLeft: 15}}/>
      </div>
      <div className="description">YOU’VE ESCAPED THE HACKATHON FOR {3} MINUTES.</div>
      <div style={{border: ".5px solid #000", width: 350, marginTop: 30, marginBottom: 30}}/>
      <div className="description">It’s now time to go back to work :(</div>
    </div>
   </>
  );
}

export default Question;
