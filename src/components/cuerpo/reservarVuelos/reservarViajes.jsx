import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { uploadJson, masterKey, rutaUsuarios } from '../../../funcionalidades/obtenerAPI';
import FormularioDeReserva from './formularioDeReserva';
function ReservarViajes(props) {

    return (
        <>
            <div className="flex justify-center items-center min-h-screen p-3">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4  justify-center p-3">

                    {props.viajes.map((element) => (
                        <FormularioDeReserva element={element} usuarios={props.usuarios} setUsuarios={props.setUsuarios} usuarioConectado={props.usuarioConectado} setUsuarioConectado={props.setUsuarioConectado} />
                    ))}                </div>
            </div>

        </>
    )
}

export default ReservarViajes
