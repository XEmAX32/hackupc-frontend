import React, { useEffect, useState } from "react";
import './styles.css';
import closeBtn from './assets/closeBtn.svg';

function NoKey(args) {

  return (
   <>
    <div class="rectangular-container" style={{width: '90%', padding: 0}}>
      <div onClick={() => args.close()} style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', right: -15, top: -15, border: "2px solid #000", background: '#FFF', padding: 10, cursor: "pointer"}}>
        <img src={closeBtn} />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {args.type ? 
          <div style={{padding: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={args.img} style={{height: 200}}/>
          </div> 
          : 
          <div></div>}
      </div>
    </div>
   </>
  );
}

export default NoKey;
