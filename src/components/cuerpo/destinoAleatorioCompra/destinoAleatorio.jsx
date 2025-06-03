import { useState, useEffect } from 'react'
import lupa from '../../../media/lupa.png'

function DestinoAleatorio(props) {

    const [destinoAleatorio, setDestinoAleatorio] = useState(null)




    useEffect(() => {

        function seleccionarDestinoAleatorio() {
            setDestinoAleatorio(props.viajes[Math.floor(Math.random() * props.viajes.length)].destino)
        }
        const intervalId = setInterval(seleccionarDestinoAleatorio, 3000);

        return () => clearInterval(intervalId)

    }, [props.viajes])

    return (
        <>
            <div className="bg-blue-100 flex flex-col md:flex-row p-3   gap-10 md:flex  md:justify-center md:items-center md:space-x-5 md:p-4 border-solid  rounded-xl mx-auto">
                <div className='mx-auto'>
                    <img src={lupa} alt="Lupa" className="w-12 h-12" />
                </div>
                <div className="text-lg font-semibold text-gray-700  mx-auto">
                    <p>{destinoAleatorio}</p>
                </div>
                <div className="text-lg font-semibold text-gray-700  mx-auto text-center">
                    <p className="text-xl text-gray-600 mx-auto">¿Dónde quieres ir?</p>
                </div>
            </div>
        </>
    )
}
export default DestinoAleatorio
