import { useState } from 'react'

function SeccionNav(props) {
    return (
        <div className="flex flex-col items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-all" >
            <img src={props.imagenNav} alt={props.nombreSeccionNav} className="w-16 h-12 rounded-full" onClick={props.onClick} />
            <p className="text-white text-lg font-medium">{props.nombreSeccionNav}</p>
        </div>
    )
}

export default SeccionNav;
