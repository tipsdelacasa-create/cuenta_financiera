import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard'
import Statistics from '../pages/Statistics'
import Start from '../pages/Start'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Start/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    },
    {
        path: '/statistics',
        element: <Statistics/>
    }
])