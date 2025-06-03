// const rutaPrincipal = "https://api-viajes-next.vercel.app/api"
const rutaPrincipal = "http://localhost:3000/api"

//Funciones para filtros
export function filtrosDeBusqueda(
    viajesSinFiltrar,
    setOpcionesDeVuelo,
    tipoDeFiltro,
    setListaFiltrada,
    datoAFiltrar,
    // slider,
    setAntiaSincronia) {
    //NOTA PERSONAL startsWith funciona solo con tipo string

    let coincidenciasDeLosFiltrosAplicados = viajesSinFiltrar.filter(viaje => viaje.destino.toLowerCase().startsWith(tipoDeFiltro.destino.toLowerCase()))
        .filter(viaje => viaje.salida.some((salida => salida.toLowerCase().startsWith(tipoDeFiltro.salida.toLowerCase()))))
        .filter(viaje => parseInt(viaje.precio, 10) >= parseInt(tipoDeFiltro.min, 10))
        .filter(viaje => parseInt(viaje.precio, 10) <= parseInt(tipoDeFiltro.max, 10))

    const filtroAsientos = parseInt(tipoDeFiltro.numeroDeAsientosRestantes, 10)

    if (!isNaN(filtroAsientos)) {
        coincidenciasDeLosFiltrosAplicados = coincidenciasDeLosFiltrosAplicados.filter(viaje => {
            //El problema esque al tratar de filtrar por un numero, puedo no devolver nada y no dejar pasar al array y viceversa
            //ademas el valor vacio ocasiona errores por lo tanto devuelvo true o false antes de filtrar
            return !isNaN(parseInt(viaje.numeroDeAsientosAvion, 10)) && parseInt(viaje.numeroDeAsientosAvion, 10) >= filtroAsientos
        })
    }

    coincidenciasDeLosFiltrosAplicados = coincidenciasDeLosFiltrosAplicados.filter(viaje => viaje.numeroDeAsientosRestantes > 0)



    if (coincidenciasDeLosFiltrosAplicados.length > 0) {

        const listadoSinArrays = []

        // NOTA algunos posibles resultados pueden ser arrays por lo tanto,
        //  lo convierto todo a array para evitar valores duplicados y mostrar solo la informacion deseada
        //aunque pueda parecer que pueda estar repitiendo codigo, el filtrado de aqui debe comportarse de manera diferente

        coincidenciasDeLosFiltrosAplicados.forEach((element) => {
            const valor = element[datoAFiltrar]

            if (Array.isArray(valor)) {
                valor.forEach((subValor) => {
                    if (String(subValor).toLowerCase().startsWith(String(tipoDeFiltro[datoAFiltrar]).toLowerCase())) {
                        listadoSinArrays.push(subValor)
                    }
                });
            } else {
                listadoSinArrays.push(valor)
            }
        })

        setListaFiltrada([...new Set(listadoSinArrays)])
        setOpcionesDeVuelo(coincidenciasDeLosFiltrosAplicados)
        setAntiaSincronia(prev => prev + 1)

    }
    else {
        setOpcionesDeVuelo("No encontrado")
        setAntiaSincronia(prev => prev + 1)

    }

}








//Decodificar token

export function decodedToken(token) {
    try {
        // Dividir el token en sus 3 partes: header, payload y signature
        const [headerB64, payloadB64, signatureB64] = token.split('.')

        // Decodificar de Base64Url a Base64 estándar y luego a UTF-8
        const base64UrlToBase64 = (base64Url) => {
            return base64Url.replace(/-/g, '+').replace(/_/g, '/')
        }

        const decodedHeader = JSON.parse(atob(base64UrlToBase64(headerB64)))
        const decodedPayload = JSON.parse(atob(base64UrlToBase64(payloadB64)))
        //ADVERTENCIA a diferencia de header y payload, signature es una cadena y no mantiene formato json por eso eliminamos JSON.parse()
        //ademas signature es seguridad por lo tanto es totalmente inutil, no se puede desencriptar pues de eso se encarga google
        const decodedSignatureB64 = base64UrlToBase64(signatureB64)

        return {
            header: decodedHeader,
            payload: decodedPayload,
            signature: decodedSignatureB64,
        }
    } catch (error) {
        console.error("Error al decodificar el JWT:", error)
        return null
    }
}


export async function getMongoDB(ruta) {
    try {
        const response = await fetch(`${rutaPrincipal}${ruta}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Error al obtener los datos JSON");
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error("Error:", error.message);
    }

}


export async function deleteMongoDB(ruta) {
    try {
        const response = await fetch(`${rutaPrincipal}${ruta}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al obtener los datos JSON");
        }
        const result = await response.json();
        console.log(result)
        // console.log(ruta)
        return result
    } catch (error) {
        console.error("Error:", error.message);
    }

}



export async function postMongoDB(ruta, data) {
    try {
        console.log(data)
        const response = await fetch(`${rutaPrincipal}${ruta}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),

        });
        if (!response.ok) {
            throw new Error("Error al obtener los datos JSON");
        }
        const result = await response.json();
        console.log(result)
        return result
    } catch (error) {
        console.error("Error:", error.message);
    }

}





export async function putMongoDB(ruta, data) {
    try {
        console.log(data)
        console.log(ruta)

        const response = await fetch(`${rutaPrincipal}${ruta}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),

        })
        if (!response.ok) {
            throw new Error("Error al obtener los datos JSON");
        }
        const result = await response.json();
        console.log(result)
        return result
    } catch (error) {
        console.error("Error:", error.message);
    }

}