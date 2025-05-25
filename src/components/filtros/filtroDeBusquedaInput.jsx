import { useState, useEffect, useRef } from 'react'
import { filtrosDeBusqueda } from '../../funcionalidades/obtenerAPI'

function FiltroDeBusquedaInput(props) {

    const [valorInput, setValorInput] = useState('')
    const [listaFiltrada, setListaFiltrada] = useState(null)
    const [conponenteDivOpcionesFiltrado, setConponenteDivOpcionesFiltrado] = useState(null)
    const [antiAsincronia, setAntiAsincronia] = useState(0)

    const limpiarContenido = useRef()
    useEffect(() => {
        limpiarContenido.current.value = ""
        props.cambiarTipoDeFiltroFunction(props.datoAFiltrar, "")
        setListaFiltrada(null)

    }, [props.limpiar])

    useEffect(() => {

        switch (true) {


            case props.tipoDeFiltro[props.datoAFiltrar] === "":
                setConponenteDivOpcionesFiltrado(null)
                break

            case props.opcionesDeVuelos === 'No encontrado':
                if (props.tipoDeFiltro[props.datoAFiltrar] != "")
                    setConponenteDivOpcionesFiltrado(<h1 className='text-red-500'>Viajes no encontrados</h1>)
                break

            case props.opcionesDeVuelos === null:

                // Necesario para que cuando sea null no se detenga ni de error por el default
                break

            default:

                if (props.tipoDeFiltro[props.datoAFiltrar] != "") {
                    setConponenteDivOpcionesFiltrado(
                        <div className="max-h-60  w-full p-4 border border-gray-300 rounded-lg bg-gray-100 my-2">
                            <h2 className="text-lg font-semibold mb-2">{valorInput}</h2>
                            <ul className="list-none space-y-1 overflow-y-auto h-20">
                                {listaFiltrada.map((element, index) => (
                                    <li className='' >{element}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                break
        }
    }, [props.opcionesDeVuelos, antiAsincronia])
    //Debido al renderizado de react, no es capaz de guardar una variable local al usar useref me 
    // permite que tras re-renderizar al crear la variable esta no vuelva a 0
    const evitarEjecutarFuncionEnRenderizadosIniciales = useRef(0)

    useEffect(() => {
        if (evitarEjecutarFuncionEnRenderizadosIniciales.current != 2) {
            // Primer y segundo render: NO ejecutar
            evitarEjecutarFuncionEnRenderizadosIniciales.current += 1
            return
        }
        else {
            filtrosDeBusqueda(props.viajes, props.setOpcionesDeVuelo, props.tipoDeFiltro, setListaFiltrada, props.datoAFiltrar, setAntiAsincronia)
        }

        //NOTA IMPORTANTE tipo de filtro cambia pero react no detecta si 
        // cambia UNA SOLA COSA por ende, si no apuntamos a un objeto en concreto
        //esta funcion se dispara cuando no debe
    }, [props.tipoDeFiltro])

    return (
        <div className='ml-7 mr-7' >
            <h1 className="font-bold text-2xl my-3 relative text-center py-2 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[10px] before:bg-gradient-to-t before:from-transparent before:to-blue-500 before:rounded-b-full">{props.titulo}</h1>
            <input
                type={props.tipoDeInput}
                ref={limpiarContenido}
                placeholder={`Filtrar por ${props.titulo}`}
                onChange={(e) => {
                    setValorInput(e.target.value)
                    props.cambiarTipoDeFiltroFunction(props.datoAFiltrar, e.target.value)
                }}
                className="w-full p-2 border rounded"
            />

            {/* Crear componente para mostrar el autocompletado */}

            {/* Ademas metemos todos los filtros porque cuando esta vacio simplemente ponemos "" */}
            {conponenteDivOpcionesFiltrado}
        </div>
    )
}
export default FiltroDeBusquedaInput
