import { useState, useEffect, useRef } from 'react'
import useManejoBilletes from '../../../hooks/useManejoBilletes'
import usePrecioDeLosBilletes from '../../../hooks/usePrecioDeLosBilletes'
import SelectViajes from '../../selectViajes'
import Boton from '../../Boton'
import DatePickerCalendario from '../reservarVuelos/datePickerCalendario'
import Checkbox from '@mui/material/Checkbox'
import Cargando from '../../cargando'
import { getMongoDB, putMongoDB, deleteMongoDB } from '../../../funcionalidades/obtenerAPI'



function TarjetasMisViajesEditable(props) {

    let vueloDelViaje = props.viajes.find((viaje) => (viaje.destino === props.element.destino))


    const diseñoBotonesPequeños = "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2"

    const [nuevaSalida, setNuevaSalida] = useState(props.element.salida)
    const [nuevoHorarioDeVuelo, setNuevoHorarioDeVuelo] = useState(props.element.horarioDeVuelo)
    const [checked, setChecked] = useState(props.element._idaYVuelta)
    const [mostrarCargandoDatos, setMostrarCargandoDatos] = useState(false)


    const { precioDeLosBilletes, añadirIVA } = usePrecioDeLosBilletes(parseInt(props.element.precioTotal))
    const { manejoBilletes, sumar, resta } = useManejoBilletes(parseInt(props.element.numeroDeBilletes), parseInt(vueloDelViaje.numeroDeAsientosRestantes))

    const [fechaDelVuelo, setFechaDelVuelo] = useState(null)

    const fechaInicialDelVuelo = new Date(props.element.fechaDeVuelo)
    const fechaMaximaDelVuelo = new Date()
    const fechaMinimaDelVuelo = new Date()

    fechaMaximaDelVuelo.setDate(fechaMaximaDelVuelo.getDate() + 12)
    fechaMaximaDelVuelo.setMonth(fechaMaximaDelVuelo.getMonth() + 3)

    fechaMinimaDelVuelo.setDate(fechaMinimaDelVuelo.getDate() + 3)

    const nombreSalida = useRef()
    const horaDeSalida = useRef()

    const estiloBoton = "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mt-4"

    useEffect(() => {
        añadirIVA(parseInt(manejoBilletes), parseInt(props.element.precioDelVuelo))
    }, [manejoBilletes])

    //manejo de checkbox de material MUI, no es un checkbox normal 
    const handleChange = (event) => {
        if (checked === true) {
        }
        else {
        }
        setChecked(event.target.checked)
    }



    //funcion para especificar que vuelo fue seleccionado mediante el select, este tiene de valor predeterminado
    //la salida previamente seleciconada por el usuario
    const selectViajeEditable = (e, setCambiarValor) => {
        setCambiarValor(e.target.value)
    }

    const fechaIdentica = (viajeDeUsuarioPrevios, fechaDelVuelo) => {
        const fechaDeViajeDeUsuarioPrevios = new Date(viajeDeUsuarioPrevios.fechaDeVuelo)

        return (fechaDeViajeDeUsuarioPrevios.getFullYear() === fechaDelVuelo.getFullYear() &&
            fechaDeViajeDeUsuarioPrevios.getMonth() === fechaDelVuelo.getMonth() &&
            fechaDeViajeDeUsuarioPrevios.getDate() === fechaDelVuelo.getDate())
    }



    //funcion para eliminar el billete y devolver los billetes al viaje antes de su completa eliminación
    async function eliminarBillete() {
        setMostrarCargandoDatos(
            <div className="fixed inset-0   flex items-center justify-center z-50">

                <Cargando
                    textoCargando={"Actualizando base de datos"} />
            </div>)

        const usuariosActuales = await getMongoDB("/Usuarios")
        const viajesActuales = await getMongoDB("/Viajes")

        const usuarioEncontrado = usuariosActuales.find(usuario =>
            usuario._id === props.usuarioConectado._id
        )
        const viajeEncontrado = viajesActuales.find(viaje =>
            viaje.destino === props.element.destino
        )


        if (viajeEncontrado) {
            await deleteMongoDB(`/Usuarios/${usuarioEncontrado._id}/viajes/${props.element._id}`)

            const numeroDeViajesDevueltos = { numeroDeAsientosRestantes: parseInt(viajeEncontrado.numeroDeAsientosRestantes) + parseInt(manejoBilletes) }

            await putMongoDB(`/Viajes/${viajeEncontrado._id}`, numeroDeViajesDevueltos)

            props.setUsuarios(await getMongoDB("/Usuarios"))

            props.setViajes(await getMongoDB("/Viajes"))

            const usuarioConectadoTrasComprar = await getMongoDB("/Usuarios")
            props.setUsuarioConectado(usuarioConectadoTrasComprar.find(usuario =>
                usuario._id === props.usuarioConectado._id
            ))
        }

        const timer = setTimeout(() => {
            setMostrarCargandoDatos(null)
        }, 2000)
        return () => clearTimeout(timer)
    }


    //comprueba la información cambiada por el usuario, en caso de ser diferente y no coincidir con otros viajes
    //los edita refrescando ademas la información
    async function comprobacionDeActualizacion() {

        if (manejoBilletes != 0) {
            setMostrarCargandoDatos(
                <div className="fixed inset-0   flex items-center justify-center z-50">

                    <Cargando
                        textoCargando={"Actualizando base de datos"} />
                </div>)
            let enviarFormulario = true
            const usuariosActuales = await getMongoDB("/Usuarios")
            const viajesActuales = await getMongoDB("/Viajes")

            const usuarioEncontrado = usuariosActuales.find(usuario =>
                usuario._id === props.usuarioConectado._id
            )
            const viajeEncontrado = viajesActuales.find(viaje =>
                viaje.destino === props.element.destino
            )

            if (manejoBilletes === 0) {
                props.setError("Falta añadir billetes ")
                enviarFormulario = false
            }


            if (viajeEncontrado.numeroDeAsientosRestantes < manejoBilletes || viajeEncontrado.numeroDeAsientosRestantes === 0) {
                enviarFormulario = false
                props.setError("Plazas del avión insuficientes ")
            }




            if (usuarioEncontrado.viajes.length != 0) {

                const vueloRepetido = usuarioEncontrado.viajes.some(viaje =>
                    viaje.destino === props.element.destino &&
                    viaje.salida === nombreSalida.current.value &&
                    viaje.horarioDeVuelo === horaDeSalida.current.value &&
                    viaje._id != props.element._id &&
                    fechaIdentica(viaje, fechaDelVuelo) === true
                )

                if (vueloRepetido) {
                    props.setError("Vuelo ya existente")
                    enviarFormulario = false
                }
            }

            if (enviarFormulario != false) {

                const vueloActualizado = {
                    salida: nombreSalida.current.value,
                    horarioDeVuelo: horaDeSalida.current.value,
                    fechaDeVuelo: fechaDelVuelo.toISOString(),
                    precioDelVueloFinal: precioDeLosBilletes,
                    numeroDeBilletes: manejoBilletes,
                    idaYVuelta: checked
                }
                //Este switch se encarga de decidir si se restan suman o se mantienen los billetes
                //a la hora de realizar cambios en la base de datos
                switch (true) {
                    case (props.element.numeroDeBilletes < manejoBilletes):
                        await putMongoDB(`/Viajes/${viajeEncontrado._id}`, { numeroDeAsientosRestantes: viajeEncontrado.numeroDeAsientosRestantes - (manejoBilletes - props.element.numeroDeBilletes) })
                        break
                    case (props.element.numeroDeBilletes > manejoBilletes):
                        await putMongoDB(`/Viajes/${viajeEncontrado._id}`, { numeroDeAsientosRestantes: viajeEncontrado.numeroDeAsientosRestantes + (props.element.numeroDeBilletes - manejoBilletes) })

                        break
                    case (props.element.numeroDeBilletes === manejoBilletes):
                        break
                    default: break
                }

                await putMongoDB(`/Usuarios/${usuarioEncontrado._id}/viajes/${props.element._id}`, vueloActualizado)

                props.setUsuarios(await getMongoDB("/Usuarios"))

                props.setViajes(await getMongoDB("/Viajes"))

                const usuarioConectadoTrasComprar = await getMongoDB("/Usuarios")
                props.setUsuarioConectado(usuarioConectadoTrasComprar.find(usuario =>
                    usuario._id === props.usuarioConectado._id
                ))

            }
            const timer = setTimeout(() => {
                setMostrarCargandoDatos(null)
            }, 2000)
            return () => clearTimeout(timer)
        } else {
            eliminarBillete()
        }

    }

    return <>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">
            <h1 className="tituloAzul text-center ¡ max-w-sm rounded-xl border border-blue-200 shadow-xl p-6 bg-blue-100 mb-6">{props.element.destino}</h1>

            <img
                src={props.element.imagen}
                alt={`Imagen de ${props.element.destino}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">
                <select
                    ref={nombreSalida}
                    required
                    value={nuevaSalida}
                    onChange={(e) => {
                        selectViajeEditable(e, setNuevaSalida)
                    }}
                    className="p-2 border border-gray-300 rounded-md text-lg w-full mt-4"
                >
                    <SelectViajes opciones={vueloDelViaje.salida} />
                </select>
                <select
                    ref={horaDeSalida}
                    required
                    value={nuevoHorarioDeVuelo}
                    onChange={(e) => {
                        selectViajeEditable(e, setNuevoHorarioDeVuelo)
                    }}
                    className="p-2 border border-gray-300 rounded-md text-lg w-full mt-4"
                >
                    <SelectViajes opciones={vueloDelViaje.horariosDeVuelo} />
                </select>
                <div className="mb-4 max-h-50 m-7">
                    <DatePickerCalendario
                        fecha={fechaDelVuelo}
                        setFecha={setFechaDelVuelo}
                        fechaInicial={fechaInicialDelVuelo}
                        fechaMaxima={fechaMaximaDelVuelo}
                        fechaMinima={fechaMinimaDelVuelo}
                        texto="Fecha de salida"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2 mt-4 bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4">
                <Boton nombreBoton="-" funcionBoton={resta} className={diseñoBotonesPequeños} />
                <p className="text-gray-600">Número de billetes: {manejoBilletes}</p>
                <Boton nombreBoton="+" funcionBoton={sumar} className={diseñoBotonesPequeños} />
            </div>
            <div className="bg-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg w-full  mb-4 ">
                <div className="flex items-center space-x-2">
                    <p>Ida y vuelta</p>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </div>
                <p className="text-gray-600 mt-2">Precio original: {props.element.precioDelVuelo} </p>
                <p className="text-gray-600 mt-1">Precio final:                                                     {precioDeLosBilletes * (checked ? 2 : 1)}
                    €</p>
            </div>
            <div className="mt-4 space-x-2 flex flex-cols">
                <Boton nombreBoton="Actualizar billete" className={estiloBoton} funcionBoton={(e) => {
                    e.preventDefault()
                    comprobacionDeActualizacion()
                }} />
                <Boton nombreBoton="Eliminar billete" className={estiloBoton} funcionBoton={(e) => {
                    e.preventDefault()
                    eliminarBillete(
                        e,
                        props.destino,
                        props.salida,
                        props.horariosDeVuelo,
                        props.diasDeLaSemana,
                        props.usuarioConectado,
                        props.setUsuarioConectado,
                        props.usuarios,
                        props.setUsuarios
                    )
                }} />
            </div>
        </div>
        {mostrarCargandoDatos}

    </>


}

export default TarjetasMisViajesEditable