
export const masterKey = '$2a$10$FiIl9wfiJtIoBGuhnKBQUOqNLhimtxTTilPTlThCIp7iwJh8YJ4SO'
export const rutaUsuarios = 'https://api.jsonbin.io/v3/b/67b9daa4e41b4d34e498250d'
export const rutaViajes = 'https://api.jsonbin.io/v3/b/67bb3111acd3cb34a8edb1cd'


// Permite obtener informacion pasando llave maestra e id
// export async function getJson(url, masterKey) {
//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 "X-Master-Key": masterKey
//             }
//         });
//         if (!response.ok) {
//             throw new Error("Error al obtener los datos JSON");
//         }
//         const result = await response.json();
//         return result
//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// }




export async function uploadJson(url, masterKey, data) {

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": masterKey
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Error al subir los datos JSON");
        }

        const result = await response.json();
        console.log("Datos subidos con éxito:", result);
    } catch (error) {
        console.error("Error:", error.message);
    }
}




export function comprarBilletes(
    usuarios,
    setUsuarios,
    usuarioConectado,
    setUsuarioConectado,
    refDestino,
    refSalida,
    refImagenDestino,
    refHoraDeSalida,
    refDiaSemana,
    refPrecioBilleteFinal,
    refNumeroBilletes,
    refPrecioOriginal,
    setErrorDeFormulario
) {


    if (usuarioConectado === null || usuarioConectado === undefined) {
        //Debo utilizar return para que se corte la ejecucion, de otro modo podría salir un error no deseado
        setErrorDeFormulario("Debe iniciar sesion")
        return
    } else {
        const viajeDuplicado = usuarioConectado.viajes.find((element) => {
            return (
                element.destino === refDestino &&
                element.salida.includes(refSalida) &&
                element.horariosDeVuelo.includes(refHoraDeSalida) &&
                element.diasDeLaSemana.includes(refDiaSemana)
            );
        });
        if (viajeDuplicado) {
            setErrorDeFormulario("El usuario ya tiene un viaje reservado igual que este")
            return
        } else {
            if (refNumeroBilletes === 0) {
                setErrorDeFormulario("Debe agregar mínimo 1 billete máximo 20")
                return
            }

            const usuarioActualizado = {
                ...usuarioConectado,
                viajes: [
                    ...usuarioConectado.viajes,
                    {
                        destino: refDestino,
                        salida: refSalida,
                        horariosDeVuelo: refHoraDeSalida,
                        diasDeLaSemana: refDiaSemana,
                        numeroBilletes: refNumeroBilletes,
                        precio: refPrecioOriginal,
                        precioTotal: refPrecioBilleteFinal,
                        imagen: refImagenDestino
                    }
                ]
            }

            setUsuarioConectado(usuarioActualizado);

            setUsuarios((prev) => {
                const subirUsuarios = prev.map((prevUsuario) => {
                    if (prevUsuario.nombreUsuario === usuarioActualizado.nombreUsuario) {
                        return usuarioActualizado;
                    } else {
                        return prevUsuario;
                    }
                })
                uploadJson(rutaUsuarios, masterKey, subirUsuarios)
                return subirUsuarios
            })
        }
        setErrorDeFormulario("Billete comprado con éxito")
        return
    }
}

export function eliminarUsuario(
    usuarios,
    setUsuarios,
    usuarioConectado,
    setUsuarioConectado
) {
    const usuariosActualizados = usuarios.filter(
        (usuario) =>
            usuario.nombreUsuario !== usuarioConectado.nombreUsuario
    )


    setUsuarioConectado(null)
    setUsuarios(usuariosActualizados)
    uploadJson(rutaUsuarios, masterKey, usuariosActualizados)
}



export function eliminarBillete(
    e,
    destino,
    salida,
    horarioVuelo,
    diaSemana,
    usuarioConectado,
    setUsuarioConectado,
    usuarios,
    setUsuarios
) {

    const usuarioViajeActualizado = usuarioConectado.viajes.filter(
        (cambiarViaje) =>
            !(cambiarViaje.destino === destino && cambiarViaje.salida === salida && cambiarViaje.horariosDeVuelo === horarioVuelo && cambiarViaje.diasDeLaSemana === diaSemana)
    )


    const usuarioActualizado = {
        ...usuarioConectado,
        viajes: usuarioViajeActualizado
    }
    setUsuarioConectado(usuarioActualizado)

    setUsuarios((prev) => {
        const subirUsuarios = prev.map((prevUsuario) => {
            if (prevUsuario.nombreUsuario === usuarioActualizado.nombreUsuario) {
                return usuarioActualizado;
            } else {
                return prevUsuario;
            }
        })
        uploadJson(rutaUsuarios, masterKey, subirUsuarios)
        return subirUsuarios
    })

    return usuarioActualizado
}

export function cambiarBillete(
    e,
    destino,
    salida,
    horarioVuelo,
    diaSemana,
    numeroBilletes,
    precioOriginal,
    precioTotal,
    imagen,
    usuarioConectado,
    setUsuarioConectado,
    usuarios,
    setUsuarios
) {
    if (numeroBilletes != 0) {
        const nuevoVueloActualizado = {
            destino: destino,
            salida: salida,
            horariosDeVuelo: horarioVuelo,
            diasDeLaSemana: diaSemana,
            numeroBilletes: numeroBilletes,
            precio: precioOriginal,
            precioTotal: precioTotal,
            imagen: imagen
        }


        const usuarioSinVuelo = eliminarBillete(
            e,
            destino,
            salida,
            horarioVuelo,
            diaSemana,
            usuarioConectado,
            setUsuarioConectado,
            usuarios,
            setUsuarios
        )

        const usuarioActualizado = {
            ...usuarioSinVuelo,
            viajes: [...usuarioSinVuelo.viajes, nuevoVueloActualizado]
        }

        setUsuarioConectado(usuarioActualizado)

        setUsuarios((prev) => {
            const subirUsuarios = prev.map((prevUsuario) => {
                if (prevUsuario.nombreUsuario === usuarioActualizado.nombreUsuario) {
                    return usuarioActualizado;
                } else {
                    return prevUsuario;
                }
            })
            uploadJson(rutaUsuarios, masterKey, subirUsuarios)
            return subirUsuarios
        })
    }
    else {
        eliminarBillete(
            e,
            destino,
            salida,
            horarioVuelo,
            diaSemana,
            usuarioConectado,
            setUsuarioConectado,
            usuarios,
            setUsuarios
        )
    }
}











//Código nuevo


//Funciones para filtros
export function filtrosDeBusqueda(
    viajesSinFiltrar,
    setOpcionesDeVuelo,
    tipoDeFiltro,
    setListaFiltrada,
    datoAFiltrar,
    setAntiaSincronia) {
    //NOTA PERSONAL startsWith funciona solo con tipo string

    let coincidenciasDeLosFiltrosAplicados = viajesSinFiltrar.filter(viaje => viaje.destino.toLowerCase().startsWith(tipoDeFiltro.destino.toLowerCase()))
        .filter(viaje => viaje.salida.some((salida => salida.toLowerCase().startsWith(tipoDeFiltro.salida.toLowerCase()))))
        .filter(viaje => parseInt(viaje.precio, 10) >= parseInt(tipoDeFiltro.min, 10))
        .filter(viaje => parseInt(viaje.precio, 10) <= parseInt(tipoDeFiltro.max, 10))

    if (tipoDeFiltro.numeroDeAsientosAvion != "") {

        coincidenciasDeLosFiltrosAplicados = coincidenciasDeLosFiltrosAplicados.filter(viaje => parseInt(viaje.numeroDeAsientosRestantes, 10) >= parseInt(tipoDeFiltro.numeroDeAsientosAvion, 10))



    }

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
        const response = await fetch(`http://localhost:3000/api${ruta}`, {
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
        const response = await fetch(`http://localhost:3000/api${ruta}`, {
            method: "DELETE",
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



export async function postMongoDB(ruta, data) {
    try {
        console.log(data)
        const response = await fetch(`http://localhost:3000/api${ruta}`, {
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
        const response = await fetch(`http://localhost:3000/api${ruta}`, {
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