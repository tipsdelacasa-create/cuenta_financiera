import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()
    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/statistics')}>Ver estadísticas</button>
            <div className='InicioDashboard'>
            <button onClick={() => navigate('/')}>Volver al inicio</button>
            <p>Se te reiniciarán todos los datos</p>
            </div>
        </div>
    )
}
