import { useState, useEffect, useRef } from 'react'
import FiltroDeBusquedaInput from './filtroDeBusquedaInput'
import FiltroDeBusquedaSlideBar from './filtroDeBusquedaSlideBar'

function MenuDeFiltrosVuelos(props) {

    const [mostrarOcultarMenu, setMostrarOcultarMenu] = useState(false)
    const [limpiar, setLimpiar] = useState(0)
    const [altoDinamico, setAltoDinamico] = useState(window.innerHeight - 250)


    function mostrarMenuDeFiltrosDesplegable() {
        setMostrarOcultarMenu(prev => !prev)
    }

    function limpiarFiltrosYLista() {
        props.setOpcionesDeVuelo(null)
        //Uso numeros ya que al usar boleano puede no disparar correctamente el rerenderizado ya que react puede re-renderizar 2 veces
        setLimpiar(limpiar + 1)
    }




    window.addEventListener('resize', () => {
        setAltoDinamico(window.innerHeight - 250)
    })


    return <>
        <div className={` fixed z-25 top-40 left-0 w-full max-w-100  space-x-7  space-y-7 overflow-y-autos`}>

            <button
                onClick={(e) => { mostrarMenuDeFiltrosDesplegable() }}
                class="w-[110px] h-[40px] flex items-center justify-start gap-[10px] bg-blue-500 hover:bg-blue-600 rounded-full text-neutral-900 font-semibold relative cursor-pointer transition duration-500 shadow-[5px_5px_10px_rgba(0,0,0,0.116)] pl-2 active:scale-95 group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-[25px] transition-transform duration-[1500ms] group-hover:rotate-[250deg]">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 16l2 -6l6 -2l-2 6l-6 2" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                </svg>
                <span className='m-2'>Filtros</span>
            </button>

            <div
                style={{ maxHeight: `${altoDinamico}px` }}

                className={` transition-all   ease-out  ${mostrarOcultarMenu ? "fixed z-22 opacity-100 translate-x-0" : "fixed z-18 opacity-0 -translate-x-9/12  duration-200"}  overflow-auto  space-y-7  backdrop-blur-sm rounded-md border-r-4 border-r-gray-800`}>

                <button
                    onClick={(e) => {
                        limpiarFiltrosYLista()
                    }}
                    class="relative w-[110px] h-[40px]cursor-pointer flex items-center justify-start gap-2 bg-blue-600  text-white px-6 py-2 rounded-full border border-blue-600 overflow-hidden group transition-all duration-300 m-7">
                    <span class="button__text text-sm font-semibold transition-all duration-300 transform translate-x-[2px] group-hover:text-transparent">
                        Reiniciar
                    </span>
                    <span class="button__icon absolute flex items-center justify-center w-[25px] h-full bg-blue-500 transform translate-x-[60px] transition-all duration-300 group-hover:-translate-x-1/2 group-hover:w-[50px]">
                        <svg class="w-6 h-6 text-white" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                                class="stroke-white stroke-2"
                            ></path>
                            <line
                                class="stroke-white stroke-2"
                                x1="80"
                                x2="432"
                                y1="112"
                                y2="112"
                            ></line>
                            <path
                                d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                                class="stroke-white stroke-2"
                            ></path>
                            <line
                                class="stroke-white stroke-2"
                                x1="256"
                                x2="256"
                                y1="176"
                                y2="400"
                            ></line>
                            <line
                                class="stroke-white stroke-2"
                                x1="184"
                                x2="192"
                                y1="176"
                                y2="400"
                            ></line>
                            <line
                                class="stroke-white stroke-2"
                                x1="328"
                                x2="320"
                                y1="176"
                                y2="400"
                            ></line>
                        </svg>
                    </span>
                </button>
                <FiltroDeBusquedaInput
                    opcionesDeVuelos={props.opcionesDeVuelos}
                    setOpcionesDeVuelo={props.setOpcionesDeVuelo}
                    cambiarTipoDeFiltroFunction={props.cambiarTipoDeFiltroFunction}
                    tipoDeFiltro={props.tipoDeFiltro}
                    datoAFiltrar="destino"
                    viajes={props.viajes}
                    titulo={"Destino"}
                    limpiar={limpiar}
                    tipoDeInput={"text"}
                ></FiltroDeBusquedaInput>

                <FiltroDeBusquedaInput
                    opcionesDeVuelos={props.opcionesDeVuelos}
                    setOpcionesDeVuelo={props.setOpcionesDeVuelo}
                    cambiarTipoDeFiltroFunction={props.cambiarTipoDeFiltroFunction}
                    tipoDeFiltro={props.tipoDeFiltro}
                    datoAFiltrar="salida"
                    viajes={props.viajes}
                    titulo={"Salida"}
                    limpiar={limpiar}
                    tipoDeInput={"text"}

                ></FiltroDeBusquedaInput>

                <FiltroDeBusquedaInput
                    opcionesDeVuelos={props.opcionesDeVuelos}
                    setOpcionesDeVuelo={props.setOpcionesDeVuelo}
                    cambiarTipoDeFiltroFunction={props.cambiarTipoDeFiltroFunction}
                    tipoDeFiltro={props.tipoDeFiltro}
                    datoAFiltrar="numeroDeAsientosRestantes"
                    viajes={props.viajes}
                    titulo={"Número de asientos restantes del avión"}
                    limpiar={limpiar}
                    tipoDeInput={"number"}

                ></FiltroDeBusquedaInput>

                <FiltroDeBusquedaSlideBar
                    opcionesDeVuelos={props.opcionesDeVuelos}
                    setOpcionesDeVuelo={props.setOpcionesDeVuelo}
                    cambiarTipoDeFiltroFunction={props.cambiarTipoDeFiltroFunction}
                    tipoDeFiltro={props.tipoDeFiltro}
                    datoAfiltrar="precio"
                    viajes={props.viajes}
                    titulo={"Precio"}
                    limpiar={limpiar}
                    cambiar2TiposDeFiltrosFunction={props.cambiar2TiposDeFiltrosFunction}
                ></FiltroDeBusquedaSlideBar>

            </div>
        </div >    </>


}

export default MenuDeFiltrosVuelos


