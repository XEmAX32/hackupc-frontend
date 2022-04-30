import React, {useState} from 'react'
import Question from './Question'
import { socket } from './socketWorker.js'
import Win from './Win';
import NoKey from './NoKey';

function Wall ({image, objects}) {

	return (
		<div id="wallContainer" style={{backgroundImage:image}}>

			{ !objects ?
				null :
				objects.map( config => <Object {...config}/>)
			}
		</div>
	)
}

function Object ({x, y, width, height, question, item}) {

	const [isOpen, setIsOpen] = useState(false);
  const [popupType, setPopupType] = useState(0);

	return (
		<>
			<div
				className="object"
				style={{left:x, top:y, width, height}}
				onClick={() => !isOpen && setIsOpen(true)}
				>
			</div>

			<div className={"popupContainer" + (isOpen ? ' open': '')}>
				{popupType == 0 ? <Question img={item.image} question={question.text} options={question.answers} correct={question.answer} successfullCallback={() => {setPopupType(1)}} errouneousCallback={() => {setPopupType(2)}}/> : (popupType == 1 ? <Win /> : <NoKey />)}
			</div>
		</>
	)
}

export default Wall;