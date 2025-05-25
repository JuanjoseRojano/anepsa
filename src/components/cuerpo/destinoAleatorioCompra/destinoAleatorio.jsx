import { useState, useEffect, useRef } from 'react'
import lupa from '../../../media/lupa.png'

function DestinoAleatorio(props) {

    const [destinoAleatorio, setDestinoAleatorio] = useState(null)
    const [destinoSeleccionado, setDestinoSeleccionado] = useState(props.viajes[0].destino)




    useEffect(() => {

        function seleccionarDestinoAleatorio() {
            setDestinoAleatorio(props.viajes[Math.floor(Math.random() * props.viajes.length)].destino)
        }
        const intervalId = setInterval(seleccionarDestinoAleatorio, 3000);

        return () => clearInterval(intervalId)

    }, [props.viajes])

    return (
        <>
            <div className="bg-blue-100 flex flex-col md:flex-row p-3  mx-28 gap-4 md:flex  md:justify-center md:items-center md:space-x-5 md:p-4 border-solid  rounded-xl ">
                <div className='mx-auto'>
                    <img src={lupa} alt="Lupa" className="w-12 h-12" />
                </div>
                <div className="text-lg font-semibold text-gray-700 md:w-32 mx-auto">
                    <p>{destinoAleatorio}</p>
                </div>

                <p className="text-xl text-gray-600 mx-auto">¿Dónde quieres ir?</p>

            </div>

        </>
    )
}

export default DestinoAleatorio
