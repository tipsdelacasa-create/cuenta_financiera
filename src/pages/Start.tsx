import { useNavigate } from 'react-router-dom'

export default function Start() {
    const navigate = useNavigate()
    return(
        <div>
            <h1>Bienvenido al gestor de finanzas</h1>
            <button onClick={() => navigate('/dashboard')}>Empezar</button>
        </div>
    )
}