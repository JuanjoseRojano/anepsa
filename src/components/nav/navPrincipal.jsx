import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import SeccionNav from "./seccionNav"
import login from "../../media/login.png"
import viaje from "../../media/viaje.png"
import ticket from "../../media/ticket.png"
import staff from "../../media/staff.png"
import logo from "../../media/logo.png"

export default function NavPrincipal(props) {
    const [logInOLogOut, setLogInOLogOut] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    function cerrarSesion(e) {
        e.preventDefault()
        props.setUsuarioConectado(null)
        navigate("/inicio")
    }

    useEffect(() => {
        if (props.usuarioConectado === null) {
            setLogInOLogOut(
                <Link to="/LogIn" onClick={() => setMenuOpen(false)}>
                    <SeccionNav imagenNav={login} nombreSeccionNav="Login" />
                </Link>
            );
        } else {
            setLogInOLogOut(
                <Link to="/Inicio" onClick={(e) => { cerrarSesion(e); setMenuOpen(false) }}>
                    <SeccionNav imagenNav={login} nombreSeccionNav="LogOut" />
                </Link>
            )
        }
    }, [props.usuarioConectado])

    return (
        <nav className="bg-gray-800 bg-opacity-80 shadow-lg sticky top-0 z-50 min-h-[64px] relative">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between w-full">
                <div className="flex items-center justify-between w-full">

                    <Link to="/inicio" className="flex items-center space-x-3">
                        <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
                        <h1 className="text-white text-3xl font-bold">Anepsa</h1>
                    </Link>

                    <button
                        className="text-white text-3xl md:hidden focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? "✖" : "☰"}
                    </button>
                </div>

                <div className={`absolute md:relative top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-6`}>
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 space-x-6 md:space-y-0 md:space-x-6">
                        {logInOLogOut}
                        <Link to="/TusViajes" className="block md:inline-block " onClick={() => setMenuOpen(false)}>
                            <SeccionNav imagenNav={viaje} nombreSeccionNav="Tus viajes" />
                        </Link>
                        <Link to="/ReservarViajes" className="block md:inline-block" onClick={() => setMenuOpen(false)}>
                            <SeccionNav imagenNav={ticket} nombreSeccionNav="Reservar viajes" />
                        </Link>
                        <Link to="/ViajesComunes" className="block md:inline-block" onClick={() => setMenuOpen(false)}>
                            <SeccionNav imagenNav={staff} nombreSeccionNav="Viajes más frecuentes" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
