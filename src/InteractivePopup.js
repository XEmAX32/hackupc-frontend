import React, { useEffect, useState } from "react";
import './styles.css';
import closeBtn from './assets/closeBtn.svg';
import {socket} from './socketWorker.js'

function NoKey(args) {

	const [key1, setKey1] = useState('')
	const [color1, setColor1] = useState('')
	const [key2, setKey2] = useState('')
	const [color2, setColor2] = useState('')
	const [key3, setKey3] = useState('')
	const [color3, setColor3] = useState('')

	const update = (e, setKey, setColor, n) => {
		setKey(e.target.value)


		if (e.target.value === args.solutions[n])
			setColor('green')
		else
			setColor('red')

		setTimeout(() => {

			console.log("qhcsgd")

			if (color1 === 'green' && color2 === 'green' && color3 === 'green') {
				socket.emit("solved")
			}
		}, 500)
	}

  return (
   <>
    <div>
      <div onClick={() => args.close()} style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', right: 15, top: 15, border: "2px solid #000", background: '#FFF', padding: 10, cursor: "pointer"}}>
        <img src={closeBtn} />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {args.type ?
          <div style={{padding: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <img src={process.env.REACT_APP_IMG_SERVER_ADDRESS+args.img} style={{height: '100vh'}}/>
            <div className="keysInput">
				<input type="text" style={{color:color1}} onChange={e => update(e, setKey1, setColor1, 0)}/>
				<input type="text" style={{color:color2}} onChange={e => update(e, setKey2, setColor2, 1)}/>
				<input type="text" style={{color:color3}} onChange={e => update(e, setKey3, setColor3, 2)}/>
            </div>
          </div> 
          : 
          <div style={{padding: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={process.env.REACT_APP_IMG_SERVER_ADDRESS+args.img} style={{height: 200}}/>
          </div>}
      </div>
    </div>
   </>
  );
}

export default NoKey;
