import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

type Cuenta = {
    descripcion: string,
    cantidad: number,
    id: number
}

const flechaI = '<'
const flechaD = '>'

export default function Dashboard() {
    const [ datos, setDatos ] = useState('')
    const [ cuentas, setCuentas ] = useState<Cuenta[]>([])
    const [ cuentaAct, setCuentaAct ] = useState<string | null>(null)
    const [ posicion, setPosicion ] = useState<number>(0)

    const last = cuentas.length - 1

    const flechaLeft = () => {
        const nuevaPosicion = posicion - 1
        if (nuevaPosicion < 0) { return }
        setPosicion(prev => prev - 1)
        setCuentaAct(cuentas[nuevaPosicion].descripcion)
    }

    const flechaRight = () => {
        const nuevaPosicion = posicion + 1
        if (nuevaPosicion > last) return
        setPosicion(prev => prev + 1)
        setCuentaAct(cuentas[nuevaPosicion].descripcion)
    }

    const handleSubmit = (e: React.FormEvent) => {
        if (!datos) { 
            e.preventDefault()
            return 
        }
        const nuevaCuenta = {
            descripcion: datos,
            cantidad: 0,
            id: Date.now()
        }
        e.preventDefault()
        setCuentas([...cuentas, nuevaCuenta])
        setDatos('')
        setCuentaAct(nuevaCuenta.descripcion)
        setPosicion(prev => prev += 1)
    }
    const navigate = useNavigate()
    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/statistics')}>Ver estadísticas</button>
            <div className='InicioDashboard'>
            <button onClick={() => navigate('/')}>Volver al inicio</button>
            <p>Se te reiniciarán todos los datos</p>
            </div>
            <div className='acciones'>
            {cuentaAct && <p>Cuenta actual: {cuentaAct}</p>}
            <button onClick={flechaLeft}>{flechaI}</button>
            <button onClick={flechaRight}>{flechaD}</button>
            <button>Añadir</button>
            <button>Eliminar</button>
            <form onSubmit={handleSubmit} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit
                }
            }}>
                <button>Crear cuenta</button>
                <input
                    type='text'
                    placeholder='Banco, ahorro, compras...'
                    onChange={(e) => setDatos(e.target.value)}
                    value={datos}
                />
            </form>
            </div>
            <div className='cuentas'>
                {cuentas.map((c) => {
                    return(
                        <div key={c.id}>
                        <p>{c.descripcion}</p>
                        <p>{c.cantidad}</p>
                        <p>{c.id}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
