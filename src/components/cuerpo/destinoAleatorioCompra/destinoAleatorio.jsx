import { useState, useEffect, useRef } from 'react'
import lupa from '../../../media/lupa.png'
import SalidaDestinoAleatorio from './salidaDestinoAleatorio'
import Linea from '../../linea'
import { Link, useNavigate } from "react-router-dom"
import { comprarBilletes } from '../../../funcionalidades/obtenerAPI'
function DestinoAleatorio(props) {

    const [destinoAleatorio, setDestinoAleatorio] = useState(null)
    const [destinoSeleccionado, setDestinoSeleccionado] = useState(props.viajes[0].destino)

    const navigate = useNavigate()


    const destinoRef = useRef(props.viajes[0].destino)
    const salidaRef = useRef(props.viajes[0].salida[0])
    const horaRef = useRef(props.viajes[0].horariosDeVuelo[0])
    const diaRef = useRef(props.viajes[0].diasDeLaSemana[0])

    const [precioOriginal, setPrecioOriginal] = useState(props.viajes[0].precio)
    const [precioTotal, setPrecioTotal] = useState(props.viajes[0].precio * 1.21)
    const [imagen, setImagen] = useState(props.viajes[0].imagen)
    const [errorDeFormulario, setErrorDeFormulario] = useState("")

    const manejoBilletes = 1

    function mostrarSalida(event) {
        setDestinoSeleccionado(event.target.value)
        const viajeSeleccionado = props.viajes.find(viaje => viaje.destino === event.target.value)
        setImagen(viajeSeleccionado.imagen)
        setPrecioTotal(viajeSeleccionado.precio * 1.21)
        setPrecioOriginal(viajeSeleccionado.precio)
    }

    function realizarCompra(e) {
        e.preventDefault()
        if (props.usuarioConectado != null) {
            comprarBilletes(
                props.usuarios,
                props.setUsuarios,
                props.usuarioConectado,
                props.setUsuarioConectado,
                destinoRef.current.value,
                salidaRef.current.value,
                imagen,
                salidaRef.current.value,
                diaRef.current.value,
                precioTotal,
                manejoBilletes,
                precioOriginal,
                setErrorDeFormulario
            )

            navigate("/TusViajes")
        }
        else {
            navigate("/LogIn")
        }

    }


    useEffect(() => {

        function seleccionarDestinoAleatorio() {
            setDestinoAleatorio(props.viajes[Math.floor(Math.random() * props.viajes.length)].destino)
        }
        const intervalId = setInterval(seleccionarDestinoAleatorio, 3000);

        return () => clearInterval(intervalId)

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
                <form onSubmit={realizarCompra} className="flex flex-wrap items-center space-x-5 ">
                    <label className="text-lg font-medium text-gray-700">Entrada:</label>
                    <select ref={destinoRef} value={destinoSeleccionado} onChange={mostrarSalida} className="p-2 border rounded-md">
                        {props.viajes.map((element) => {
                            return (
                                <option key={element.destino}>{element.destino}</option>
                            )
                        })}
                    </select>

                    <SalidaDestinoAleatorio destinoSeleccionado={destinoSeleccionado} viajes={props.viajes} salidaRef={salidaRef} horaRef={horaRef} diaRef={diaRef} />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-lg transition duration-300">
                        Comprar
                    </button>
                </form>
            </div>

        </>
    )
}

export default DestinoAleatorio
