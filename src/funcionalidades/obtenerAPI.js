// ¿Es JSONBIN seguro ?
// Ni siquiera almacenamos los tokens de autenticación en nuestro extremo.Además,
// sus datos están seguros y protegidos.No compartimos los datos con ninguna otra empresa para 
// publicidad ni nada relacionado.Puede solicitar la eliminación de su cuenta y todos los datos 
// relacionados con su cuenta se borrarán por completo de nuestros servidores.



export const masterKey = '$2a$10$FiIl9wfiJtIoBGuhnKBQUOqNLhimtxTTilPTlThCIp7iwJh8YJ4SO'
export const rutaUsuarios = 'https://api.jsonbin.io/v3/b/67b9daa4e41b4d34e498250d'
export const rutaViajes = 'https://api.jsonbin.io/v3/b/67bb3111acd3cb34a8edb1cd'


// Permite obtener informacion pasando llave maestra e id
export async function getJson(url, masterKey) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Master-Key": masterKey
            }
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