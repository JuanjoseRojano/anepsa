import { useState, useEffect } from 'react'
import Boton from '../../components/Boton'
import { googleLogout } from '@react-oauth/google'
import { deleteMongoDB, getMongoDB } from '../../funcionalidades/obtenerAPI'
import { format } from 'date-fns'


function MostrarUsuario(props) {
    const [textoTituloSuperior, setTextoTituloSuperior] = useState(null)

    const [viajesEncontrados, setViajesEncontrados] = useState(null)
    const [emailVerificado, setEmailVerificado] = useState(null)

    const [altoDinamico, setAltoDinamico] = useState(window.innerHeight - 150)


    window.addEventListener('resize', () => {
        setAltoDinamico(window.innerHeight - 150)
    })

    const actualizar = async () => {
        const usuariosActualizados = await getMongoDB("/Usuarios")
        props.setUsuarios(usuariosActualizados)
    }

    function eliminarUnUsuario(e) {
        e.preventDefault()
        deleteMongoDB(`/Usuarios/eliminar/${props.usuarioConectado._id}`)
        actualizar()
        cerrarSesion(e)
    }

    function cerrarSesion(e) {
        e.preventDefault()
        googleLogout()
        props.setUsuarioConectado(null)
        props.setContenidoTokenUser(null)
        localStorage.clear();
        sessionStorage.clear();
    }


    useEffect(() => {
        if (props.usuarioConectado.viajes.length === 0) {
            setTextoTituloSuperior("Parece que todavía no tiene viajes")
            setViajesEncontrados(<><div className='h'><img
                src="https://st.depositphotos.com/1107016/1239/v/450/depositphotos_12390723-stock-illustration-airplane-travel.jpg"
                className="w-full h-full "
            /></div></>
            )

        } else {
            setTextoTituloSuperior("Que disfrute de sus viajes 🎉🎉🎉")

            setViajesEncontrados(<div>
                {props.usuarioConectado.viajes.map((element) => {
                    const diaDelVuelo = format(new Date(element.fechaDeVuelo), 'dd/MM/yyyy')
                    // const diaDelVuelo = new Date(element.fechaDeVuelo)
                    // const diaActual = new Date()

                    // if (isSameDay(diaDelVuelo, diaActual)) {
                    //     setFechaViaje()

                    // }
                    let idaYVuelta
                    if (element.idaYVuelta === true) {
                        idaYVuelta = "Ida y vuelta 🔄"
                    }
                    else {
                        idaYVuelta = "Solo ida ➡️"

                    }


                    return (<>

                        <div className='m-1.5 my-7 gap-7'>
                            <h1 className="font-bold text-2xl my-3 relative text-center py-2 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[10px] before:bg-gradient-to-t before:from-transparent before:to-blue-500 before:rounded-b-full"> {element.destino}</h1>
                            <img src={element.imagen} alt={element.destino} className="w-full max-h-70 object-cover rounded-md mb-4" />
                            <div className=''>
                                <div className="flex flex-col md:flex-row  items-center space-x-2 space-y-2   mt-4 bg-stone-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4">
                                    <span className={estilosSpan}>Salida: {element.salida}</span>
                                    <span className={estilosSpan}>Hora de llegada: {element.horarioDeVuelo}</span>
                                    <span className={estilosSpan}>Dia viaje: {diaDelVuelo}</span>
                                </div>

                                <div className="flex flex-col md:flex-row items-center space-x-2 space-y-2 mt-4 bg-stone-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4">
                                    <span className={estilosSpan}>Número de billetes: {element.numeroDeBilletes}</span>
                                    <span className={estilosSpan}>Precio: {element.precioDelVueloFinal} €</span>
                                    <span className={estilosSpan}>{idaYVuelta}</span>
                                </div>
                            </div>
                        </div>
                    </>)
                })}
            </div>)
        }
    }, [])

    useEffect(() => {

        if (props.contenidoTokenUser.payload.email_verified) {
            setEmailVerificado("✔️")
        }
        else {
            setEmailVerificado("❌")

        }
    }, [])

    const estilosSpan = "ml-2 my-4 text-gray-700 font-medium bg-blue-100 border-l-4 border-blue-500 px-2 py-1 rounded-lg"

    return (<>
        {/* <div className='p-2 md:flex gap-16 m-10'> */}
        <div className="flex flex-col-reverse md:flex-row gap-6 p-4 ">
            <div className='md:w-2/3 my-7 '>
                <h1 className="text-xl md:text-2xl font-bold text-blue-600 bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-md my-2">
                    {textoTituloSuperior}
                </h1>
                <div className="w-full h-full">

                    {viajesEncontrados}
                </div>
            </div>

            {/* <div className="w-full md:w-1/3 md:sticky md:top-30 self-start"> */}
            <div className="w-full md:w-1/3 md:order-last md:sticky md:top-30 self-start">
                <div className={`border rounded-lg shadow-md bg-white p-4 overflow-auto `}
                    style={{ maxHeight: `${altoDinamico}px` }}
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-center">
                            <img
                                src={props.contenidoTokenUser.payload.picture}
                                alt={props.contenidoTokenUser.payload.name}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        </div>
                        <span className={estilosSpan}>
                            Nombre de usuario: {props.contenidoTokenUser.payload.name}
                        </span>
                        <span className={estilosSpan}>
                            Dirección email: {props.contenidoTokenUser.payload.email}
                        </span>
                        <span className={estilosSpan}>
                            Cuenta verificada: <span>{emailVerificado}</span>
                        </span>
                        <span className={estilosSpan}>
                            Número de viajes activos: {props.usuarioConectado.viajes.length}
                        </span>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                            <Boton
                                funcionBoton={eliminarUnUsuario}
                                nombreBoton="Eliminar usuario"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all w-40"
                            />
                            <Boton
                                funcionBoton={cerrarSesion}
                                nombreBoton="Cerrar sesión"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all w-40"
                            />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </>)
}

export default MostrarUsuario

