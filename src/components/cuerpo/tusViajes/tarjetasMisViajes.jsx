import { useState, useEffect } from 'react'
import useManejoBilletes from '../../../hooks/useManejoBilletes'
import usePrecioDeLosBilletes from '../../../hooks/usePrecioDeLosBilletes'
import Boton from '../../Boton'

import { eliminarBillete, cambiarBillete } from '../../../funcionalidades/obtenerAPI'
function TarjetasMisViajes(props) {

    const diseñoBotonesPequeños = "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2"


    const { precioDeLosBilletes, añadirIVA } = usePrecioDeLosBilletes(props.precioTotal)
    const { manejoBilletes, sumar, resta } = useManejoBilletes(props.numeroBilletes)

    const estiloBoton = "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mt-4"

    useEffect(() => {
        añadirIVA(manejoBilletes, props.precioOriginal)
    }, [manejoBilletes])

    return <>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">
            <img
                src={props.imagen}
                alt={`Imagen de ${props.destino}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h1 className="text-xl font-semibold text-blue-800 max-w-sm rounded-xl border border-blue-200 shadow-xl p-6 bg-blue-100 mb-6">{props.destino}</h1>
            <div className="bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">
                <p className="text-gray-600">Salida: {props.salida}</p>
                <p className="text-gray-600">Horario de vuelo: {props.horariosDeVuelo}</p>
                <p className="text-gray-600">Día semana: {props.diasDeLaSemana}</p>
            </div>

            <div className="flex items-center space-x-2 mt-4 bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4">
                <Boton nombreBoton="-" funcionBoton={resta} className={diseñoBotonesPequeños} />
                <p className="text-gray-600">Número de billetes: {manejoBilletes}</p>
                <Boton nombreBoton="+" funcionBoton={sumar} className={diseñoBotonesPequeños} />
            </div>
            <div className="bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">

                <p className="text-gray-600 mt-2">Precio original: {props.precioOriginal} </p>
                <p className="text-gray-600 mt-1">Precio final: {precioDeLosBilletes}€</p>
            </div>
            <div className="mt-4 space-x-2 flex flex-cols">
                <Boton nombreBoton="Actualizar billete" className={estiloBoton} funcionBoton={(e) => {
                    e.preventDefault()
                    cambiarBillete(
                        e,
                        props.destino,
                        props.salida,
                        props.horariosDeVuelo,
                        props.diasDeLaSemana,
                        manejoBilletes,
                        props.precioOriginal,
                        precioDeLosBilletes,
                        props.imagen,
                        props.usuarioConectado,
                        props.setUsuarioConectado,
                        props.usuarios,
                        props.setUsuarios
                    )
                }} />
                <Boton nombreBoton="Eliminar billete" className={estiloBoton} funcionBoton={(e) => {
                    e.preventDefault()
                    eliminarBillete(
                        e,
                        props.destino,
                        props.salida,
                        props.horariosDeVuelo,
                        props.diasDeLaSemana,
                        props.usuarioConectado,
                        props.setUsuarioConectado,
                        props.usuarios,
                        props.setUsuarios
                    )
                }} />
            </div>
        </div>

    </>


}

export default TarjetasMisViajes


