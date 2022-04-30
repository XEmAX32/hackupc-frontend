import React, { useEffect, useState } from "react";
import './styles.css';
import closeBtn from './assets/closeBtn.svg';

function FoundKey(args) {

  return (
   <>
    <div class="rectangular-container" style={{width: '90%', padding: 0}}>
      <div onClick={() => {}} style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', right: -15, top: -15, border: "2px solid #000", background: '#FFF', padding: 10, cursor: "pointer"}}>
        <img src={closeBtn} />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div style={{borderRight: '2px solid #000', width: '30%', paddingLeft: 10, paddingRight: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="special" style={{fontSize: 30}}>You found a Key! 🗝.</div>
        </div>
        <div style={{padding: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={args.img} style={{height: 200}}/>
        </div>
        <div style={{borderLeft: '2px solid #000', width: '30%', paddingLeft: 10, paddingRight: 10, display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
          <div className="description">Copy all 3 keys on the door’s security to escape from here.</div>
        </div>
      </div>
    </div>
   </>
  );
}

export default FoundKey;