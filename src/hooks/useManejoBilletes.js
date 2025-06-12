import { useState } from 'react'

const useManejoBilletes = (valorInicial = 0, numeroDeAsientosRestantes = 0) => {
    const [manejoBilletes, setManejoBilletes] = useState(valorInicial)

    //Funciones para aumentar disminuir el numero de billetes
    const sumar = () => {
        if (manejoBilletes <= numeroDeAsientosRestantes) {
            setManejoBilletes(manejoBilletes + 1)
        }
        else {
            setManejoBilletes(manejoBilletes)
        }
    }

    const resta = () => {
        if (manejoBilletes != 0) {
            setManejoBilletes(manejoBilletes - 1)

        }
        else {
            setManejoBilletes(manejoBilletes)
        }
    }
    return {
        manejoBilletes,
        sumar,
        resta
    }
}

export default useManejoBilletes