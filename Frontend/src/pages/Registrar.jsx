import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Mensaje from '../components/Alertas.jsx'

export const Registrar = () => {
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
            const respuesta = await axios.post(url, form)
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
            setform({})
            console.log(respuesta)
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            console.log(error)
        }
    }

    return (
        <>
            <div className="min-h-screen w-full flex justify-center items-center bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
                <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 max-w-md">
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <h2 className="text-center text-3xl font-bold mb-4 text-white">Bienvenido a QuitoTech</h2>
                    <small className="text-gray-400 block my-4 text-sm text-center">Ingresa tus detalles para registrarte</small>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold text-white" htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name='nombre'
                                value={form.nombre || ""} onChange={handleChange}
                                placeholder="Ingresa tu nombre" 
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white" 
                                required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold text-white" htmlFor="apellido">Apellido:</label>
                            <input type="text" id="apellido" name='apellido'
                                value={form.apellido || ""} onChange={handleChange}
                                placeholder="Ingresa tu apellido" 
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white" 
                                required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold text-white" htmlFor="direccion">Dirección:</label>
                            <input type="text" id="direccion" name='direccion'
                                value={form.direccion || ""} onChange={handleChange}
                                placeholder="Ingresa tu dirección" 
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white" 
                                required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold text-white" htmlFor="telefono">Teléfono:</label>
                            <input type="tel" id="telefono" name='telefono'
                                value={form.telefono || ""} onChange={handleChange}
                                placeholder="Ingresa tu teléfono" 
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white" 
                                required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold text-white" htmlFor="email">Correo Electrónico:</label>
                            <input type="email" id="email" name='email'
                                value={form.email || ""} onChange={handleChange}
                                placeholder="Ingresa tu email" 
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white" 
                                required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold text-white" htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name='password'
                                value={form.password || ""} onChange={handleChange}
                                placeholder="* * * * * * * * * * *" 
                                className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white" 
                                required />
                        </div>

                        <div className="mb-3">
                            <button className=" bg-purple-500 text-slate-300 border-width:0px py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Registrar
                            </button>
                        </div>
                    </form>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p className="text-white">¿Ya tienes una cuenta?</p>
                        <Link to="/ingresar" className="py-2 px-5  bg-purple-500 text-slate-300 border-width:0px rounded-xl hover:scale-110 duration-300 hover:bg-gray-900">Ingresar</Link>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4">
                    <Link to="/"> <img src="/public/images/casa.png" alt="Volver" className="w-16 h-16" /></Link>
                </div>
            </div>
        </>
    )
}
