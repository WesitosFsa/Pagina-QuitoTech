import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../components/Alertas.jsx';
import notfound from '../assets/consulting.png'


export const Confirmartienda = () => {
    const { tokentienda } = useParams();
    const [mensaje, setMensaje] = useState({})
    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmartienda/${tokentienda}`
            const respuesta = await axios.get(url)
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }
    }
    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <>
            <div className="min-h-screen w-full flex justify-center items-center bg-[url('/public/images/olvidarcontra.jpg')] bg-no-repeat bg-cover bg-center">
                <div className="flex flex-col items-center justify-center">
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-3xl flex flex-col items-center justify-center">
                        <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600 mb-4" src={notfound} alt="image description" />
                        <h1 className="text-4xl font-bold mb-4 text-white text-center uppercase">Tu tienda ya se encuentra verificada</h1>
                        <p className="text-white mb-4">Ya puedes registrar tus productos</p>
                        <Link to="/ingresar" className="py-2 px-5 bg-purple-500 text-slate-300 rounded-xl hover:scale-110 duration-300 hover:bg-gray-900">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}