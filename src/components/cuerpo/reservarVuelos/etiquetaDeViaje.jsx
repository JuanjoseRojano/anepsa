import { useState, } from 'react'
import SelectViajes from '../../selectViajes';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";


function EtiquetaDeViaje(props) {


    const navigate = useNavigate()

    function realizarCompra(e) {
        e.preventDefault()
        props.setVueloAComprar(props.element)
        navigate('/ReservarViajes/ComprarBillete')
    }

    return <>
        <div className="bg-stone-100 p-6 rounded-xl border-2 border-gray-300 shadow-2xl max-w-md w-full text-center m-4 z-20 max-h-200">

            <div className="mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">{props.element.destino}</h1>
            </div>
            <div className="w-full h-20 flex justify-center items-center">
                <svg
                    viewBox="0 0 400 100"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Línea con ondas suaves y más planas */}
                    <path
                        d="
            M10 50
            C 60 35, 90 35, 140 50
            S 210 65, 260 50
            S 330 35, 380 50
          "
                        fill="transparent"
                        stroke="#2563EB"
                        strokeWidth="3"
                        strokeDasharray="10 8"
                        strokeLinecap="round"
                    />

                    {/* X al final */}
                    <g transform="translate(380,50)">
                        <line
                            x1="-10"
                            y1="-10"
                            x2="10"
                            y2="10"
                            stroke="#DC2626"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                        <line
                            x1="-10"
                            y1="10"
                            x2="10"
                            y2="-10"
                            stroke="#DC2626"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>
            <div className="flex gap-6 mb-4">

                <div className="flex-shrink-0 w-1/2 h-48 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={props.element.imagen}
                        alt={props.element.destino}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between w-1/2 text-left">

                    <select className="p-2 border border-gray-300 rounded-md text-lg mb-4" required>
                        <SelectViajes opciones={props.element.salida} />
                    </select>

                    <h3 className="mb-2">{props.element.numeroDeAsientosRestantes} asientos restantes</h3>
                    <h3>{props.element.numeroDeAsientosRestantes} € el billete</h3>

                </div>
            </div>

            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-lg transition duration-300 w-full"
                    onClick={(e) => realizarCompra(e)}
                >
                    Comprar
                </button>
            </div>

        </div>

        {/* <div className="bg-white p-6 rounded-xl border-2 border-gray-300 shadow-lg max-w-md w-full text-center m-4 z-20 max-h-200">
            <h1 className="text-2xl font-semibold text-gray-800">{props.element.destino}</h1>
            <div className=' max-w-400 h-50'>

                <img
                    src={props.element.imagen}
                    alt={props.element.destino}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />

            </div>

            <div className="grid w-full  gap-4 m-3 bg-amber-600">

                <select className="p-2 border border-gray-300 rounded-md text-lg" required>
                    <SelectViajes opciones={props.element.salida} />
                </select>

                <h3 className='w-full'>{props.element.numeroDeAsientosRestantes} asientos restantes</h3>
                <h3>{props.element.numeroDeAsientosRestantes} € el billete</h3>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-lg transition duration-300"
                onClick={((e) => { realizarCompra(e) })}
            >
                Comprar
            </button>

        </div > */}
    </>


}

export default EtiquetaDeViaje