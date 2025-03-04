import { useState } from 'react'

function SelectViajes(props) {
    return (<>{props.opciones.map((element) => {
        return (<option >{element}</option>
        )
    })}</>)
}

export default SelectViajes
