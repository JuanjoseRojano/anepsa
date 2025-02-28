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
    const [esperarLogOut, setEsperarLogOut] = useState(false)

    const navigate = useNavigate()


    function cerrarSesion(e) {
        e.preventDefault()
        // setEsperarLogOut es true para uqe pueda navegar y setUsuarioConectado cierra sesion, esto debo colocarlo fuera de use effect
        // ya que setUsuarioConectado es asíncrono
        props.setUsuarioConectado(null)
        setEsperarLogOut(true)
    }

    useEffect(() => {
        //Aqui no podía usar setUsuarioConectado ya que debido al renderizado y la asincronia de esta funcion
        // disparaba la navegacion antes de que el contenido de usuarioconectado cambiase
        //Ademas debo utilizar si o si el hook de useNavigate ya que no puedo devoler una etiqueta aqui y esto me permite volver al menu sin que 
        // recargue toda la pagina
        if (props.usuarioConectado === null && esperarLogOut) {
            navigate(
                "/inicio"
            )
            setEsperarLogOut(false)
        }
    },
        // Coloco todo esto aqui ya que useeffect esta pendiente de cambios en esta tres cosas
        [props.usuarioConectado, esperarLogOut, navigate])

    useEffect(() => {

        if (props.usuarioConectado === null) {
            setLogInOLogOut(<Link to="/LogIn"><SeccionNav imagenNav={login} nombreSeccionNav={"Login"} className="flex-1" /></Link>
            )
        }
        else {
            setLogInOLogOut(<SeccionNav imagenNav={login} nombreSeccionNav={"LogOut"} className="flex-1" onClick={cerrarSesion} />
            )
        }
    }, [props.usuarioConectado])


    return (
        <>
            <div className="bg-gray-800 bg-opacity-80  shadow-lg flex flex-wrap items-center space-x-5 p-10 ">


                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">


                    <Link to="/inicio"><div className="flex items-center space-x-20 mb-6">
                        <div className='flex flex-wrap items-center space-x-5'> <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
                            <h1 className="text-white text-3xl font-bold">Anepsa</h1></div>

                    </div></Link>


                    {logInOLogOut}
                    <Link to="/TusViajes"><SeccionNav imagenNav={viaje} nombreSeccionNav={"Tus viajes"} /></Link>
                    <Link to="/ReservarViajes"><SeccionNav imagenNav={ticket} nombreSeccionNav={"Reservar viajes"} /></Link>
                    <Link to="/GestionarViajes"><SeccionNav imagenNav={staff} nombreSeccionNav={"Gestionar Viajes"} /></Link>
                </div>
            </div>
        </>
    )
}


// import { useState, useEffect } from 'react'
// import SeccionNav from './seccionNav'
// import login from '../../media/login.png'
// import viaje from '../../media/viaje.png'
// import ticket from '../../media/ticket.png'
// import staff from '../../media/staff.png'
// import logo from '../../media/logo.png'
// import { Link, useNavigate } from "react-router-dom";

// export default function NavPrincipal(props) {

//     const [logInOLogOut, setLogInOLogOut] = useState(null)
//     const [esperarLogOut, setEsperarLogOut] = useState(false)
//     const navigate = useNavigate()

//     // Esta función se ejecuta al hacer click en el LogOut
//     const handleLogOut = () => {
//         props.setUsuarioConectado(null)   // Cerramos sesión
//         setEsperarLogOut(true)            // Activamos el flag para que el useEffect haga el navigate
//     }

//     // Este efecto se encarga de navegar cuando detecta el logOut completo
//     useEffect(() => {
//         if (props.usuarioConectado === null && esperarLogOut) {
//             navigate('/inicio')
//             setEsperarLogOut(false)  // Reseteamos el flag
//         }
//     }, [props.usuarioConectado, esperarLogOut, navigate])

//     // Este efecto controla si muestra Login o LogOut en el menú
//     useEffect(() => {
//         if (props.usuarioConectado === null) {
//             setLogInOLogOut(
//                 <Link to="/LogIn">
//                     <SeccionNav imagenNav={login} nombreSeccionNav="Login" className="flex-1" />
//                 </Link>
//             )
//         } else {
//             setLogInOLogOut(
//                 <SeccionNav
//                     imagenNav={login}
//                     nombreSeccionNav="LogOut"
//                     className="flex-1"
//                     onClick={handleLogOut}
//                 />
//             )
//         }
//     }, [props.usuarioConectado])

//     return (
//         <div className="bg-gray-800 bg-opacity-80 shadow-lg flex flex-wrap items-center space-x-5 p-10">
//             <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
//                 <Link to="/inicio">
//                     <div className="flex items-center space-x-20 mb-6">
//                         <div className='flex flex-wrap items-center space-x-5'>
//                             <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
//                             <h1 className="text-white text-3xl font-bold">Anepsa</h1>
//                         </div>
//                     </div>
//                 </Link>

//                 {logInOLogOut}

//                 <Link to="/TusViajes"><SeccionNav imagenNav={viaje} nombreSeccionNav="Tus viajes" /></Link>
//                 <Link to="/ReservarViajes"><SeccionNav imagenNav={ticket} nombreSeccionNav="Reservar viajes" /></Link>
//                 <Link to="/GestionarViajes"><SeccionNav imagenNav={staff} nombreSeccionNav="Gestionar Viajes" /></Link>
//             </div>
//         </div>
//     )
// }
