import { configureStore } from '@reduxjs/toolkit'
import dineroCuentasReducer from './dineroCuentas'

export const store = configureStore({
    reducer: {
        dinero: dineroCuentasReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch