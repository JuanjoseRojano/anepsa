import { useState, useEffect } from 'react'
import usePrecioDeLosBilletes from '../../../hooks/usePrecioDeLosBilletes'
import { format } from 'date-fns'

function TarjetasMisViajes(props) {

    const { precioDeLosBilletes, añadirIVA } = usePrecioDeLosBilletes(props.element.precioDelVuelo)
    const [fechaDeVuelo, setFechaDeVuelo] = useState(format(new Date(props.element.fechaDeVuelo), 'dd/MM/yyyy'))

    useEffect(() => {
        añadirIVA(props.element.numeroDeBilletes, props.element.precioDelVuelo)
    }, [])

    return <>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">
            <h1 className="text-xl text-center font-semibold text-blue-800 max-w-sm rounded-xl border border-blue-200 shadow-xl p-6 bg-blue-100 mb-6">{props.element.destino}</h1>
            <p className="text-gray-600 text-sm m-7">Viaje muy proximo como para cambiarlo</p>

            <img
                src={props.element.imagen}
                alt={`Imagen de ${props.element.destino}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">
                <p className="text-gray-600">Salida: {props.element.salida}</p>
                <p className="text-gray-600">Horario de vuelo: {props.element.horarioDeVuelo}</p>
                <p className="text-gray-600">Fecha de vuelo: {fechaDeVuelo}</p>

            </div>

            <div className="bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">
                <p className="text-gray-600">Número de billetes: {props.element.numeroDeBilletes}</p>
                <p className="text-gray-600 mt-2">Precio original: {props.element.precioDelVuelo}€ </p>
                <p className="text-gray-600 mt-1">Precio final: {precioDeLosBilletes}€</p>
            </div>

        </div>

    </>


}

export default TarjetasMisViajes


