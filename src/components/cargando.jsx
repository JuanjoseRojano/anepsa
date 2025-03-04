import React from 'react'

function Cargando() {
    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <div className="flex space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-6 h-6 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full animate-bounce"></div>
            </div>
            <h1 className="text-xl font-semibold text-gray-700">
                Cargando base de datos...
            </h1>
        </div>
    )



}

export default Cargando;
