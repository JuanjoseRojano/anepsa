import { useState, useRef } from 'react'
import { uploadJson, masterKey, rutaUsuarios, comprarBilletes } from '../../../funcionalidades/obtenerAPI';
import SelectViajes from '../../selectViajes';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Boton from '../../Boton'


function FormularioDeReserva(props) {

    const nombreDestino = useRef(null)
    const nombreSalida = useRef(null)
    const horaDeSalida = useRef(null)
    const diaSemana = useRef(null)
    const precioDeBilleteFinal = useRef(null)
    const numeroDeBilletes = useRef(null)

    const [precioDeLosBilletes, setPrecioDeLosBilletes] = useState(0)
    const [errorDeFormulario, setErrorDeFormulario] = useState(null)

    function realizarCompra(e) {
        e.preventDefault()
        comprarBilletes(
            props.usuarios,
            props.setUsuarios,
            props.usuarioConectado,
            props.setUsuarioConectado,
            nombreDestino,
            nombreSalida,
            horaDeSalida,
            diaSemana,
            precioDeBilleteFinal,
            numeroDeBilletes,
            setErrorDeFormulario
        )
    }

    return <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center m-4">
                <form onSubmit={realizarCompra} className="flex flex-col gap-4">
                    <h1>{errorDeFormulario}</h1>
                    <h1 ref={nombreDestino} className="text-2xl font-semibold text-gray-800">{props.element.destino}</h1>

                    <select ref={nombreSalida} className="p-2 border border-gray-300 rounded-md text-lg" required>
                        <SelectViajes opciones={props.element.salida} />
                    </select>

                    <select required ref={horaDeSalida} className="p-2 border border-gray-300 rounded-md text-lg">
                        <SelectViajes opciones={props.element.horariosDeVuelo} />
                    </select>

                    <select required ref={diaSemana} className="p-2 border border-gray-300 rounded-md text-lg">
                        <SelectViajes opciones={props.element.diasDeLaSemana} />
                    </select>

                    <h1 className="text-xl font-medium text-gray-600">{props.element.precio}</h1>

                    <label className="flex flex-col items-center gap-2 font-semibold">
                        Billetes
                        <input
                            type="number"
                            min="1"
                            max="20"
                            step="1"
                            placeholder="Número de billetes"
                            ref={numeroDeBilletes}
                            required
                            className="p-2 border border-gray-300 rounded-md text-lg text-center w-20"
                        />
                    </label>

                    {/* NOTA CAMBIAR ESTO CON USEREFF */}

                    <h1 ref={precioDeBilleteFinal} className="text-lg font-medium text-gray-700">{precioDeLosBilletes}</h1>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-lg transition duration-300">
                        Comprar
                    </button>
                </form>
            </div>
        </div >    </>


}

export default FormularioDeReserva