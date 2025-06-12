import { useState, useEffect } from 'react'

function ErrorGeneral(props) {

    const [colorDeFondo, setColorDeFondo] = useState(" bg-red-100 border border-red-400 text-red-700")

    //UseEffect para dividir entre proceso con exito o sin exito al mostrar error
    useEffect(() => {
        if (props.error === "Proceso finalizado con exito") {
            setColorDeFondo("bg-green-100 border border-green-400 text-green-700")
        }
        else {
            setColorDeFondo(" bg-red-100 border border-red-400 text-red-700")
        }


        //Timeout para cerrar la alerta tras unos segundos
        const timerError = setTimeout(() => {
            props.setError("")
        }, 2000)

        return () => clearTimeout(timerError)
    }, [props.error])

    const esconderError = () => {
        props.setError("")
    }

    return <>
        <div className="min-h-screen bg-gray-100 p-4">

            {props.error && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm sm:max-w-md md:max-w-lg">
                    <div
                        className={`${colorDeFondo} px-4 py-3 rounded shadow-md flex items-center justify-between w-full`}
                    >
                        <span className="text-sm sm:text-base">{props.error}</span>
                        <button
                            onClick={esconderError}
                            className="ml-4 text-sm font-semibold hover:underline"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>   </>


}

export default ErrorGeneral


