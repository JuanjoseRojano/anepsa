
import { useState, useEffect } from 'react'
function SalidaDestinoAleatorio(props) {

    const valor = props.viajes.filter(element => element.destino === props.destinoSeleccionado)



    return (

        <>
            <label className="text-lg font-medium text-gray-700">
                Salida:  <select ref={props.salidaRef} className="p-2 border rounded-md">
                    {
                        valor.map((element) =>
                            element.salida.map((elementSalida) => (
                                <option >{elementSalida}</option>
                            ))
                        )
                    }
                </select>
            </label>
            <label className="text-lg font-medium text-gray-700">
                Hora:  <select ref={props.horaRef} className="p-2 border rounded-md">
                    {
                        valor.map((element) =>
                            element.horariosDeVuelo.map((elementHorariosDeVuelo) => (
                                <option >{elementHorariosDeVuelo}</option>
                            ))
                        )
                    }
                </select>
            </label>
            <label className="text-lg font-medium text-gray-700" >
                Hora:  <select ref={props.diaRef} className="p-2 border rounded-md">
                    {
                        valor.map((element) =>
                            element.diasDeLaSemana.map((elementDiasDeLaSemana) => (
                                <option >{elementDiasDeLaSemana}</option>
                            ))
                        )
                    }
                </select>
            </label>
        </>
    )

}

export default SalidaDestinoAleatorio
