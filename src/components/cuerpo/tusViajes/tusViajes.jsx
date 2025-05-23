import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import TarjetasMisViajes from './tarjetasMisViajes';
import { isBefore } from 'date-fns';

function TusViajes(props) {


    const separarTarjetas = (element) => {

        console.log(element)

        const fechaDeVueloTransformada = new Date(element.fechaDeVuelo)

        const fechaActualSumar2 = new Date()
        const fechaLimite = new Date()


        const fechaActualMas2 = new Date(fechaActualSumar2.setDate(fechaActualSumar2.getDate() + 2))
        const fechaActualLimite = new Date(fechaLimite.setDate(fechaLimite.getDate() - 1))


        let renderizarBilleteEditableONoEditable

        if (isBefore(fechaDeVueloTransformada, fechaActualLimite)) {
            renderizarBilleteEditableONoEditable = 2

        } else if (isBefore(fechaDeVueloTransformada, fechaActualMas2)) {
            renderizarBilleteEditableONoEditable = 1

        }
        else {
            renderizarBilleteEditableONoEditable = 0

        }



        switch (renderizarBilleteEditableONoEditable) {

            case 0: console.log("Si cambia")
                return (<TarjetasMisViajes
                    element={element}
                    usuarioConectado={props.usuarioConectado}
                    setUsuarioConectado={props.setUsuarioConectado}
                    usuarios={props.suarios}
                    setUsuarios={props.setUsuarios}
                />)
                break
            case 1: console.log("No cambia")
                return (<TarjetasMisViajes
                    element={element}
                    usuarioConectado={props.usuarioConectado}
                    setUsuarioConectado={props.setUsuarioConectado}
                    usuarios={props.suarios}
                    setUsuarios={props.setUsuarios}
                />)
                break
            case 2: console.log("Eliminar")
                break
        }



    }


    if (props.usuarioConectado === null) {
        return (<Navigate to='../Sesion'></Navigate>)
    }
    else if (props.usuarioConectado.viajes.length === 0) {

        return (
            <div className="flex flex-col items-center mt-6">
                <h2 className="text-xl text-gray-600">Sin viajes en espera pulsa <Link to="/ReservarViajes">Aquí</Link> para comprar alguno</h2>
                <img
                    src="https://blog.selfbank.es/wp-content/uploads/2018/03/iStock-584759976.jpg"
                    alt="Sin viajes"
                    className="mt-4 w-96 h-auto rounded-lg shadow-md"
                />
            </div>)

    }
    else {

        return (<>
            <div className="flex justify-center items-center min-h-screen p-3">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  justify-center p-3">
                    {
                        props.usuarioConectado.viajes.map((element) => (
                            separarTarjetas(element)
                            // <TarjetasMisViajes
                            //     element={element}
                            //     usuarioConectado={props.usuarioConectado}
                            //     setUsuarioConectado={props.setUsuarioConectado}
                            //     usuarios={props.suarios}
                            //     setUsuarios={props.setUsuarios}
                            // />
                        ))
                    }
                </div>
            </div></>)

    }


}

export default TusViajes
