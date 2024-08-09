import './App.css'
import { PaginaInicial } from './pages/PaginaInicial.jsx'
import { Productos } from './pages/Productos.jsx'
import Ingresar from './pages/Ingresar.jsx'
import { Registrar } from './pages/Registrar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import Auth from './layout/Auth'
import { PrivateRoute } from './routes/PrivateRoute.jsx'
import {Forgot} from './pages/Forgot.jsx'
import { NoEncontrada } from './pages/NoEncontrada.jsx';
import Restablecer from './pages/Restablecer';
import Listar from './pages/Listar.jsx'
import Crear from './pages/Crear.jsx'
import Dashboard from './layout/Dashboard.jsx'
import Listartienda from './pages/Listartiendas.jsx'
import Visualizartienda from './pages/Visualizartiendas.jsx'

function App() {
  return (

    <BrowserRouter>
    
      <Routes>
        
        <Route index element={<PaginaInicial/>}/>
            <Route path='/' element={<Auth/>}>
            <Route path='ingresar' element={<Ingresar/>}/>
            <Route path='registrar' element={<Registrar/>}/>
            <Route path='productos' element={<Productos/>}/>
            <Route path='forgot/:id' element={<Forgot/>}/>
            <Route path='*' element={<NoEncontrada />} /> 
            <Route path='recuperar-password/:token' element={<Restablecer />} />


            

            <Route path='dashboard' element={<Dashboard />} />
            <Route path='dashboard/listar' element={<Listar />} />
            <Route path='dashboard/listartienda' element={<Listartienda />} />
            <Route path='dashboard/visualizar/:id' element={<Visualizartienda />} />
            <Route path='dashboard/crear' element={<Crear/>} />

        </Route>




        </Routes>
    
    </BrowserRouter>
  )
}

export default App
