import { useState, useEffect, useRef } from 'react'
import Slider from '@mui/material/Slider'
import { cambiarBillete, filtrosDeBusqueda } from '../../funcionalidades/obtenerAPI'
import Boton from '../Boton'

function FiltroDeBusquedaSlideBar(props) {
    const [valorMinViajes, setValorMinViajes] = useState(props.viajes.reduce((min, viaje) => viaje.precio < min ? viaje.precio : min, props.viajes[0].precio) - 10)
    const [valorMaxViajes, setValorMaxViajes] = useState(props.viajes.reduce((max, viaje) => viaje.precio > max ? viaje.precio : max, props.viajes[0].precio) + 10)

    const [placeHolderMax, setPlaceHolderMax] = useState("Max")
    const [estilosPlaceHolderMax, setEstilosPlaceHolderMax] = useState("placeholder:text-gray-500")
    const [placeHolderMin, setPlaceHolderMin] = useState("Min")
    const [estilosPlaceHolderMin, setEstilosPlaceHolderMin] = useState("placeholder:text-gray-500")

    const [activarODesactivarBotonInputPrecio, setActivarODesactivarBotonInputPrecio] = useState(true)

    const [valorSlider, setValorSlider] = useState([valorMinViajes, valorMaxViajes])
    const [listaFiltrada, setListaFiltrada] = useState(null)

    const controlRefMax = useRef(null)
    const controlRefMin = useRef(null)

    const [controlRefActualizarPorBoton, setControlRefActualizarPorBoton] = useState(false)
    const [antiAsincronia, setAntiAsincronia] = useState(0)


    useEffect(() => {
        console.log(valorSlider)
    }, [valorSlider])

    useEffect(() => {
        const valorLimiteMaximo = props.viajes.reduce((max, viaje) => viaje.precio > max ? viaje.precio : max, props.viajes[0].precio) + 10
        const valorLimiteMinimo = props.viajes.reduce((min, viaje) => viaje.precio < min ? viaje.precio : min, props.viajes[0].precio) - 10

        controlRefMax.current.value = ""
        controlRefMin.current.value = ""

        movimientoSlider([valorLimiteMinimo, valorLimiteMaximo], 2)


    }, [props.limpiar])


    function activarDesactivarBoton(controlRefMax, controlRefMin) {

        if (controlRefMax.current.value === "" || controlRefMin.current.value === "") {
            setActivarODesactivarBotonInputPrecio(true)
        }
        else {
            setActivarODesactivarBotonInputPrecio(false)
        }

    }


    function controlDelSliderMedianteInputs(controlRefMax, controlRefMin) {

        const valorMax = props.viajes.reduce((max, viaje) => viaje.precio > max ? viaje.precio : max, props.viajes[0].precio) + 10
        const valorMin = props.viajes.reduce((min, viaje) => viaje.precio < min ? viaje.precio : min, props.viajes[0].precio) - 10

        const valorMaxInput = controlRefMax.current.value
        const valorMinInput = controlRefMin.current.value

        const intervaloDe10Numeros = Number(controlRefMax.current.value) - Number(controlRefMin.current.value)

        let cambiar = true

        if (Number(valorMaxInput) > Number(valorMax) || Number(valorMaxInput) <= Number(valorMinInput) || intervaloDe10Numeros < 10) {
            setPlaceHolderMax("❌ Inválido")
            setEstilosPlaceHolderMax("placeholder:text-red-500")
            controlRefMax.current.value = ""
            cambiar = false
        }



        if (Number(valorMinInput) < Number(valorMin) || Number(valorMinInput) >= Number(valorMaxInput) || intervaloDe10Numeros < 10) {
            setPlaceHolderMin("❌ Inválido")
            setEstilosPlaceHolderMin("placeholder:text-red-500")
            controlRefMin.current.value = ""
            cambiar = false
        }

        if (cambiar) {
            setPlaceHolderMax("Max")
            setEstilosPlaceHolderMax("placeholder:text-grey-500")
            setPlaceHolderMin("Min")
            setEstilosPlaceHolderMin("placeholder:text-grey-500")
            movimientoSlider([controlRefMin.current.value, controlRefMax.current.value], 3)
        }
    }


    // Funcion aleatoria mejor que la que tenía y con mas margen de aleatoriedad
    // function shuffle(array) {
    //     const arr = array.slice()
    //     for (let i = arr.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [arr[i], arr[j]] = [arr[j], arr[i]];
    //     }

    //     return arr
    // }

    // UseEffect con la funcion shuffle en funcionamiento
    // useEffect(() => {

    //     const mezclados = shuffle(props.viajes)
    //     if (mezclados.length < 2) return

    //     let precio1Predeterminado = mezclados[0].precio
    //     let precio2Predeterminado = mezclados[1].precio

    //     if (precio1Predeterminado >= precio2Predeterminado) { [precio1Predeterminado, precio2Predeterminado] = [precio2Predeterminado, precio1Predeterminado] }

    //     setValorSlider([valorMinViajes, valorMaxViajes])
    // }, [])


    function valuetext(value) {
        return value
    }

    const movimientoSlider = (newValue, activeThumb) => {


        switch (activeThumb) {


            case 0:
                const nuevoMin = Math.min(newValue[0], Number(valorSlider[1]) - 10)
                setValorSlider([nuevoMin, valorSlider[1]])
                props.cambiarTipoDeFiltroFunction("min", nuevoMin)

                filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada, props.datoAfiltrar, "min", setAntiAsincronia)
                break

            case 1:
                const nuevoMax = Math.max(newValue[1], Number(valorSlider[0]) + 10)
                setValorSlider([valorSlider[0], nuevoMax])
                props.cambiarTipoDeFiltroFunction("max", nuevoMax)

                filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada,
                    props.datoAfiltrar,
                    "max", setAntiAsincronia)
                break

            case 2:
                setValorSlider([newValue[0], newValue[1]])

                break

            case 3:
                setValorSlider([newValue[0], newValue[1]])


                props.cambiarTipoDeFiltroFunction("min", newValue[0])
                props.cambiarTipoDeFiltroFunction("max", newValue[1])

                setControlRefActualizarPorBoton(true)

                break
        }
    }

    useEffect(() => {

        if (controlRefActualizarPorBoton === true) {

            filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada,
                props.datoAfiltrar,
                "min", setAntiAsincronia)
            filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada,
                props.datoAfiltrar,
                "max", setAntiAsincronia)

        }
        setControlRefActualizarPorBoton(false)

    }, [props.tipoDeFiltro])

    useEffect(() => {

        if (props.tipoDeFiltro.min === "") {
            props.cambiarTipoDeFiltroFunction("min", props.viajes.reduce((min, viaje) => viaje.precio < min ? viaje.precio : min, props.viajes[0].precio), "min")
        }
        if (props.tipoDeFiltro.max === "") {
            props.cambiarTipoDeFiltroFunction("max", props.viajes.reduce((max, viaje) => viaje.precio > max ? viaje.precio : max, props.viajes[0].precio), "max")
        }
    }, [])

    return (
        <div className='max-w-full m-7'>
            <h1 className="font-bold text-2xl my-3 relative text-center py-2 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[10px] before:bg-gradient-to-t before:from-transparent before:to-blue-500 before:rounded-b-full"
            >{props.titulo}</h1>

            <div className='flex justify-baseline space-x-3'>

                <input
                    type="number"
                    ref={controlRefMin}
                    placeholder={placeHolderMin}
                    min={(props.viajes.reduce((min, viaje) => viaje.precio < min ? viaje.precio : min, props.viajes[0].precio) - 10)}
                    onChange={(e) => {

                        activarDesactivarBoton(controlRefMax, controlRefMin)
                    }}
                    className={`w-full p-2 border rounded ${estilosPlaceHolderMin}`}
                />

                <input
                    type="number"
                    ref={controlRefMax}
                    placeholder={placeHolderMax}
                    min={(props.viajes.reduce((min, viaje) => viaje.precio < min ? viaje.precio : min, props.viajes[0].precio) - 10) + 10}
                    onChange={(e) => {
                        activarDesactivarBoton(controlRefMax, controlRefMin)
                    }}
                    className={`w-full p-2 border rounded ${estilosPlaceHolderMax}`}
                />

                <Boton
                    funcionBoton={() => controlDelSliderMedianteInputs(controlRefMax, controlRefMin)}
                    nombreBoton="Cambiar precio"
                    disabled={activarODesactivarBotonInputPrecio}
                >
                </Boton>
            </div>
            <div className='my-7 flex flex-col'>

                <Slider
                    getAriaLabel={() => 'Rango de precios'}
                    value={valorSlider}
                    onChange={(e, newValue, activeThumb) => {

                        movimientoSlider(newValue, activeThumb)
                        filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada, "precio")
                    }}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    min={valorMinViajes}
                    max={valorMaxViajes}
                />

            </div>
        </div>
    )


}

export default FiltroDeBusquedaSlideBar