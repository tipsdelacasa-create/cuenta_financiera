import { useCuentas } from '../redux/hooks'
import { useMemo } from 'react'

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


export default function Statistics() {
        const cuentas = useCuentas()
        const data = useMemo(() => ({
        labels: cuentas.map(cuenta => cuenta.descripcion),
        datasets: [
        {
            label: 'Dinero',
            data: cuentas.map(cuenta => cuenta.cantidad),
            backgroundColor: 'blue'
        }
    ]
    }), [cuentas])
    return(
        <div>
            <header>
            <h1>Dashboard -- Statistics</h1>
            <button onClick={() => window.location.href = '/dashboard'}>Volver al dashboard</button>
            <div className='InicioDashboard'>
            <button onClick={() => window.location.href = '/'}>Volver al inicio</button>
            <p>Se te reiniciarán todos los datos</p>
            </div>
            </header>
            <div className='Gráficas'>
        <Pie data={data} />
        <Bar data={data} />
        <Line data={data} />
            </div>
        </div>
    )
}
