import { useState, useEffect, useRef } from 'react'
import lupa from '../../media/lupa.png'
import SalidaDestinoAleatorio from './salidaDestinoAleatorio'
import Linea from '../linea'
function DestinoAleatorio(props) {

    const [destinoAleatorio, setDestinoAleatorio] = useState(null)
    const [destinoSeleccionado, setDestinoSeleccionado] = useState(null)

    let destinoRef = useRef(null)
    const salidaRef = useRef(null)
    const horarioSalidaRef = useRef(null)

    function mostrarSalida(event) {
        setDestinoSeleccionado(event.target.value)
    }

    useEffect(() => {

        function seleccionarDestinoAleatorio() {
            if (props.viajes !== null) {
                setDestinoAleatorio(props.viajes[Math.floor(Math.random() * props.viajes.length)].destino)
            }
        }
        const intervalId = setInterval(seleccionarDestinoAleatorio, 3000);

        return () => clearInterval(intervalId);

    }, [props.viajes])

    return (
        <>
            <div className="bg-[rgba(169,169,169,0.3)] grid grid-cols-2 gap-4 md:flex md:flex-wrap md:justify-center md:items-center md:space-x-5 md:p-4 border-solid border-amber-700 border-1 rounded-xl ">
                <div>
                    <img src={lupa} alt="Lupa" className="w-12 h-12" />
                </div>
                <Linea />
                <div className="text-lg font-semibold text-gray-700 w-32">
                    <p>{destinoAleatorio}</p>
                </div>
                <Linea />

                <p className="text-xl text-gray-600">¿Dónde quieres ir?</p>
                {/* <form > */}
                <form className="flex flex-wrap items-center space-x-5 ">
                    {/* ESTOS SELECT NO TIENEN  */}
                    <label className="text-lg font-medium text-gray-700">Entrada:</label>
                    <select ref={destinoRef} onChange={mostrarSalida} className="p-2 border rounded-md">
                        {props.viajes.map((element) => {
                            return (
                                <option key={element.destino}>{element.destino}</option>
                            )
                        })}
                    </select>
                    <SalidaDestinoAleatorio destinoSeleccionado={destinoSeleccionado} horarioSalidaRef={horarioSalidaRef} salidaRef={salidaRef} viajes={props.viajes} />
                </form>
            </div>

        </>
    )
}

export default DestinoAleatorio
