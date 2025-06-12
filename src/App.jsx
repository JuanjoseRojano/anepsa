import { useState, useEffect } from 'react'
import { getMongoDB } from './funcionalidades/obtenerAPI'
import Cargando from './components/cargando'
import NavPrincipal from './components/nav/navPrincipal'
import Cuerpo from './components/cuerpo/cuerpo'
import { BrowserRouter as Router } from "react-router-dom"
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google"
import ComponenteFooter from './components/componenteFooter'

import './index.css'
import './App.css'

function App() {
  const [usuarios, setUsuarios] = useState(null)
  const [viajes, setViajes] = useState(null)
  const [usuarioConectado, setUsuarioConectado] = useState(null)
  const [usuarioConectadoVuelos, setUsuarioConectadoVuelos] = useState(null)
  const [contenidoTokenUser, setContenidoTokenUser] = useState(null)

  const clientId = '921909523929-c1t5r0ugve17ahbaujg8kqh3vbtt1ri8.apps.googleusercontent.com'

  // UseEffect para el control de la cuenta de usuario al salir
  useEffect(() => {
    const handleBeforeUnload = () => {
      setUsuarioConectado(null)
      setContenidoTokenUser(null)
      googleLogout()
      localStorage.clear()
      sessionStorage.clear()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
  }, [])

  //Funciones para obtener datos
  const getUsuarios = async () => {
    const data = await getMongoDB("/Usuarios")
    setUsuarios(data)

  }

  const getViajes = async () => {
    const data = await getMongoDB("/Viajes")
    setViajes(data)

  }

  //Funciones para el refresco de información
  const getUsuarioConectado = async () => {
    const data = await getMongoDB("/Usuarios")
    setUsuarioConectado(data.find(usuario =>
      usuario._id === usuarioConectado._id
    ))
  }

  const refrescarInformacion = async () => {
    getUsuarios()
    getViajes()
    if (usuarioConectado !== null) {
      getUsuarioConectado()
    }
  }

  useEffect(() => {
    setInterval(refrescarInformacion, 63200)
  }, [])

  useEffect(() => {

    getUsuarios()
    getViajes()
  },
    [])


  if (usuarios === null || viajes === null) {

    return (<Cargando textoCargando={"Accediendo a la base de datos..."} />)
  }
  else {
    return (<>

      <Router>

        <GoogleOAuthProvider clientId={clientId}>

          <div >

            <NavPrincipal usuarioConectado={usuarioConectado} setUsuarioConectado={setUsuarioConectado} contenidoTokenUser={contenidoTokenUser} />

            <Cuerpo viajes={viajes}
              setViajes={setViajes}
              usuarioConectado={usuarioConectado}
              setUsuarioConectado={setUsuarioConectado}
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              contenidoTokenUser={contenidoTokenUser}
              setContenidoTokenUser={setContenidoTokenUser}
              usuarioConectadoVuelos={usuarioConectadoVuelos}
              setUsuarioConectadoVuelos={setUsuarioConectadoVuelos}
            />
          </div>

          <div className='mt-96'>

            <ComponenteFooter />
          </div>
        </GoogleOAuthProvider>
      </Router>

    </>)
  }

}

export default App
