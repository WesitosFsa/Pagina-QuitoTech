import logoDog from '../../public/images/olvidarcontra.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Mensaje from '../components/Alertas.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Restablecer = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    });
    const [mensaje, setMensaje] = useState({});
    const [tokenback, setTokenBack] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/nuevo-password/${token}`;
            const respuesta = await axios.post(url, form);
            setForm({
                password: "",
                confirmpassword: ""
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setTimeout(() => {
                navigate('/ingresar');
            }, 3000);
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg || 'Error desconocido', tipo: false });
        }
    };

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/recuperar-password/${token}`;
            const respuesta = await axios.get(url);
            setTokenBack(true);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg || 'Error desconocido', tipo: false });
        }
    };

    useEffect(() => {
        verifyToken();
    }, [token]);

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
            <div className="relative z-10 w-full flex justify-center items-center">
                <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-3xl flex flex-col items-center justify-center">
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <h1 className="text-3xl font-semibold mb-4 text-center uppercase text-gray-500">Bienvenido de Nuevo</h1>
                    <form className='w-full' onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                value={form.password || ""}
                                name='password'
                                onChange={handleChange}
                            />
                            <label className="mb-2 block text-sm font-semibold mt-4">Confirmar contraseña</label>
                            <input
                                type="password"
                                placeholder="Repeat your password"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                value={form.confirmpassword || ""}
                                name='confirmpassword'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <button
                                className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white"
                            >
                                Cambiar contraseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Restablecer;
