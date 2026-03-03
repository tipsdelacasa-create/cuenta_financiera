import { useSelector } from 'react-redux'
import type { RootState } from './store'

export function useCuentas() {
  return useSelector((state: RootState) => state.dinero)
}