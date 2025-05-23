import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

//Children es el contenido de subirScroll todo lo de dentro del componente en este caso routes
function SubirScroll({ children }) {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    //Devolver children permite que al no renderizar nada el resto de componentes puedan renderizar su contenido
    return children
}

export default SubirScroll

