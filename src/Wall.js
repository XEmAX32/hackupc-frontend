import React, {useEffect, useState} from 'react'
import Question from './Question'
import { socket } from './socketWorker.js'
import FoundKey from './FoundKey';
import NoKey from './NoKey';
import ImageMap from './ImageMap';

function Wall ({image, objects, setTime}) {
  useEffect(() => {
    setTime(new Date());
    console.log('wall', image, objects)
  }, []);

	return (
		<div id="wallContainer">
      <ImageMap imgpath={process.env.REACT_APP_IMG_SERVER_ADDRESS+image}/>

			{ !objects ?
				null :
				objects.map( config => <Object {...config}/>)
			}
		</div>
	)
}

function Object ({x, y, width, height, question, item}) {

	const [isOpen, setIsOpen] = useState(true);
  const [popupType, setPopupType] = useState(0);

  const renderPopup = () => {
    if(popupType == 0)
      return (
        <Question 
          img={item.image} 
          question={question.text} 
          options={question.answers} 
          correct={question.answer} 
          successfullCallback={() => {
              if(item.keys)
                setPopupType(2)
              else
                setPopupType(2)
          }} 
          errouneousCallback={() => {alert('Wrong answer: retry later!')}} 
          close={() => setIsOpen(false)}
        />
      );
    else if(popupType == 1)
      return (
        <FoundKey text={item.text} img={process.env.REACT_APP_IMG_SERVER_ADDRESS+item.image} close={() => setIsOpen(false)}/>
      )
    else if(popupType == 2)
      return (
        <NoKey text={item.text} img={process.env.REACT_APP_IMG_SERVER_ADDRESS+item.image} close={() => setIsOpen(false)}/>
      )
  }

	return (
		<>
			{/* <div
				className="object"
				style={{left: x, top: y, width, height}}
				onClick={() => !isOpen && setIsOpen(true)}
				>
			</div> */}

			<div className={"popupContainer" + (isOpen ? ' open': '')}>
        {renderPopup()}
				{/* {popupType == 0 ? <Question img={item.image} question={question.text} options={question.answers} correct={question.answer} successfullCallback={() => {setPopupType(1)}} errouneousCallback={() => {alert('Wrong answer: retry later!')}} close={() => setIsOpen(false)}/> : (popupType == 1 ? <FoundKey close={() => setIsOpen(false)}/> : <NoKey close={() => setIsOpen(false)}/>)} */}
			</div>
		</>
	)
}

export default Wall;