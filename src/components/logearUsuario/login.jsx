import { useState, useRef } from 'react'
import Boton from '../Boton'
import FormularioLogin from './formularioLogIn'
function Login(props) {

    const logInNombre = useRef(null);
    const logInContraseña = useRef(null);

    const crearNombre = useRef(null);
    const crearContraseña = useRef(null);

    const [errorCrear, setErrorCrear] = useState('')
    const [error, setError] = useState('')
    const [formularioCrearUsuario, setFormularioCrearUsuario] = useState(false)

    function iniciarSesion(e) {
        e.preventDefault();

        const usuarioEncontrado = props.usuarios.find(
            (element) => element.nombreUsuario === logInNombre.current.value
        )

        if (!usuarioEncontrado) {
            setError("Nombre de usuario o contraseña incorrectos");
            return;
        }

        if (usuarioEncontrado.contraseñaUsuario !== logInContraseña.current.value) {
            setError("Contraseña incorrecta");
            return;
        }

        props.setUsuarioConectado(usuarioEncontrado);
    }

    function mostrarFormularioCrearUsuario() { }

    if (props.usuarioConectado === null) {
        return (<>
            <FormularioLogin error={error} iniciarSesion={iniciarSesion} logInNombre={logInNombre} logInContraseña={logInContraseña}></FormularioLogin>
        </>)
    }

    else {
        return (<h1>{props.usuarioConectado.nombreUsuario}</h1>

        )
    }
}





export default Login
