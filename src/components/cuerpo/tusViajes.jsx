import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";


function TusViajes(props) {

    if (props.usuarioConectado === null) {
        return (<Navigate to='../LogIn'></Navigate>)
    }
    else {

        props.usuarioConectado.viajes.map((element) => {
            return (<>
                <h1>{element.destino}</h1>
                <h1>{element.salida}</h1>
            </>
            )
        })
        return (<>Hola</>)
    }


}

export default TusViajes
