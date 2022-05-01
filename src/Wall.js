import React, {useEffect, useState} from 'react'
import Question from './Question'
import { socket } from './socketWorker.js'
import FoundKey from './FoundKey';
import NoKey from './NoKey';
import InteractivePopup from './InteractivePopup';

function Wall ({image, objects, setTime}) {

	const [openPopup, setOpenPopup] = useState(null)

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
					objects.map( ({x,y,width,height}, idx) =>
						<rect 	x={x} y={y} width={width} height={height}
              fill={"#fff"} opacity={0}
              onClick={() => openPopup !== idx && setOpenPopup(idx)}
              key={idx}
            />)
				}

			</svg>

			{ objects.filter(({question, item}) => question && item).map( ({question, item}, idx) => <PopUps question={question} item={item} isOpen={idx === openPopup} close={()=>setOpenPopup(null)}/> )}

		</div>
	)
}

function PopUps ({question, item, isOpen, close}) {

	const [popupType, setPopupType] = useState(0);

  const renderPopup = () => {
    if(item.text == "***" || item.text == "|||") {
      return (
        <InteractivePopup 
          img={item.image} 
          close={close}
          type={item.text == "***"}
          solutions={item.text == "***" ? question.answers : []}
        />
      )
    }
    if(popupType == 0)
      return (
        <Question 
          img={item.image}
          question={question.text} 
          options={question.answers} 
          correct={question.answer} 
          successfullCallback={() => {
              if(item.keys) {
                socket.emit('solved');
                setPopupType(1)
              } else
                setPopupType(2)
          }} 
          errouneousCallback={() => {alert('Wrong answer: retry later!')}} 
          close={close}
        />
      );
    else if(popupType == 1)
      return (
        <FoundKey text={item.text} img={process.env.REACT_APP_IMG_SERVER_ADDRESS+item.image} close={close}/>
      )
    else if(popupType == 2)
      return (
        <NoKey text={item.text} img={process.env.REACT_APP_IMG_SERVER_ADDRESS+item.image} close={close}/>
      )
  }

	return (
		<>


			<div className={"popupContainer" + (isOpen ? ' open': '')}>
        {renderPopup()}
				{/* {popupType == 0 ? <Question img={item.image} question={question.text} options={question.answers} correct={question.answer} successfullCallback={() => {setPopupType(1)}} errouneousCallback={() => {alert('Wrong answer: retry later!')}} close={() => setIsOpen(false)}/> : (popupType == 1 ? <FoundKey close={() => setIsOpen(false)}/> : <NoKey close={() => setIsOpen(false)}/>)} */}
			</div>
		</>
	)
}

export default Wall;
