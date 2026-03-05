import { useCuentas } from '../redux/hooks'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from "chart.js"

import { Line, Bar, Pie } from "react-chartjs-2"


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
)

const options = {
    responsive: true,
    maintainAspectRation: false,
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: false
            }
        }
    },
    animation: {
        duration: 1500
    },
    plugins: {
        legend: {
            position: 'right' as const
        }
    }
}

export default function Statistics() {
    const navigate = useNavigate()
    const [grafico, setGrafico ] = useState('pie')

    const cuentas = useCuentas()
    const data = useMemo(() => ({
        labels: cuentas.map(cuenta => cuenta.descripcion),
        datasets: [
        {
            label: 'Dinero',
            data: cuentas.map(cuenta => cuenta.cantidad),
            backgroundColor: 'lightblue',
            borderColor: 'blue',
            tension: 0.4
        }
    ]
    }), [cuentas])
    return(
        <div>
            <header>
            <h1>Dashboard -- Statistics</h1>
            <button onClick={() => navigate('/dashboard')}>Volver al dashboard</button>
            <div className='InicioDashboard'>
            <button onClick={() => navigate('/')}>Volver al inicio</button>
            <p>Se te reiniciarán todos los datos</p>
            </div>
            </header>
            <div className='HabilitarGráficas'>
                <button onClick={() => setGrafico("pie")}>Pie</button>
                <button onClick={() => setGrafico("bar")}>Bar</button>
                <button onClick={() => setGrafico("line")}>Line</button>
            </div>
            <div className='Gráficas' style={{ height: '400px', width: '600px'}}>
                {grafico === 'pie' && <Pie data={data} options={options}/>}
                {grafico === 'bar' && <Bar data={data} options={options}/>}
                {grafico === 'line' && <Line data={data} options={options}/>}
            </div>
        </div>
    )
}
