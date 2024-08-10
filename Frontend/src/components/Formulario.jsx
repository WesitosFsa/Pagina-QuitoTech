import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from './Alertas';
export const Formulario = ({ tienda }) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})

    const [form, setform] = useState({
        Nombre_tienda: tienda?.Nombre_tienda ?? "",
        Direccion: tienda?.Direccion ?? "",
        email: tienda?.email ?? "",
        userId: localStorage.getItem('id_usuario') || ""
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        if (tienda?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/solicitud/`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/listar')
        }
        else {
            try {
                const token = localStorage.getItem('token')
                // form.id = auth._id
                const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/solicitud/`
                const options = {
                    headers: {
                        method: 'POST',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta: "La solicitud fue enviada, pronto resiviras una notificacion", tipo: true })
            } catch (error) {
                console.log(error)
                // setMensaje({ respuesta: error.response?.data?.msg, tipo: false })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-slate-400 uppercase font-bold text-sm'>Nombre de la Tienda: </label>
                <input
                    id='Nombre_tienda'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de tu tienda'
                    name='Nombre_tienda'
                    value={form.Nombre_tienda}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='direccion:'
                    className='text-slate-400 uppercase font-bold text-sm'>Direccion de la tienda: </label>
                <input
                    id='Direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Direccion de la tienda'
                    name='Direccion'
                    value={form.Direccion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-slate-400 uppercase font-bold text-sm'>Email de confirmacion: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Email@regitrado.com'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className='bg-purple-500 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={tienda?._id ? 'Actualizar Tienda' : 'Mandar solicitud de tienda'} />
        </form>
    )
}