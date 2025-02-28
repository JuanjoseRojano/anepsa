// import { useState } from 'react'

// function SalidaDestinoAleatorio(props) {
//     if (props.destinoSeleccionado === null) {
//         return (<>
//             <label>Salida:
//                 <p ref={props.salidaRef}>{props.elementSalida}</p>
//             </label></>)
//     }

//     else {
//         return (
//             <>

//                 {
//                     props.viajes.map((element, index) => {
//                         console.log(props.destinoSeleccionado)
//                         console.log(element.destino)

//                         if (element.destino === props.destinoSeleccionado) {
//                             return (<>
//                                 <label>Salida:
//                                     <p ref={props.salidaRef}>{element.salida}</p>
//                                 </label>
//                             </>)
//                         }

//                     }
//                     )
//                 }
//             </>)
//     }



// }

// export default SalidaDestinoAleatorio
import { useState } from 'react'

function SalidaDestinoAleatorio(props) {
    if (props.destinoSeleccionado === null) {
        return (
            <>
                <div className="mt-4 flex flex-wrap  space-x-5 justify-center">
                    <label className="text-lg font-semibold text-gray-700">Salida:</label>

                    <select ref={props.salidaRef} className="p-2 border rounded-md ">
                        {props.viajes[0].salida.map((element) => {
                            return (<option >{element}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="mt-4 flex flex-wrap  space-x-5 justify-center">
                    <label className="text-lg font-semibold text-gray-700">Horarios:</label>

                    <select ref={props.horarioSalidaRef} className="p-2 border rounded-md ">
                        {props.viajes[0].horariosDeVuelo.map((element) => {
                            return (<option >{element}</option>
                            )
                        })}
                    </select>
                </div>
            </>
        )
    } else {
        return (
            <>
                {
                    props.viajes.map((element, index) => {
                        if (element.destino === props.destinoSeleccionado) {
                            return (<>

                                <div className="flex flex-wrap items-center space-x-5">
                                    <label className="text-lg font-semibold text-gray-700">Salida:</label>

                                    <select ref={props.salidaRef} className="p-2 border rounded-md ">

                                        {element.salida.map((elementSalida, indexSalida) => {
                                            return (<option >{elementSalida}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="flex flex-wrap items-center space-x-5">
                                    <label className="text-lg font-semibold text-gray-700">Horarios:</label>

                                    <select className="p-2 border rounded-md ">

                                        {element.horariosDeVuelo.map((elementhorariosDeVuelo, indexhorariosDeVuelo) => {
                                            return (<option key={indexhorariosDeVuelo}>{elementhorariosDeVuelo}</option>
                                            )
                                        })}
                                    </select>
                                </div>


                            </>
                            )
                        }

                    })
                }

            </>
        )
    }
}

export default SalidaDestinoAleatorio
