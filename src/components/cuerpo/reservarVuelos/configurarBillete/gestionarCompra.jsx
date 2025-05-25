import { useState, useRef, useEffect } from 'react'
import { postMongoDB, getMongoDB, putMongoDB } from '../../../../funcionalidades/obtenerAPI';
import SelectViajes from '../../../selectViajes'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Boton from '../../../Boton'
import DatepickerCalendario from '../datePickerCalendario'
import Cargando from '../../../cargando'

import useManejoBilletes from '../../../../hooks/useManejoBilletes'
import usePrecioDeLosBilletes from '../../../../hooks/usePrecioDeLosBilletes'
import Checkbox from '@mui/material/Checkbox'

import fondoFormulario from "../../../../media/fondoFormulario.jpg"
import paypal from "../../../../media/paypal.png"
import visa from "../../../../media/visa.png"
import imagine from "../../../../media/imagine.png"

function GestionarCompra(props) {

    if (props.vueloAComprar === null) {
        return (<Navigate to='../ReservarViajes'></Navigate>)

    }
    else if (props.usuarioConectado === null) {
        props.setError("Debes iniciar sesion")
        return (<Navigate to='../Sesion'></Navigate>)

    }
    else {

        const nombreResponsable = useRef(null)
        const apellidoResponsableRef = useRef(null)
        const DNIResponsable = useRef(null)

        const nombreDestino = useRef(null)
        const nombreSalida = useRef(null)
        const imagenDestino = useRef(null)
        const horaDeSalida = useRef(null)

        const [checked, setChecked] = useState(false)
        const [checkedMetodoDePago, setCheckedMetodoDePago] = useState([false, false, false])


        const precioDeBilleteFinal = useRef(null)

        const precioOriginal = useRef(null)

        //Eliminar
        // const [errorDeFormulario, setErrorDeFormulario] = useState(null)
        const { precioDeLosBilletes, añadirIVA } = usePrecioDeLosBilletes()
        const { manejoBilletes, numeroDeAsientosRestantes, sumar, resta } = useManejoBilletes(0, props.vueloAComprar.numeroDeAsientosRestantes)

        // const classNameError = useClassNameError(errorDeFormulario)
        const diseñoBotonesPequeños = "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2 "

        const [mostrarCargandoDatos, setMostrarCargandoDatos] = useState(false);

        //Fechas para reservar vuelo
        const [fechaDelVuelo, setFechaDelVuelo] = useState(null)

        const fechaInicialDelVuelo = new Date()
        const fechaMaximaDelVuelo = new Date()
        const fechaMinimaDelVuelo = new Date()

        fechaMaximaDelVuelo.setDate(fechaMaximaDelVuelo.getDate() + 12)
        fechaMaximaDelVuelo.setMonth(fechaMaximaDelVuelo.getMonth() + 3)

        fechaMinimaDelVuelo.setDate(fechaMinimaDelVuelo.getDate() + 3)

        fechaInicialDelVuelo.setDate(fechaInicialDelVuelo.getDate() + 3)


        //Fechas para controlar edad
        const [fechaNac, setFechaNac] = useState(null)

        const fechaInicialNac = new Date()
        const fechaMaximaNac = new Date()
        const fechaMinimaNac = new Date()

        fechaMaximaNac.setFullYear(fechaMaximaNac.getFullYear() - 16)

        fechaMinimaNac.setFullYear(fechaMinimaNac.getFullYear() - 116)

        fechaInicialNac.setFullYear(fechaInicialNac.getFullYear() - 18)

        const salirDeCompra = useNavigate()

        function calcularNumeroDNI(DNI) {

            let resultadoDNI = DNI % 23;

            let arrayNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

            const arrayDNI = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
            for (let cont = 0; cont < arrayNumeros.length; cont++) {
                if (resultadoDNI == arrayNumeros[cont]) {
                    return DNI + arrayDNI[cont]
                }
            }
        }

        const fechaIdentica = (viajeDeUsuarioPrevios, fechaDelVuelo) => {
            const fechaDeViajeDeUsuarioPrevios = new Date(viajeDeUsuarioPrevios.fechaDeVuelo)




            return (fechaDeViajeDeUsuarioPrevios.getFullYear() === fechaDelVuelo.getFullYear() &&
                fechaDeViajeDeUsuarioPrevios.getMonth() === fechaDelVuelo.getMonth() &&
                fechaDeViajeDeUsuarioPrevios.getDate() === fechaDelVuelo.getDate())

        }



        async function comprobacionDeEnvioFormularioDeCompra() {

            setMostrarCargandoDatos(<div className="sticky inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-[40]">
                <Cargando
                    textoCargando={"Actualizando base de datos"} />
            </div>)

            let enviarFormulario = true

            const usuariosActuales = await getMongoDB("/Usuarios");
            const viajesActuales = await getMongoDB("/Viajes");

            const usuarioEncontrado = usuariosActuales.find(usuario =>
                usuario._id === props.usuarioConectado._id
            )
            const viajeEncontrado = viajesActuales.find(viaje =>
                viaje._id === props.vueloAComprar._id
            )

            if (manejoBilletes === 0) {
                props.setError("Falta añadir billetes ")
                enviarFormulario = false
            }

            if (DNIResponsable.current.value === calcularNumeroDNI(parseInt(DNIResponsable.current.value.slice(0, -1)))) {
            }
            else {
                props.setError("DNI inválido")
                enviarFormulario = false
            }

            if (checkedMetodoDePago[0] === false && checkedMetodoDePago[1] === false && checkedMetodoDePago[2] === false) {
                props.setError("Falta el método de pago ")
                enviarFormulario = false
            }

            if (viajeEncontrado.numeroDeAsientosRestantes < manejoBilletes || viajeEncontrado.numeroDeAsientosRestantes === 0) {
                enviarFormulario = false
                props.setError("Plazas del avión insuficientes ")

            }




            if (usuarioEncontrado.viajes.length != 0) {

                const vueloRepetido = usuarioEncontrado.viajes.some(viaje =>
                    viaje.destino === nombreDestino.current.textContent &&
                    viaje.salida === nombreSalida.current.value &&
                    viaje.horarioDeVuelo === horaDeSalida.current.value &&
                    fechaIdentica(viaje, fechaDelVuelo) === true
                )

                if (vueloRepetido) {
                    props.setError("Vuelo ya existente")
                    enviarFormulario = false
                }
            }

            if (enviarFormulario != false) {

                const vueloParaAñadir = {
                    responsable: [{
                        nombre: nombreResponsable.current.value,
                        apellido: apellidoResponsableRef.current.value,
                        fechaNac: fechaNac.toISOString(),
                        DNIResponsable: DNIResponsable.current.value,
                    }],
                    destino: nombreDestino.current.textContent,
                    imagen: [imagenDestino.current.src],
                    salida: nombreSalida.current.value,
                    horarioDeVuelo: horaDeSalida.current.value,
                    fechaDeVuelo: fechaDelVuelo.toISOString(),
                    precioDelVuelo: precioOriginal.current.textContent,
                    precioDelVueloFinal: precioDeLosBilletes,
                    numeroDeBilletes: manejoBilletes,
                    idaYVuelta: checked
                }

                await postMongoDB(`/Usuarios/add/${props.usuarioConectado._id}/viajes`, vueloParaAñadir)
                await putMongoDB(`/Viajes/${props.vueloAComprar._id}`, { numeroDeAsientosRestantes: viajeEncontrado.numeroDeAsientosRestantes - manejoBilletes })

                props.setUsuarios(await getMongoDB("/Usuarios"))

                props.setViajes(await getMongoDB("/Viajes"))

                const usuarioConectadoTrasComprar = await getMongoDB("/Usuarios")
                props.setUsuarioConectado(usuarioConectadoTrasComprar.find(usuario =>
                    usuario._id === props.usuarioConectado._id
                ))

            }
            const timer = setTimeout(() => {
                setMostrarCargandoDatos(null)
                salirDeCompra('../ReservarViajes')
            }, 3000)
            //limpiar timeout por si acaso
            return () => clearTimeout(timer)
        }

        const handleChange = (event) => {
            if (checked === true) {
            }
            else {

            }
            setChecked(event.target.checked)
        }

        const handleChangeMetodoDePago = (opcion) => {

            switch (opcion) {
                case 1: setCheckedMetodoDePago([true, false, false])
                    break
                case 2: setCheckedMetodoDePago([false, true, false])
                    break
                case 3: setCheckedMetodoDePago([false, false, true])
                    break
            }
        }

        useEffect(() => {
            añadirIVA(manejoBilletes, props.vueloAComprar.precio)
        }, [manejoBilletes])

        return <>
            <div className={` bg-cover bg-center rounded-xl shadow-lg p-8 m-7`}
                style={{ backgroundImage: `url(${fondoFormulario})` }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    comprobacionDeEnvioFormularioDeCompra()
                }}
                    className='m-7 relative'>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col md:basis-2/3 gap-6">
                            <div className="bg-blue-50 rounded-xl border border-blue-200  p-4  shadow-md">
                                <h1 className="text-xl font-semibold mb-4">Datos del usuario</h1>

                                <label className="block mb-2 font-medium">Nombre del responsable</label>
                                <input
                                    type="text"
                                    ref={nombreResponsable}
                                    pattern="[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+"
                                    placeholder="Nombre"
                                    minLength={4}
                                    required
                                    className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />

                                <label className="block mb-2 font-medium">Apellido del responsable</label>
                                <input
                                    type="text"
                                    ref={apellidoResponsableRef}
                                    pattern="[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+"
                                    placeholder="Apellidos"
                                    minLength={4}
                                    required
                                    className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />

                                <div className="mb-4 max-h-50">
                                    <DatepickerCalendario
                                        fecha={fechaNac}
                                        setFecha={setFechaNac}
                                        fechaInicial={fechaInicialNac}
                                        fechaMaxima={fechaMaximaNac}
                                        fechaMinima={fechaMinimaNac}
                                        texto="Fecha de nacimiento"
                                    />
                                </div>

                                <label className="block mb-2 font-medium">DNI del responsable</label>
                                <input
                                    type="text"
                                    ref={DNIResponsable}
                                    placeholder="DNI"
                                    minLength={9}
                                    maxLength={9}
                                    required
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            <div className='bg-blue-50 rounded-xl border border-blue-200  shadow-md text-white  items-center p-4'>
                                <h1 className="text-xl font-semibold mb-4 mask-y-from-4 text-black">Método de pago</h1>

                                <div className=" flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 justify-center gap-7 p-5 ">

                                    <div className='flex max-w-100 col-start-1 row-start-1'>
                                        <div>
                                            <img src={paypal} className='w-full h-full' />
                                        </div>
                                        <Checkbox
                                            checked={checkedMetodoDePago[0]}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleChangeMetodoDePago(1)
                                            }}
                                            inputProps={{ "aria-label": "controlled" }}
                                        />
                                    </div>
                                    <div className='flex max-w-100 col-start-3 row-start-1'>
                                        <div>
                                            <img src={imagine} className='w-full h-full' />
                                        </div>
                                        <Checkbox
                                            checked={checkedMetodoDePago[1]}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleChangeMetodoDePago(2)
                                            }}
                                            inputProps={{ "aria-label": "controlled" }}
                                        />
                                    </div>
                                    <div className='flex max-w-100 col-start-2 row-start-2'>
                                        <div>
                                            <img src={visa} className='w-full h-full' />
                                        </div>
                                        <Checkbox

                                            checked={checkedMetodoDePago[2]}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleChangeMetodoDePago(3)
                                            }}
                                            inputProps={{ "aria-label": "controlled" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:basis-1/3 bg-blue-50 rounded-xl border border-blue-200  p-6  shadow-lg max-w-full text-center z-20">
                            <h1 ref={nombreDestino} className="text-2xl font-semibold text-gray-800 mb-4">
                                {props.vueloAComprar.destino}
                            </h1>
                            <img
                                src={props.vueloAComprar.imagen}
                                alt={props.vueloAComprar.destino}
                                ref={imagenDestino}
                                className="w-full h-48 object-cover rounded-lg shadow-lg mb-4"
                            />

                            <div className="mb-4 max-h-50">
                                <DatepickerCalendario
                                    fecha={fechaDelVuelo}
                                    setFecha={setFechaDelVuelo}
                                    fechaInicial={fechaInicialDelVuelo}
                                    fechaMaxima={fechaMaximaDelVuelo}
                                    fechaMinima={fechaMinimaDelVuelo}
                                    texto="Fecha de salida"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div>
                                    <select
                                        ref={nombreSalida}
                                        className="p-2 border border-gray-300 rounded-md text-lg w-full"
                                        required
                                    >
                                        <SelectViajes opciones={props.vueloAComprar.salida} />
                                    </select>

                                    <select
                                        required
                                        ref={horaDeSalida}
                                        className="p-2 border border-gray-300 rounded-md text-lg w-full mt-4"
                                    >
                                        <SelectViajes opciones={props.vueloAComprar.horariosDeVuelo} />
                                    </select>
                                </div>

                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <p>Ida y vuelta</p>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ "aria-label": "controlled" }}
                                        />
                                    </div>

                                    <div className="flex flex-col bg-cyan-100 rounded-2xl p-4 w-full max-w-xs">
                                        <div className="flex justify-center items-center space-x-2 mb-4">
                                            <p className="text-lg font-medium text-gray-700">Precio billete:</p>
                                            <h1
                                                ref={precioOriginal}
                                                className="flex items-center p-1 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 rounded-xl"
                                            >
                                                {props.vueloAComprar.precio}
                                            </h1>
                                        </div>

                                        <div className="flex justify-center items-center space-x-2 mb-4">
                                            <Boton
                                                nombreBoton="-"
                                                funcionBoton={resta}
                                                type="button"
                                                className={diseñoBotonesPequeños}
                                            />
                                            <h1>{manejoBilletes}</h1>
                                            <Boton
                                                nombreBoton="+"
                                                funcionBoton={sumar}
                                                type="button"
                                                className={diseñoBotonesPequeños}
                                            />
                                        </div>

                                        <div className="flex justify-center items-center space-x-2 inset-shadow-cyan-500/50 shadow-xl p-2 rounded-xl">
                                            <p className="text-lg font-medium text-gray-700">Precio final:</p>
                                            <div className="flex items-center p-1 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 border-solid rounded-xl">
                                                <h1 ref={precioDeBilleteFinal} className="text-lg font-medium text-gray-700">
                                                    {precioDeLosBilletes * (checked ? 2 : 1) + "€"}
                                                </h1>
                                                <p className="ml-1">€</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md text-lg transition duration-300 w-full max-w-md mx-auto block"
                        type="submit"
                    >
                        Comprar billete
                    </button>



                </form>
            </div>
            {mostrarCargandoDatos}

        </>

    }



}

export default GestionarCompra

