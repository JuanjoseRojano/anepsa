import { useState, useEffect } from 'react'
import login from '../../media/login.png'
import Boton from '../../components/Boton'
import { eliminarUsuario } from '../../funcionalidades/obtenerAPI'
function MostrarUsuario(props) {

    const [viajesEncontrados, setViajesEncontrados] = useState(null)

    function eliminarUnUsuario(e) {
        e.preventDefault()
        eliminarUsuario(
            props.usuarios,
            props.setUsuarios,
            props.usuarioConectado,
            props.setUsuarioConectado)
    }


    useEffect(() => {
        if (props.usuarioConectado.viajes.length === 0) {
            setViajesEncontrados(<img
                src="https://st.depositphotos.com/1107016/1239/v/450/depositphotos_12390723-stock-illustration-airplane-travel.jpg"
                className="w-full h-full object-cover"
            />)

        } else {
            setViajesEncontrados(<div>
                {props.usuarioConectado.viajes.map((element) => {
                    return (<>
                        <div>
                            <h1 className="">Destino: {element.destino}</h1>
                            <img src={element.imagen} alt={element.destino} />                            <div>
                                <div>
                                    <span className={estilosSpan}>Salida: {element.salida}</span>
                                    <span className={estilosSpan}>Hora de llegada: {element.horariosDeVuelo}</span>
                                </div>
                                <div>
                                    <span className={estilosSpan}>Día del vuelo: {element.diasDeLaSemana}</span>
                                    <span className={estilosSpan}>Billetes comprados: {element.numeroBilletes}</span>
                                </div>
                            </div>


                            <span className={estilosSpan}>Precio total: {element.precioTotal}</span>
                        </div>
                    </>)
                })}
            </div>)
        }

    }, [])


    const estilosSpan = "ml-2 text-gray-700 font-medium bg-blue-100 border-l-4 border-blue-500 px-2 py-1 rounded-lg"
    return (<>
        <div className="border rounded-lg shadow-md overflow-hidden w-200 bg-white my-10 p-2 h-150">
            <div className="p-2 flex  flex-col">

                <span className={estilosSpan}>Nombre de usuario: {props.usuarioConectado.nombreUsuario}</span>
                <div className='flex flex-col'>
                    <span className={estilosSpan}>                            Número de viajes activos:
                        {props.usuarioConectado.viajes.length}</span>
                    <Boton funcionBoton={eliminarUnUsuario} nombreBoton="Eliminar usuario" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mt-4 w-40" />
                    <h1 className="text-xl md:text-2xl font-bold text-blue-600 bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-md my-2">
                        Parece que todavía no tienes viajes reservados
                    </h1>
                </div>
            </div>

            <div className="w-full h-100 overflow-hidden overflow-y-auto">
                {viajesEncontrados}
            </div>
        </div>
    </>)
}

export default MostrarUsuario


