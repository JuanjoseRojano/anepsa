import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function DatePickerCalendario(props) {

    useEffect(() => {
        props.setFecha(props.fechaInicial)
    }, [])
    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
                {props.texto}
            </label>
            <DatePicker
                selected={props.fecha}
                maxDate={props.fechaMaxima}
                minDate={props.fechaMinima}
                portal={true}
                onChange={((date) => {
                    props.setFecha(date)
                })}
                className="w-full relative z-0  p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
    )

}
// 🔍 Comparación
// isBefore(date1, date2)

// isAfter(date1, date2)

// isSameDay(date1, date2)

// compareAsc(), compareDesc()

// 🕒 Formato
// format() – formatea la fecha con patrones como 'dd/MM/yyyy'

// formatDistance() – "hace 2 días", "en 5 minutos", etc.

// formatRelative() – "mañana a las 10", "ayer", etc.

// 📊 Rangos y duración
// differenceInDays(), differenceInMonths(), etc.

// intervalToDuration()

// eachDayOfInterval(), eachWeekOfInterval(), etc.

// ✅ Validación
// isValid()

// parse() – para convertir string a Date

// ⏱️ Otros útiles
// parseISO() – útil si trabajas con fechas en formato ISO

// toDate() – convierte timestamps o strings a Date

// getDaysInMonth()




export default DatePickerCalendario
