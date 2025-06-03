import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SeccionNav from "./seccionNav"
import login from "../../media/login.png"
import viaje from "../../media/viaje.png"
import ticket from "../../media/ticket.png"
import logo from "../../media/logo.png"
import '../../App.css'


export default function NavPrincipal(props) {
    const [loginMostrarUser, setLoginMostrarUser] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)


    useEffect(() => {

        if (props.usuarioConectado === null) {
            setLoginMostrarUser(
                <Link to="/Sesion" onClick={() => setMenuOpen(false)}>
                    <SeccionNav imagenNav={login} nombreSeccionNav="Login" />
                </Link>
            )
        } else {

            setLoginMostrarUser(

                <Link to="/Sesion" onClick={() => { setMenuOpen(false) }}>
                    <SeccionNav imagenNav={props.contenidoTokenUser.payload.picture} nombreSeccionNav={props.contenidoTokenUser.payload.name} />
                </Link>
            )


        }
    }, [props.usuarioConectado])



    return (
        <nav className={`bg-gray-800 bg-opacity-80 shadow-lg sticky top-0 z-51 min-h-[64px] relative`}>
            <div className="container mx-auto px-4 py-4 flex items-center justify-between w-full ">
                <div className="flex items-center justify-between w-full">

                    <Link to="/inicio" className="flex items-center space-x-3">
                        <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
                        <h1 className="text-white text-3xl font-bold">Anepsa</h1>
                    </Link>

                    <button
                        className="burger w-7 sm:w-10 md:w-10 h-8 flex flex-col justify-between items-center bg-transparent border-none cursor-pointer hover:animate-move-right "
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span
                            className={`block h-1 w-full bg-blue-900 rounded-full transition-all duration-300 ease-in-out transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                        ></span>
                        <span
                            className={`block h-1 w-full bg-blue-900 rounded-full transition-all duration-300 ease-in-out ${menuOpen ? "opacity-0" : ""}`}
                        ></span>
                        <span
                            className={`block h-1 w-full bg-blue-900 rounded-full transition-all duration-300 ease-in-out transform ${menuOpen ? "-rotate-45 translate-y-2" : ""}`}
                        ></span>
                    </button>
                </div>
            </div>


            <div className={`container mx-auto px-4 py-4 flex items-center justify-between w-full ${menuOpen ? "mostrarMenu" : "hidden"} `} >
                <div className="flex flex-col items-start justify-between w-full ">

                    {loginMostrarUser}
                    <Link to="/TusViajes" className="  " onClick={() => setMenuOpen(false)}>
                        <SeccionNav imagenNav={viaje} nombreSeccionNav="Tus viajes" />
                    </Link>
                    <Link to="/ReservarViajes" className="" onClick={() => setMenuOpen(false)}>
                        <SeccionNav imagenNav={ticket} nombreSeccionNav="Reservar viajes" />
                    </Link>
                </div>
            </div>

        </nav >
    )
}
