import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { uploadJson, masterKey, rutaUsuarios } from '../../../funcionalidades/obtenerAPI';
import FormularioDeReserva from './formularioDeReserva';
function ReservarViajes(props) {

    return (
        <>
            {props.viajes.map((element) => (
                <FormularioDeReserva element={element} usuarios={props.usuarios} setUsuarios={props.setUsuarios} usuarioConectado={props.usuarioConectado} setUsuarioConectado={props.setUsuarioConectado} />
            ))}
        </>
    )
}

export default ReservarViajes
