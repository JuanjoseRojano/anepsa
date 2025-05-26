import { useState, useEffect } from 'react'
import viajando from '../../media/viajando.jpg'
import Muestras from './muestras'
import Login from '../logearUsuario/login'
import ReservarViajes from './reservarVuelos/reservarViajes'
import TusViajes from './tusViajes/tusViajes'
import ViajesComunes from './viajesComunes/viajesComunes'
import DestinoAleatorio from './destinoAleatorioCompra/destinoAleatorio'
import ErrorGeneral from '../error'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import MostrarUsuario from '../logearUsuario/mostrarUsuario'
import SubirScroll from '../subirScroll'

import GestionarCompra from './reservarVuelos/configurarBillete/gestionarCompra'

function Cuerpo(props) {

    const titulo1 = "Viaje de tus sueños"
    const subtitulo1 = "Reserva con antelación a tus destinos deseados"
    const texto1 = " Anepsa, como muchas aerolíneas, está en constante cambio. De ser una aerolínea tradicional, ahora ofrece opciones más flexibles y centradas en el cliente, adaptándose a las nuevasnecesidades del mercado."

    const titulo2 = "Vuela seguro"
    const subtitulo2 = "Los aviones más seguros y cómodos del mundo"
    const texto2 = "La seguridad de nuestros pasajeros es nuestra máxima prioridad. Nuestro equipo de pilotos altamente capacitados y el mantenimiento regular de nuestras aeronaves aseguran que su vuelo sea lo más seguro posible."

    const [componenteUsuario, setComponenteUsuario] = useState(<Login usuarioConectado={props.usuarioConectado}
        setUsuarioConectado={props.setUsuarioConectado}
        usuarios={props.usuarios}
        setUsuarios={props.setUsuarios}
        contenidoTokenUser={props.contenidoTokenUser}
        setContenidoTokenUser={props.setContenidoTokenUser}
        usuarioConectadoVuelos={props.usuarioConectadoVuelos}
        setUsuarioConectadoVuelos={props.setUsuarioConectadoVuelos}
        viajes={props.viajes} />)
    const [vueloAComprar, setVueloAComprar] = useState(null)

    const [error, setError] = useState("");


    useEffect(() => {

        if (props.usuarioConectado === null) {
            setComponenteUsuario(<Login usuarioConectado={props.usuarioConectado}
                setUsuarioConectado={props.setUsuarioConectado}
                usuarios={props.usuarios}
                setUsuarios={props.setUsuarios}
                contenidoTokenUser={props.contenidoTokenUser}
                setContenidoTokenUser={props.setContenidoTokenUser}
                usuarioConectadoVuelos={props.usuarioConectadoVuelos}
                setUsuarioConectadoVuelos={props.setUsuarioConectadoVuelos}
                viajes={props.viajes} />)
        }
        else {
            setComponenteUsuario(<MostrarUsuario usuarioConectado={props.usuarioConectado}
                setUsuarioConectado={props.setUsuarioConectado}
                usuarios={props.usuarios}
                setUsuarios={props.setUsuarios}
                contenidoTokenUser={props.contenidoTokenUser}
                setContenidoTokenUser={props.setContenidoTokenUser}
                usuarioConectadoVuelos={props.usuarioConectadoVuelos}
                setUsuarioConectadoVuelos={props.setUsuarioConectadoVuelos}
                viajes={props.viajes} />)

        }

    }, [props.usuarioConectado])

    return <>

        <SubirScroll>

            <Routes>
                <Route path="/" element={<Navigate to="/inicio"></Navigate>} />
                <Route path="/inicio" element={<>
                    <div className="relative">
                        <img src={viajando} className="w-full h-auto" />

                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/100 to-transparent"></div>

                    </div>
                    <div className='flex flex-col md:flex-row my-4  bg-blue-200  '>
                        <DestinoAleatorio viajes={props.viajes} setViajes={props.setViajes} usuarios={props.usuarios} setUsuarios={props.setUsuarios} usuarioConectado={props.usuarioConectado} setUsuarioConectado={props.setUsuarioConectado}></DestinoAleatorio>
                        <div className='max-h-64 max-w-64 min-h-40 min-w-min-h-40 h-full w-full m-auto'>
                            <ViajesComunes usuarios={props.usuarios} viajes={props.viajes} />
                        </div>

                    </div>

                    <div className='my-20'>
                        <div className="max-w-[48rem] w-full flex flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="w-2/5 shrink-0">
                                <img
                                    src="https://blog.oxfamintermon.org/wp-content/uploads/2018/12/viajes-alternativos-2.jpg"
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <Muestras titulo={titulo1} subtitulo={subtitulo1} texto={texto1} />
                        </div>
                        <div className="max-w-[48rem] w-full flex flex-row bg-white shadow-lg rounded-lg overflow-hidden text-right float-end my-2">
                            <Muestras titulo={titulo2} subtitulo={subtitulo2} texto={texto2} />
                            <div className="w-2/5 shrink-0">
                                <img
                                    src="https://www.lowcostparking.es/blog/wp-content/uploads/2018/03/pruebas-de-seguridad-en-los-aviones-730x410.jpg"
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>



                </>} />



                <Route path="/Sesion" element={componenteUsuario} setError={setError} />
                <Route path='/TusViajes' element={<TusViajes viajes={props.viajes} setViajes={props.setViajes} usuarios={props.usuarios} setUsuarios={props.setUsuarios} setUsuarioConectado={props.setUsuarioConectado} usuarioConectado={props.usuarioConectado} setError={setError} />} />
                <Route path="/ReservarViajes" element={<ReservarViajes usuarios={props.usuarios} setUsuarios={props.setUsuarios} usuarioConectado={props.usuarioConectado} setUsuarioConectado={props.setUsuarioConectado} viajes={props.viajes} setVueloAComprar={setVueloAComprar} />} />
                {/* <Route path="/ViajesComunes" element={<ViajesComunes usuarios={props.usuarios} viajes={props.viajes} />} /> */}
                <Route path="/ReservarViajes/ComprarBillete" element={<GestionarCompra error={setError} usuarios={props.usuarios} setUsuarios={props.setUsuarios} usuarioConectado={props.usuarioConectado} setUsuarioConectado={props.setUsuarioConectado} viajes={props.viajes} setViajes={props.setViajes} setVueloAComprar={setVueloAComprar} vueloAComprar={vueloAComprar} />} />

            </Routes>
        </SubirScroll>

        <ErrorGeneral
            error={error}
            setError={setError}
        />

    </>


}

export default Cuerpo
