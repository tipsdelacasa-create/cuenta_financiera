import { router } from './app/router';
import { RouterProvider } from 'react-router-dom';
import './App.css'
export default function App() {
  return(
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}