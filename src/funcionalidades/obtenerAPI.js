//Ruta para el acceso a la api, solo una parte comun para ir a cualquier endpoint
const rutaPrincipal = "https://api-viajes-next.vercel.app/api"

//Funcion para los filtros de busqueda, cambia tanto la lista de los filtros como la información a mostrar
export function filtrosDeBusqueda(
    viajesSinFiltrar,
    setOpcionesDeVuelo,
    tipoDeFiltro,
    setListaFiltrada,
    datoAFiltrar,
    setAntiaSincronia) {

    let coincidenciasDeLosFiltrosAplicados = viajesSinFiltrar.filter(viaje => viaje.destino.toLowerCase().startsWith(tipoDeFiltro.destino.toLowerCase()))
        .filter(viaje => viaje.salida.some((salida => salida.toLowerCase().startsWith(tipoDeFiltro.salida.toLowerCase()))))
        .filter(viaje => parseInt(viaje.precio, 10) >= parseInt(tipoDeFiltro.min, 10))
        .filter(viaje => parseInt(viaje.precio, 10) <= parseInt(tipoDeFiltro.max, 10))

    const filtroAsientos = parseInt(tipoDeFiltro.numeroDeAsientosRestantes, 10)

    if (!isNaN(filtroAsientos)) {
        coincidenciasDeLosFiltrosAplicados = coincidenciasDeLosFiltrosAplicados.filter(viaje => {
            return !isNaN(parseInt(viaje.numeroDeAsientosAvion, 10)) && parseInt(viaje.numeroDeAsientosAvion, 10) >= filtroAsientos
        })
    }

    coincidenciasDeLosFiltrosAplicados = coincidenciasDeLosFiltrosAplicados.filter(viaje => viaje.numeroDeAsientosRestantes > 0)



    if (coincidenciasDeLosFiltrosAplicados.length > 0) {

        const listadoSinArrays = []

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



//Funcion para decodificar y fragmentar el token HTTPOnly
export function decodedToken(token) {
    try {
        const [headerB64, payloadB64, signatureB64] = token.split('.')

        const base64UrlToBase64 = (base64Url) => {
            return base64Url.replace(/-/g, '+').replace(/_/g, '/')
        }

        const decodedHeader = JSON.parse(atob(base64UrlToBase64(headerB64)))
        const decodedPayload = JSON.parse(atob(base64UrlToBase64(payloadB64)))
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



//Funcion para obtener datos a traves de ruta especifica
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



//Funcion para eliminar datos a traves de ruta especifica
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



//Funcion para añadir datos a traves de ruta especifica
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



//Funcion para modificar datos a traves de ruta especifica
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