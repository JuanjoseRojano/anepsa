import { useState } from 'react'

const usePrecioDeLosBilletes = (valorInicial = 0) => {
    const [precioDeLosBilletes, setPrecioDeLosBilletes] = useState(valorInicial)

    //Funcion para mostrar el precio con IVA
    const añadirIVA = (numeroDeBilletes, precio) => {
        if (numeroDeBilletes != 0) {

            setPrecioDeLosBilletes(Math.round((numeroDeBilletes * precio) * 1.21))

        }
        else {
            setPrecioDeLosBilletes(0)
        }
    }

    return {
        precioDeLosBilletes,
        añadirIVA,

    }
}

export default usePrecioDeLosBilletes