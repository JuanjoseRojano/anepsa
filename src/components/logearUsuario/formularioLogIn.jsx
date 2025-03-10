import { useState, useEffect } from 'react'
import Boton from '../Boton'
import useClassNameError from '../../hooks/useClassNameError'
function FormularioLogin(props) {

    const classNameError = useClassNameError(props.error);

    return (
        <div className="flex flex-col justify-center items-center  bg-gray-100 ">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
                <h1 className={classNameError}>{props.error}</h1>
                <h1 className="text-2xl font-bold text-center">{props.tituloFormulario}</h1>

                <form onSubmit={props.funcionFormulario} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="nombre" className="text-gray-700 font-medium">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            ref={props.logInNombre}
                            required
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="contraseña" className="text-gray-700 font-medium">Contraseña:</label>
                        <input
                            type="password"
                            id="contraseña"
                            name="contraseña"
                            ref={props.logInContraseña}
                            required
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-center">
                        <Boton
                            type="submit"
                            nombreBoton="Iniciar Sesión"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormularioLogin
