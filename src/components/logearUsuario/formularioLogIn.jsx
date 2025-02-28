import { useState } from 'react'
import Boton from '../Boton'

function FormularioLogin(props) {
    return <>
        <h1>{props.error}</h1>
        <form onSubmit={props.iniciarSesion}>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" ref={props.logInNombre} required />
            </div>
            <div>
                <label htmlFor="contraseña">Contraseña:</label>
                <input type="password" id="contraseña" name="contraseña" ref={props.logInContraseña} required />
            </div>
            <Boton funcionBoton={props.iniciarSesion} nombreBoton="Iniciar Sesion"></Boton>
        </form>


    </>


}

export default FormularioLogin
