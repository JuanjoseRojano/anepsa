import { useState } from 'react'

function Muestras(props) {
    return (<>

        <div className="p-4 w-3/5 mx-10">
            <h6 className="text-gray-500 mb-4 uppercase font-semibold text-sm">
                {props.titulo}
            </h6>

            <h4 className="text-gray-800 mb-2 font-semibold text-xl">
                {props.subtitulo}
            </h4>

            <p className="text-gray-500 mb-8 text-base">

                {props.texto}

            </p>
        </div></>
    )




}

export default Muestras
