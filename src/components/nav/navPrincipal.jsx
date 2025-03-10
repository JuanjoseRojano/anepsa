import { useState, useEffect } from 'react'
import SeccionNav from './seccionNav'
import login from '../../media/login.png'
import viaje from '../../media/viaje.png'
import ticket from '../../media/ticket.png'
import staff from '../../media/staff.png'
import logo from '../../media/logo.png'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";

export default NavPrincipal


function NavPrincipal(props) {

    const [logInOLogOut, setLogInOLogOut] = useState(null)

    const navigate = useNavigate()


    function cerrarSesion(e) {
        e.preventDefault()
        props.setUsuarioConectado(null)
        navigate(
            "/inicio"
        )
    }

    useEffect(() => {
    },
        [props.usuarioConectado,
        ])

    useEffect(() => {

        if (props.usuarioConectado === null) {
            setLogInOLogOut(<Link to="/LogIn"><SeccionNav imagenNav={login} nombreSeccionNav={"Login"} className="flex-1" /></Link>
            )
        }
        else {
            setLogInOLogOut(<Link to="/Inicio"><SeccionNav imagenNav={login} nombreSeccionNav={"LogOut"} className="flex-1" onClick={cerrarSesion} /></Link>

            )
        }
    }, [props.usuarioConectado])


    return (
        <>
            <div className="bg-gray-800 bg-opacity-80 shadow-lg p-4 sticky top-0 z-50">
                <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-row sm:space-x-6 sm:space-y-0 sm:w-auto sm:justify-between">

                    <Link to="/inicio" className="flex items-center space-x-3">
                        <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
                        <h1 className="text-white text-3xl font-bold">Anepsa</h1>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0 w-full sm:w-auto">

                        {logInOLogOut}

                        <Link to="/TusViajes" className="w-full sm:w-auto">
                            <SeccionNav imagenNav={viaje} nombreSeccionNav="Tus viajes" />
                        </Link>
                        <Link to="/ReservarViajes" className="w-full sm:w-auto">
                            <SeccionNav imagenNav={ticket} nombreSeccionNav="Reservar viajes" />
                        </Link>
                        <Link to="/ViajesComunes" className="w-full sm:w-auto">
                            <SeccionNav imagenNav={staff} nombreSeccionNav="Viajes de usuarios" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}