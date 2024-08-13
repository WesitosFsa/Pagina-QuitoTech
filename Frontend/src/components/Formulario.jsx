import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Formulario = ({ tienda }) => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        Nombre_tienda: tienda?.Nombre_tienda ?? "",
        Direccion: tienda?.Direccion ?? "",
        email: tienda?.email ?? "",
        id_usuario: localStorage.getItem('id_usuario') || ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            Swal.fire({
                title: 'Error',
                text: 'El correo electrónico no es válido',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const storedEmail = localStorage.getItem('email');
        if (form.email !== storedEmail) {
            Swal.fire({
                title: 'Error',
                text: 'Email incorrecto',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/solicitud/`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            
            if (tienda?._id) {
                // Actualizar tienda
                await axios.put(url, form, { ...options, method: 'PUT' });
                navigate('/dashboard/listar');
            } else {
                // Crear nueva tienda
                await axios.post(url, form, { ...options, method: 'POST' });
                Swal.fire({
                    title: 'Éxito',
                    text: 'Se ha enviado tu solicitud. Pronto recibirás una respuesta.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                localStorage.clear();
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.msg || 'Hubo un problema al enviar tu solicitud.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor='Nombre_tienda'
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
                    htmlFor='Direccion'
                    className='text-slate-400 uppercase font-bold text-sm'>Dirección de la tienda: </label>
                <input
                    id='Direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Dirección de la tienda'
                    name='Direccion'
                    value={form.Direccion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email'
                    className='text-slate-400 uppercase font-bold text-sm'>Email de confirmación: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Email@registrado.com'
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
    );
};
