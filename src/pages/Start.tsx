export default function Start() {
    return(
        <div>
            <h1>Bienvenido al gestor de finanzas</h1>
            <button onClick={() => window.location.href = '/dashboard'}>Empezar</button>
        </div>
    )
}