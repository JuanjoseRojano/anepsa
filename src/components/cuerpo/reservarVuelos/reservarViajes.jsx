import { useState, useEffect } from 'react'
import EtiquetaDeViaje from './etiquetaDeViaje'
import MenuDeFiltrosVuelos from '../../filtros/menuDeFiltrosVuelos'
import CarouselSlider from '../../carouselSlider'

function ReservarViajes(props) {


    const [opcionesDeVuelos, setOpcionesDeVuelo] = useState(null)
    const [renderizarProductos, setRenderizarProductos] = useState(null)
    const [tipoDeFiltro, setTipoDeFiltro] = useState({
        destino: "",
        salida: "",
        numeroDeAsientosRestantes: "",
        min: "",
        max: "",
    })

    function cambiarTipoDeFiltroFunction(tipoDeFiltro, input) {

        setTipoDeFiltro(prev => ({
            ...prev,
            [tipoDeFiltro]: input
        }))
    }

    function cambiar2TiposDeFiltrosFunction(tipoDeFiltro1, input1, tipoDeFiltro2, input2) {

        setTipoDeFiltro(prev => ({
            ...prev,
            [tipoDeFiltro1]: input1,
            [tipoDeFiltro2]: input2
        }))
    }


    useEffect(() => {
        //NOTA PERSONAL al estar escritos en formato JSON es posible realizar comparacion de si son 
        // iguales o diferentes de manera que al ser ambos arrays, unicamente pueden ser iguales si
        // apuntasen al mismo espacio de memoria
        if (opcionesDeVuelos === null || JSON.stringify(opcionesDeVuelos) === JSON.stringify(props.viajes) && tipoDeFiltro.numeroDeAsientosRestantes === "") {

            const mezclarVuelos = viajes => viajes.slice().sort(() => Math.random() - 0.5)
            const vuelosMezclados = mezclarVuelos(props.viajes)
            setRenderizarProductos(<div className="flex justify-center items-center p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4  justify-center p-3">
                    {vuelosMezclados.map((element) => (
                        <EtiquetaDeViaje element={element} usuarios={props.usuarios} setUsuarios={props.setUsuarios} usuarioConectado={props.usuarioConectado} setUsuarioConectado={props.setUsuarioConectado} setVueloAComprar={props.setVueloAComprar} />
                    ))}
                </div>
            </div>
            )
        }
        else if (opcionesDeVuelos === "No encontrado") {

            setRenderizarProductos(<div className="flex justify-center items-center p-3">

                <h1>Vuelos no encontrados</h1>
            </div>)
        }
        else {
            setRenderizarProductos(<div className="flex justify-center items-center p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4  justify-center p-3">
                    {opcionesDeVuelos
                        .filter(element => element.numeroDeAsientosRestantes > 0).map((element) => element.numeroDeAsientosRestantes !== 0 ? (
                            <EtiquetaDeViaje element={element} usuarios={props.usuarios} setUsuarios={props.setUsuarios} usuarioConectado={props.usuarioConectado} setUsuarioConectado={props.setUsuarioConectado} setVueloAComprar={props.setVueloAComprar} />
                        ) : null)}
                </div>
            </div>)
        }

    }, [opcionesDeVuelos])


    return (
        <>
            <div>
                <div className='w-full'>
                    <div id="carrousel" className={`h-40 w-max-100  grid place-items-center relative overflow-hidden m-10 my-30
before:content-['']
    before:absolute
    before:top-0
    before:left-0
    before:h-full
    before:w-20
    before:bg-gradient-to-r
    before:from-white
    before:to-transparent
    before:z-10

    after:content-['']
    after:absolute
    after:top-0
    after:right-0
    after:h-full
    after:w-20
    after:bg-gradient-to-l
    after:from-white
    after:to-transparent
    after:z-10

    perspective-100


                    `}>
                        <CarouselSlider
                            viajes={props.viajes} />
                    </div>

                    <div className='flex flex-col text-6xl items-center justify-center gap-10'><h2 className=''>Compra</h2> <h2>Viaja</h2><h2>Disfruta</h2> </div>

                    <MenuDeFiltrosVuelos
                        opcionesDeVuelos={opcionesDeVuelos}
                        setOpcionesDeVuelo={setOpcionesDeVuelo}
                        viajes={props.viajes}
                        tipoDeFiltro={tipoDeFiltro}
                        cambiarTipoDeFiltroFunction={cambiarTipoDeFiltroFunction}
                        cambiar2TiposDeFiltrosFunction={cambiar2TiposDeFiltrosFunction}
                    ></MenuDeFiltrosVuelos>

                </div>

                {renderizarProductos}
            </div>
        </>
    )
}

export default ReservarViajes
