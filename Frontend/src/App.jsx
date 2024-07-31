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

function App() {
  return (

    <BrowserRouter>
    <AuthProvider>
      <Routes>
        
        <Route index element={<PaginaInicial/>}/>
            <Route path='/' element={<Auth/>}>
            <Route path='productos' element={<Productos/>}/>
            <Route path='ingresar' element={<Ingresar/>}/>
            <Route path='registrar' element={<Registrar/>}/>
            <Route path='forgot/:id' element={<Forgot/>}/>
            <Route path='*' element={<NoEncontrada />} />
            <Route path='recuperar-password/:token' element={<Restablecer />} />

        </Route>



        </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
