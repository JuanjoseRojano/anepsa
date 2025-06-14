import { useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom"
import TarjetasMisViajesEditable from './tarjetasMisViajesEditable'

import { isBefore } from 'date-fns'

function TusViajes(props) {

    const [contenidoTusViajes, setContenidoTusViajes] = useState(null)
    const [contenedoresDivPrincipal, setContenedoresDivPrincipal] = useState([])

    useEffect(() => {
        separarTarjetas()
    }, [])

    useEffect(() => {
        separarTarjetas()
    }, [props.usuarioConectado])

    //funcion que separa los viajes editables de los no editables
    const separarTarjetas = () => {

        if (props.usuarioConectado === null) (
            setContenidoTusViajes(<Navigate to='../Sesion'></Navigate>)
        )
        else {
            const listaComponentesEditables = []


            props.usuarioConectado.viajes.forEach(element => {
                let renderizarBilleteEditableONoEditable

                const fechaDeVueloTransformada = new Date(element.fechaDeVuelo)

                const fechaActualSumar2 = new Date()
                const fechaLimite = new Date()


                const fechaActualMas2 = new Date(fechaActualSumar2.setDate(fechaActualSumar2.getDate() + 2))
                const fechaActualLimite = new Date(fechaLimite.setDate(fechaLimite.getDate() - 1))



                if (isBefore(fechaDeVueloTransformada, fechaActualLimite)) {
                    renderizarBilleteEditableONoEditable = 2

                } else if (isBefore(fechaDeVueloTransformada, fechaActualMas2)) {
                    renderizarBilleteEditableONoEditable = 1

                }
                else {
                    renderizarBilleteEditableONoEditable = 0

                }



                switch (renderizarBilleteEditableONoEditable) {

                    case 0:
                        setContenedoresDivPrincipal([`flex justify-center items-center min-h-screen p-3`, `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  justify-center p-3`])
                        listaComponentesEditables.push(


                            <TarjetasMisViajesEditable
                                element={element}
                                usuarioConectado={props.usuarioConectado}
                                setUsuarioConectado={props.setUsuarioConectado}
                                usuarios={props.Usuarios}
                                setUsuarios={props.setUsuarios}
                                viajes={props.viajes}
                                setViajes={props.setViajes}
                                setError={props.setError}
                            />

                        )

                        break
                    //Estos otros case los decidí mantener para mostrar algo diferente, sin embargo mantengo la duda de si es buena idea
                    case 1:

                        break
                    case 2:
                        break
                }
            })
            if (listaComponentesEditables.length === 0 || props.usuarioConectado.viajes.length === 0) {
                setContenedoresDivPrincipal([`flex flex-col items-center mt-6`, ``])
                setContenidoTusViajes(<>
                    <h2 className="text-xl text-gray-600">Sin viajes posibles de actualizar, pulsa <span className='text-blue-400 hover:font-bold hover:text-blue-500'><Link to="/ReservarViajes">Aquí</Link></span> para comprar alguno</h2>
                    <img
                        src="https://blog.selfbank.es/wp-content/uploads/2018/03/iStock-584759976.jpg"
                        alt="Sin viajes"
                        className="mt-4 w-96 h-auto rounded-lg shadow-md"
                    />
                </>)
            }
            else {
                setContenidoTusViajes(listaComponentesEditables)
            }
        }
    }

    return (
        <>
            <div className={`${contenedoresDivPrincipal[0]}`}>
                <div className={`${contenedoresDivPrincipal[1]}`}>

                    {contenidoTusViajes}
                </div>
            </div>

        </>
    )
}

export default TusViajes