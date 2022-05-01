import React, {useEffect, useState} from 'react'
import Question from './Question'
import { socket } from './socketWorker.js'
import Win from './Win';
import NoKey from './NoKey';

function Wall ({image, objects, setTime}) {
  useEffect(() => {
    setTime(new Date());
    console.log('wall', image, objects)
  }, []);

	return (
		<div id="wallContainer">

			<svg viewBox="0 0 2500 1767" style={{height:'100%'}}>
				<image width={2500} height={1767} href={process.env.REACT_APP_IMG_SERVER_ADDRESS+image} />

				{ !objects ?
					null :
					objects.map( config => <Object {...config}/>)
				}

			</svg>
		</div>
	)
}

function Object ({x, y, width, height, question, item}) {

	console.log(x, y, width, height)

	const [isOpen, setIsOpen] = useState(false);
	const [popupType, setPopupType] = useState(0);

	return (
		<>
			<rect x={x} y={y} width={width} height={height} fill={"#fff"} opacity={0} onClick={() => !isOpen && setIsOpen(true)}/>

			<div className={"popupContainer" + (isOpen ? ' open': '')}>
				{popupType == 0 ? <Question img={item.image} question={question.text} options={question.answers} correct={question.answer} successfullCallback={() => {setPopupType(1)}} errouneousCallback={() => {setPopupType(2)}}/> : (popupType == 1 ? <Win /> : <NoKey />)}
			</div>
		</>
	)
}

export default Wall;
