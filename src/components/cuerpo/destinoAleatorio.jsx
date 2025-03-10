import { useState, useEffect, useRef } from 'react'
import lupa from '../../media/lupa.png'
import SalidaDestinoAleatorio from './salidaDestinoAleatorio'
import Linea from '../linea'
function DestinoAleatorio(props) {

    const [destinoAleatorio, setDestinoAleatorio] = useState(null)
    const [destinoSeleccionado, setDestinoSeleccionado] = useState(props.viajes[0].destino)
    const [precio, setPrecio] = useState(null)
    const [precioTotal, setPrecioTotal] = useState(null)
    const [imagen, setImagen] = useState(null)

    const numeroBillete = 1

    const destinoRef = useRef(null)
    const salidaRef = useRef(null)
    const horarioSalidaRef = useRef(null)
    const diaRef = useRef(null)

    function mostrarSalida(event) {
        setDestinoSeleccionado(event.target.value)

        const viajeSeleccionado = props.viajes.find(viaje => viaje.destino === event.target.value)

        setPrecio(viajeSeleccionado.precio)
        setPrecioTotal(viajeSeleccionado.precio * 1.21)
        setImagen(viajeSeleccionado.imagen)
    }

    useEffect(() => {

        function seleccionarDestinoAleatorio() {
            setDestinoAleatorio(props.viajes[Math.floor(Math.random() * props.viajes.length)].destino)
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
                <form className="flex flex-wrap items-center space-x-5 ">
                    <label className="text-lg font-medium text-gray-700">Entrada:</label>
                    <select ref={destinoRef} onChange={mostrarSalida} className="p-2 border rounded-md">
                        {props.viajes.map((element) => {
                            return (
                                <option key={element.destino}>{element.destino}</option>
                            )
                        })}
                    </select>


                    <SalidaDestinoAleatorio destinoSeleccionado={destinoSeleccionado}
                        horarioSalidaRef={horarioSalidaRef}
                        salidaRef={salidaRef}
                        diaRef={diaRef}
                        viajes={props.viajes} />
                </form>
            </div>

        </>
    )
}

export default DestinoAleatorio
