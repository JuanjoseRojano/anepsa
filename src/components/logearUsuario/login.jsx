import { useState, useRef, useEffect } from 'react'
import Boton from '../Boton'
import FormularioLogin from './formularioLogIn'
import { uploadJson, masterKey, rutaUsuarios } from '../../funcionalidades/obtenerAPI'
import MostrarUsuario from './mostrarUsuario'

function Login(props) {

    const logInNombre = useRef(null)
    const logInContraseña = useRef(null)

    const crearNombre = useRef(null)
    const crearContraseña = useRef(null)

    const [cambiarContenidoCrearUsuarioYLogin, setCambiarContenidoCrearUsuarioYLogin] = useState(true)
    const [errorCrear, setErrorCrear] = useState('')
    const [error, setError] = useState('')

    const estiloBoton = "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mt-4"
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
            setError("Contraseña incorrecta")
            return;
        }

        props.setUsuarioConectado(usuarioEncontrado);
    }




    function crearUsuario(e) {
        e.preventDefault()


        const usuarioEncontrado = props.usuarios.find((usuario) => usuario.nombreUsuario === crearNombre.current.value);

        if (usuarioEncontrado === undefined) {
            props.setUsuarios((prev) => ([
                ...prev,
                {
                    "nombreUsuario": crearNombre.current.value,
                    "contraseñaUsuario": crearContraseña.current.value,
                    "viajes": []
                }
            ]))

        }
        else {
            setErrorCrear("El usuario ya existe")
        }
    }

    useEffect(() => {
        if (props.usuarios.length > 0) {
            uploadJson(rutaUsuarios, masterKey, props.usuarios);

        }
    }, [props.usuarios])

    function mostrarInicioSesion(e) {
        e.preventDefault()
        setCambiarContenidoCrearUsuarioYLogin(true)
    }

    function mostrarCrearUsuario(e) {
        e.preventDefault()
        setCambiarContenidoCrearUsuarioYLogin(false)
    }

    if (cambiarContenidoCrearUsuarioYLogin === true) {
        if (props.usuarioConectado === null) {
            return (<>
                <div className="flex flex-col items-center justify-center min-h-screen space-y-2 bg-gray-100">
                    <FormularioLogin tituloFormulario={"Iniciar sesión"} error={error} funcionFormulario={iniciarSesion} logInNombre={logInNombre} logInContraseña={logInContraseña} nombreBoton={"Iniciar Sesion"}></FormularioLogin>
                    <Boton funcionBoton={mostrarCrearUsuario} nombreBoton={"Ir a crear usuario"} className={estiloBoton}></Boton>
                </div>
            </>)
        }

        else {
            return (<MostrarUsuario setUsuarioConectado={props.setUsuarioConectado} usuarioConectado={props.usuarioConectado} usuarios={props.usuarios} setUsuarios={props.setUsuarios} />)
        }
    }
    else {
        return (<>
            <div className="flex flex-col items-center space-y-0 justify-center min-h-screen  bg-gray-100">
                <FormularioLogin tituloFormulario={"Crear usuario"} error={errorCrear} funcionFormulario={crearUsuario} logInNombre={crearNombre} logInContraseña={crearContraseña} nombreBoton={"Crear Usuario"}></FormularioLogin>
                <Boton funcionBoton={mostrarInicioSesion} nombreBoton={"Ir a inicio de sesion"} className={estiloBoton}></Boton>
            </div>
        </>)
    }

}

export default Login
