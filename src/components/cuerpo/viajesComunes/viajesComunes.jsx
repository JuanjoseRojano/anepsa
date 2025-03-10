import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

        //Creo una variable que va a crear un mapa, uso Array.from para que en base del anterior mapa me cree un array de arrays y el método sort
        //devuelve 1, 0 o -1 segun sea mayor igual o menor

        const valoresChartOrdenados = new Map(Array.from(valoresChart).sort((ordenarValor1, ordenarValor2) =>
            ordenarValor1[1] - ordenarValor2[1]
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
        labels: localizacion, // Etiquetas del eje X
        datasets: [
            {
                label: 'Viajes Comunes',
                data: numeroViajes, // Datos del gráfico
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
                borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
                borderWidth: 1, // Ancho del borde
            },
        ],
    };

    // Opciones del gráfico
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Gráfico de Barras de Viajes Comunes',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div>
            <h1 className="uppercase text-white bg-gray-900 p-4 rounded-lg shadow-md">
                Todo Correcto
            </h1>

            {/* Aquí se inserta el gráfico */}
            <div className="mt-8">
                <Bar data={data} options={options} />
            </div>
        </div>
    );



}

export default ViajesComunes