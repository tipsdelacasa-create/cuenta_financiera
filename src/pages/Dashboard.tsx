import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCuentas } from '../redux/hooks' 
import { useDispatch } from 'react-redux'
import { agregarCuenta, eliminarCuenta, asignarValorCuenta } from '../redux/dineroCuentas'
const flechaI = '<'
const flechaD = '>'

export default function Dashboard() {
    const dispatch = useDispatch()
    const [ datos, setDatos ] = useState('')
    const [ error, setError ] = useState('')
    const [ cuentaAct, setCuentaAct ] = useState<number | null>(null)
    const [ posicion, setPosicion ] = useState<number>(0)
    const cuentas = useCuentas()
    const last = cuentas.length - 1
    const [ añadido, setAñadido ] = useState(0)
    const cuentaActDescrip = cuentas.find(c => c.id === cuentaAct)
    useEffect(() => {
        if (cuentas.length === 0) {
            setCuentaAct(null)
            return
        }

        const existe = cuentas.find(c => c.id === cuentaAct)

        if (!existe) {
            setCuentaAct(cuentas[0].id)
            setPosicion(0)
        }
    }, [cuentas])

    const flechaLeft = () => {
        const nuevaPosicion = posicion - 1 
        if (nuevaPosicion < 0) { return }
        setPosicion(prev => prev - 1)
        setCuentaAct(cuentas[nuevaPosicion].id)
    }

    const flechaRight = () => {
        const nuevaPosicion = posicion + 1
        if (nuevaPosicion > last) return
        setPosicion(prev => prev + 1)
        setCuentaAct(cuentas[nuevaPosicion].id)
    }

    const handleCambio = () => {
        if ( !añadido || cuentaAct === null) {
            return
        }
        const cuentaCambio = {
            id: cuentaAct,
            cantidad: añadido
        }
        dispatch(asignarValorCuenta(cuentaCambio))
        setAñadido(0)
    }

    const handleSubmitAdd = () => {

        const existe = cuentas.some(
            c => c.descripcion.toLowerCase() === datos.toLowerCase()
        )

        if (existe) {
            setError('Cuenta ya existente')
            return
        }

        const nuevaCuenta = {
            descripcion: datos,
            cantidad: 0,
            id: Date.now()
        }
        dispatch(agregarCuenta(nuevaCuenta))
        setDatos('')
        setCuentaAct(nuevaCuenta.id)
        setPosicion(cuentas.length)
        setError('')
    }

    const handleSubmit = (e: React.FormEvent, tipo: 'crear' | 'editar') => {
                e.preventDefault()
        if (tipo === 'crear') {
            if (!datos) {
                return 
        }
            handleSubmitAdd()
        }
    }

    const handleEliminar = () => {
        if (cuentaAct === null) return
        dispatch(eliminarCuenta(cuentaAct))
    }

    const navigate = useNavigate()
    return(
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/statistics')}>Ver estadísticas</button>
            <div className='InicioDashboard'>
            <button onClick={() => navigate('/')}>Volver al inicio</button>
            <p>Se te reiniciarán todos los datos</p>
            </div>
            <div className='acciones'>
            {cuentaActDescrip && <p>Cuenta actual: {cuentaActDescrip.descripcion}</p>}
            <button onClick={flechaLeft}>{flechaI}</button>
            <button onClick={flechaRight}>{flechaD}</button>
            <button onClick={handleEliminar}>Eliminar</button>
            <form onSubmit={(e) => handleSubmit(e, 'crear')}>
                <button>Crear cuenta</button>
                <input
                    type='text'
                    placeholder='Banco, ahorro, compras...'
                    onChange={(e) => setDatos(e.target.value)}
                    value={datos}
                />
            </form>
            <form onSubmit={(e) => {handleSubmit(e, 'editar')}}>
                <p>Añadir dinero</p>
                <input
                type='number'
                placeholder='300, 400, 100... (€)'
                onChange={(e) => setAñadido(Number(e.target.value))}
                value={añadido}
                />
                <button onClick={handleCambio}>Cambiar</button>
            </form>
            </div>
            <p>{error}</p>
        </div>
    )
}
