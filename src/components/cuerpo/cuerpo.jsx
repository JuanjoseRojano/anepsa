import { useState } from 'react'
import DestinoAleatorio from './destinoAleatorio'
import viajando from '../../media/viajando.jpg'
import Muestras from './muestras'
import Prueba from '../prueba'
import Login from '../logearUsuario/login'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";

function Cuerpo(props) {


    return <>
        {/* <Navigate to="/inicio">d</Navigate> */}


        <Routes>
            <Route path="/" element={<Navigate to="/inicio"></Navigate>} />
            <Route path="/inicio" element={<>
                <div className="relative">
                    <img src={viajando} className="w-full h-auto" />

                    <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/100 to-transparent"></div>

                </div>
                <DestinoAleatorio viajes={props.viajes}></DestinoAleatorio>
                <Muestras viajes={props.viajes} /></>} />

            {/* <Route path='/LogOut' element={<Prueba />} /> */}
            <Route path='/LogIn' element={<Login usuarioConectado={props.usuarioConectado} setUsuarioConectado={props.setUsuarioConectado} usuarios={props.usuarios} setUsuarios={props.setUsuarios} />} />
            <Route path='/TusViajes' element={<Prueba />} />
            <Route path="/ReservarViajes" element={<Prueba />} />
            <Route path="/GestionarViajes" element={<Prueba />} />


        </Routes>



    </>


}

export default Cuerpo
