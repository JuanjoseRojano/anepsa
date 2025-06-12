import { useState, useEffect, useRef } from 'react'
import Slider from '@mui/material/Slider'
import { filtrosDeBusqueda } from '../../funcionalidades/obtenerAPI'
import Boton from '../Boton'

function FiltroDeBusquedaSlideBar(props) {
    const [valorMinViajes, setValorMinViajes] = useState(props.viajes.reduce((min, viaje) => viaje.precio < min ? viaje.precio : min, props.viajes[0].precio) - 10)
    const [valorMaxViajes, setValorMaxViajes] = useState(props.viajes.reduce((max, viaje) => viaje.precio > max ? viaje.precio : max, props.viajes[0].precio) + 10)

    const [placeHolderMax, setPlaceHolderMax] = useState("Max")
    const [estilosPlaceHolderMax, setEstilosPlaceHolderMax] = useState("placeholder:text-gray-500")
    const [placeHolderMin, setPlaceHolderMin] = useState("Min")
    const [estilosPlaceHolderMin, setEstilosPlaceHolderMin] = useState("placeholder:text-gray-500")

    const [activarODesactivarBotonInputPrecio, setActivarODesactivarBotonInputPrecio] = useState(true)

    //Esta variable de estado se re-renderiza para así cambiar ambas al mismo tiempo o apuntar en useeffect
    //a ambas variables de estado al mismo tiempo
    //tambien permite agregar numeros predeterminados al slider en el primer renderizado
    const [valorSlider, setValorSlider] = useState([valorMinViajes, valorMaxViajes])
    //est variable se encuentra para evitar fallos con el resto de filtros
    const [listaFiltrada, setListaFiltrada] = useState(null)

    const controlRefMax = useRef(null)
    const controlRefMin = useRef(null)

    const [controlRefActualizarPorBoton, setControlRefActualizarPorBoton] = useState(false)
    const [antiAsincronia, setAntiAsincronia] = useState(0)

    //UseEffect encargado de limpiar contenido el cual apunta a props.limpiar
    useEffect(() => {
        const valorLimiteMaximo = props.viajes.reduce((max, viaje) => viaje.precio > max ? viaje.precio : max, props.viajes[0].precio) + 10
        const valorLimiteMinimo = props.viajes.reduce((min, viaje) => viaje.precio < min ? viaje.precio : min, props.viajes[0].precio) - 10

        controlRefMax.current.value = ""
        controlRefMin.current.value = ""

        movimientoSlider([valorLimiteMinimo, valorLimiteMaximo], 2)


    }, [props.limpiar])

    //funcion pendiente de que falte o no información para habilitar o desabilitar boton de filtrar por precio
    function activarDesactivarBoton(controlRefMax, controlRefMin) {

        if (controlRefMax.current.value === "" || controlRefMin.current.value === "") {
            setActivarODesactivarBotonInputPrecio(true)
        }
        else {
            setActivarODesactivarBotonInputPrecio(false)
        }

    }

    //funcion para cambiar el slider en caso de que el usuario decida usar los inputs para filtrar por precio
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

    //Esta funcion evita bucles para mostrar información del precio y valores predeterminados
    function valuetext(value) {
        return value
    }

    //esta funcion permite gestionar los cambios del slider de precios
    const movimientoSlider = (newValue, activeThumb) => {


        switch (activeThumb) {

            //Case 0, se mueve el selector izquierdo
            case 0:
                const nuevoMin = Math.min(newValue[0], Number(valorSlider[1]) - 10)
                setValorSlider([nuevoMin, valorSlider[1]])
                props.cambiarTipoDeFiltroFunction("min", nuevoMin)

                filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada, props.datoAfiltrar, setAntiAsincronia)
                break
            //Case 1, se mueve el selector derecho
            case 1:
                const nuevoMax = Math.max(newValue[1], Number(valorSlider[0]) + 10)
                setValorSlider([valorSlider[0], nuevoMax])
                props.cambiarTipoDeFiltroFunction("max", nuevoMax)

                filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada,
                    props.datoAfiltrar,
                    setAntiAsincronia)
                break

            //Case 2 cambia ambos selectores devolviendo su estado original
            case 2:
                setValorSlider([newValue[0], newValue[1]])

                break

            //Case 3 cambia ambos selectores con la informacion de los inputs
            case 3:
                setValorSlider([newValue[0], newValue[1]])


                props.cambiarTipoDeFiltroFunction("min", newValue[0])
                props.cambiarTipoDeFiltroFunction("max", newValue[1])

                setControlRefActualizarPorBoton(true)

                break
        }
    }


    //Habilitar boton en caso de detactar informacion
    useEffect(() => {

        if (controlRefActualizarPorBoton === true) {

            filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada,
                props.datoAfiltrar,
                setAntiAsincronia)
            filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada,
                props.datoAfiltrar,
                setAntiAsincronia)

        }
        setControlRefActualizarPorBoton(false)

    }, [props.tipoDeFiltro])



    //UseEffect para inicializar precios al detectarlos vacios, esto evita problemas de valores nulos
    //y p`roblemas al re-renderizar y filtrar campos nullos o undefine
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

