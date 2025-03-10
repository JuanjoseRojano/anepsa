
import { useState, useEffect } from 'react'

function SalidaDestinoAleatorio(props) {

    const viajeSeleccionado = props.viajes.find(viaje => viaje.destino === props.destinoSeleccionado)

    // viajeSeleccionado.salida.map((element) => {
    //     console.log(element)
    // })






    function handleChange(event) {
        const selectedValue = event.target.value;  // El valor seleccionado en el select
        console.log(selectedValue);  // Imprimir el valor en la consola

        // Actualizar el estado con el valor seleccionado
        setDestinoSeleccionado(selectedValue);
    }

    return (<>
        <label>Salida:
            <select ref={props.salidaRef} onChange={handleChange}>
                {/* {
                    viajeSeleccionado.salida.map((element) => ( */}
                {/* <option >{element.salida}</option> */}
                <option value="a"></option>
                {/* ) */}
                {/* ) */}
                {/* } */}
            </select>
        </label>
    </>)


    // })



    // if (props.destinoSeleccionado === null) {
    //     return (
    //         <>
    //             <div className="mt-4 flex flex-wrap  space-x-5 justify-center">
    //                 <label className="text-lg font-semibold text-gray-700">Salida:</label>

    //                 <select ref={props.salidaRef} className="p-2 border rounded-md ">
    //                     {props.viajes[0].salida.map((element) => {
    //                         return (<option >{element}</option>
    //                         )
    //                     })}
    //                 </select>
    //             </div>
    //             <div className="mt-4 flex flex-wrap  space-x-5 justify-center">
    //                 <label className="text-lg font-semibold text-gray-700">Horarios:</label>

    //                 <select ref={props.horarioSalidaRef} className="p-2 border rounded-md ">
    //                     {props.viajes[0].horariosDeVuelo.map((element) => {
    //                         return (<option >{element}</option>
    //                         )
    //                     })}
    //                 </select>
    //             </div>
    //         </>
    //     )
    // } else {
    //     return (
    //         <>
    //             {
    //                 props.viajes.map((element, index) => {
    //                     if (element.destino === props.destinoSeleccionado) {
    //                         return (<>

    //                             <div className="flex flex-wrap items-center space-x-5">
    //                                 <label className="text-lg font-semibold text-gray-700">Salida:</label>

    //                                 <select ref={props.salidaRef} className="p-2 border rounded-md ">

    //                                     {element.salida.map((elementSalida, indexSalida) => {
    //                                         return (<option >{elementSalida}</option>
    //                                         )
    //                                     })}
    //                                 </select>
    //                             </div>

    //                             <div className="flex flex-wrap items-center space-x-5">
    //                                 <label className="text-lg font-semibold text-gray-700">Horarios:</label>

    //                                 <select className="p-2 border rounded-md ">

    //                                     {element.horariosDeVuelo.map((elementhorariosDeVuelo, indexhorariosDeVuelo) => {
    //                                         return (<option key={indexhorariosDeVuelo}>{elementhorariosDeVuelo}</option>
    //                                         )
    //                                     })}
    //                                 </select>
    //                             </div>


    //                         </>
    //                         )
    //                     }

    //                 })
    //             }

    //         </>
    //     )
    // }
}

export default SalidaDestinoAleatorio
