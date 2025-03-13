import { useState, useEffect } from 'react'
import { getJson, masterKey, rutaUsuarios, rutaViajes } from './funcionalidades/obtenerAPI';
import Cargando from './components/cargando'
import NavPrincipal from './components/nav/navPrincipal'
import Cuerpo from './components/cuerpo/cuerpo'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'
import './App.css'
import ComponenteFooter from './components/componenteFooter';
function App() {
  const [usuarios, setUsuarios] = useState(null)
  const [viajes, setViajes] = useState(null)
  const [usuarioConectado, setUsuarioConectado] = useState(null)

  // Debo utilizar useEffect para realizar funciones de peticion ya que me permite
  // desde aqui cambiar el state al ejecutar efectos secundarios de manera controlada,
  //  es decir, para realizar tareas como obtener datos desde una API
  useEffect(() => {
    const fetchDatosUsuarios = async () => {
      const data = await getJson(rutaUsuarios, masterKey)
      setUsuarios(data.record)
    }

    fetchDatosUsuarios()


    const fetchDatosViajes = async () => {
      const data = await getJson(rutaViajes, masterKey)
      setViajes(data.record)
    }

    fetchDatosViajes()
  },
    // Al enviarlo vacio no esta pendiente de ningun cambio por lo que se ejecuta 1 sola vez
    [])


  if (usuarios === null || viajes === null) {

    return (<Cargando></Cargando>)
  }
  else {
    return (<>
      <Router>
        <div >
          <NavPrincipal usuarioConectado={usuarioConectado} setUsuarioConectado={setUsuarioConectado} />
          <Cuerpo viajes={viajes}
            usuarioConectado={usuarioConectado}
            setUsuarioConectado={setUsuarioConectado}
            usuarios={usuarios}
            setUsuarios={setUsuarios}
          />
        </div>
        <div className='mt-96'>
          <ComponenteFooter />
        </div>
      </Router>

    </>)
  }

}

export default App
