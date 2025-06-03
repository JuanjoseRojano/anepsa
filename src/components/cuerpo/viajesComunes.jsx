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
            if (numero != 0)
                valoresChart.set(elementViajes.destino, numero)
        })

        const valoresChartOrdenados = new Map(Array.from(valoresChart).sort((a, b) =>
            b[1] - a[1]
        ))

        const diasOrdenados = []
        const numerosOrdenados = []

        valoresChartOrdenados.forEach((numero, dia) => {

            if (diasOrdenados.length != 10) {
                diasOrdenados.push(dia)
            }

            if (numerosOrdenados.length != 10) {
                numerosOrdenados.push(numero)
            }

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

        <div className="mt-8 w-full flex justify-center">
            <div className="w-full max-w-2xl px-4">

                <div className="relative h-64 sm:h-72 md:h-96">
                    <Pie data={data} options={options} />
                </div>
            </div>
        </div>


    )
}



export default ViajesComunes
