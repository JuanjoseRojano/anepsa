import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import TarjetasMisViajes from './tarjetasMisViajes';
function TusViajes(props) {

    if (props.usuarioConectado === null) {
        return (<Navigate to='../LogIn'></Navigate>)
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
                            <TarjetasMisViajes
                                imagen={element.imagen}
                                destino={element.destino}
                                salida={element.salida}
                                horariosDeVuelo={element.horariosDeVuelo}
                                diasDeLaSemana={element.diasDeLaSemana}
                                numeroBilletes={element.numeroBilletes}
                                precioOriginal={element.precio}
                                precioTotal={element.precioTotal}
                                usuarioConectado={props.usuarioConectado}
                                setUsuarioConectado={props.setUsuarioConectado}
                                usuarios={props.suarios}
                                setUsuarios={props.setUsuarios}
                            />
                        ))
                    }
                </div>
            </div></>)

    }


}

export default TusViajes
