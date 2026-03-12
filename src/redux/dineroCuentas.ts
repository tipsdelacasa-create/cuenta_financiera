import { createSlice } from '@reduxjs/toolkit';

interface Cuenta {
    id: number;
    cantidad: number;
    descripcion: string;
}

const initialState: Cuenta[] = []

const dineroCuentasSlice = createSlice({
    name: 'dineroCuentas',
    initialState,
    reducers: {
        incrementar: (state, action) => {
            const cuenta = state.find(c => c.id === action.payload.id);
            if (cuenta) {
                cuenta.cantidad += action.payload.cantidad;
            }
        },
        decrementar: (state, action) => {
            const cuenta = state.find(c => c.id === action.payload.id);
            if (cuenta) {
                cuenta.cantidad -= action.payload.cantidad;
            }
        },
        agregarCuenta: (state, action) => {
            state.push(action.payload)
        },
        eliminarCuenta: (state, action) => {
            return state.filter(c => c.id !== action.payload)
        },
        editarDescripcion: (state, action) => {
            const cuenta = state.find(c => c.id === action.payload.id)
            if (cuenta) {
                cuenta.descripcion = action.payload.descripcion
            }
        },
        asignarValorCuenta: (state, action) => {
            const cuenta = state.find(c => c.id === action.payload.id)
            if (cuenta) {
                cuenta.cantidad = action.payload.cantidad
            }
        }

}})

export const { incrementar, decrementar, agregarCuenta, eliminarCuenta, editarDescripcion, asignarValorCuenta } = dineroCuentasSlice.actions;
const dineroCuentasReducer = dineroCuentasSlice.reducer
export default dineroCuentasReducer;