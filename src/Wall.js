import React, {useState} from 'react'

import { socket } from './socketWorker.js'


function Wall ({image, objects, items}) {

	return (
		<div id="wallContainer" style={{backgroundImage:image}}>

			{ !objects ?
				null :
				objects.map( config => <Object {...config}/>)
			}
		</div>
	)
}

function Object ({x, y, width, height, question, answers, item}) {

	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<>
			<div
				className="object"
				style={{left:x, top:y, width, height}}
				onClick={() => !isOpen && setIsOpen(true)}
				>
			</div>

			<div className={"popupContainer" + (isOpen ? ' open': '')}>
				{/*inside here goes the Question component*/}
			</div>
		</>
	)
}
