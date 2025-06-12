import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function SubirScroll({ children }) {
    const { pathname } = useLocation()
    //UseEffect para posicionar el scroll en la zona superior
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return children
}

export default SubirScroll

