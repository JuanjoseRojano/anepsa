import { useState } from 'react'

//=0 es para dar valor inicial si no pasamos nada
const useManejoBilletes = (valorInicial = 0, numeroDeAsientosRestantes = 0) => {
    const [manejoBilletes, setManejoBilletes] = useState(valorInicial)

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