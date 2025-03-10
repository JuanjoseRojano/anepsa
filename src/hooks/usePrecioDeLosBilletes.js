import { useState } from 'react'



const usePrecioDeLosBilletes = (valorInicial = 0) => {
    const [precioDeLosBilletes, setPrecioDeLosBilletes] = useState(valorInicial)

    const añadirIVA = (numeroDeBilletes, precio) => {
        if (numeroDeBilletes != 0) {
            const precioNumerico = parseFloat(precio.replace(/[^0-9.-]+/g, ""))

            setPrecioDeLosBilletes(Math.round((numeroDeBilletes * precioNumerico) * 1.21))

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