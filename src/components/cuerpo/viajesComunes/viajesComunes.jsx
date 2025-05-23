// import { useState, useEffect } from 'react'
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function ViajesComunes(props) {

//     const [localizacion, useLocalizacion] = useState(null)
//     const [numeroViajes, useNumeroViajes] = useState(null)


//     useEffect(() => {


//         let valoresChart = new Map()

//         props.viajes.map((elementViajes) => {
//             let numero = 0

//             props.usuarios.map((elementUsuarios) => {

//                 elementUsuarios.viajes.map((elementUsuariosViajes) => {

//                     if (elementViajes.destino === elementUsuariosViajes.destino) {

//                         numero++


//                     }
//                 })
//             })

//             valoresChart.set(elementViajes.destino, numero)

//         })

//         //Creo una variable que va a crear un mapa, uso Array.from para que en base del anterior mapa me cree un array de arrays y el método sort
//         //devuelve 1, 0 o -1 segun sea mayor igual o menor

//         const valoresChartOrdenados = new Map(Array.from(valoresChart).sort((ordenarValor1, ordenarValor2) =>
//             ordenarValor1[1] - ordenarValor2[1]
//         ))

//         const diasOrdenados = []
//         const numerosOrdenados = []

//         valoresChartOrdenados.forEach((numero, dia) => {
//             diasOrdenados.push(dia)
//             numerosOrdenados.push(numero)
//         })



//         useLocalizacion(diasOrdenados)
//         useNumeroViajes(numerosOrdenados)



//     }, [props.usuarios, props.viajes])





//     const data = {
//         labels: localizacion,
//         datasets: [
//             {
//                 label: 'Viajes Comunes',
//                 data: numeroViajes,
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//             },
//         ],
//     }

//     const options = {
//         responsive: true,
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Los 10 viajes mas comunes de los usuarios',
//             },
//             tooltip: {
//                 enabled: true,
//             },
//         },
//     }

//     return (
//         <div className="mt-8">
//             <Bar data={data} options={options} />
//         </div>
//     )



// }

// export default ViajesComunes

import { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function ViajesComunes(props) {

    const [localizacion, useLocalizacion] = useState(null)
    const [numeroViajes, useNumeroViajes] = useState(null)

    useEffect(() => {
        let valoresChart = new Map()

        props.viajes.map((elementViajes) => {
            let numero = 0

            props.usuarios.map((elementUsuarios) => {

                elementUsuarios.viajes.map((elementUsuariosViajes) => {

                    if (elementViajes.destino === elementUsuariosViajes.destino) {
                        numero++
                    }
                })
            })

            valoresChart.set(elementViajes.destino, numero)
        })

        const valoresChartOrdenados = new Map(Array.from(valoresChart).sort((a, b) =>
            a[1] - b[1]
        ))

        const diasOrdenados = []
        const numerosOrdenados = []

        valoresChartOrdenados.forEach((numero, dia) => {
            diasOrdenados.push(dia)
            numerosOrdenados.push(numero)
        })

        useLocalizacion(diasOrdenados)
        useNumeroViajes(numerosOrdenados)

    }, [props.usuarios, props.viajes])

    const data = {
        labels: localizacion,
        datasets: [
            {
                label: 'Viajes Comunes',
                data: numeroViajes,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#C9CBCF',
                    '#8A2BE2',
                    '#00FF7F',
                    '#DC143C'
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Los 10 viajes más comunes de los usuarios',
            },
            legend: {
                display: true,
                position: 'right',
            },
            tooltip: {
                enabled: true,
            },
        },
    }

    return (
        <div className="mt-8">
            <Pie data={data} options={options} />
        </div>
    )
}

export default ViajesComunes
