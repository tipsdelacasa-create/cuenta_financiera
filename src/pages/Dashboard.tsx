export default function Dashboard() {
    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => window.location.href = '/statistics'}>Ver estadísticas</button>
            <div className='InicioDashboard'>
            <button onClick={() => window.location.href = '/'}>Volver al inicio</button>
            <p>Se te reiniciarán todos los datos</p>
            </div>
        </div>
    )
}
