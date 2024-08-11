import logoDog from '../assets/dog-hand.webp';
import { useNavigate, useParams } from 'react-router-dom';
import Mensaje from '../components/Alertas';
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
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`;
            const respuesta = await axios.post(url, form);
            setForm({
                password: "",
                confirmpassword: ""
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg || 'Error desconocido', tipo: false });
        }
    };

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`;
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
                <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
                    {/* Mensaje de confirmación de token */}
                    {Object.keys(mensaje).length > 0 && (
                        <div className="mb-4 w-full">
                            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                        </div>
                    )}
                    {/* Texto de bienvenida */}
                    <h1 className="text-2xl font-semibold mb-2 text-center uppercase text-white">
                        Bienvenido de Nuevo
                    </h1>
                    <small className="text-white block my-4 text-sm">
                        Por favor ingresa tus detalles
                    </small>
                    {/* Imagen */}
                    <img
                        className="object-cover h-64 w-64 rounded-full border-4 border-solid border-slate-600 mb-4"
                        src={logoDog}
                        alt="dog logo"
                    />
                    {/* Formulario */}
                    {tokenback && (
                        <form className='w-full' onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-semibold text-white">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                    value={form.password}
                                    name='password'
                                    onChange={handleChange}
                                />
                                <label className="mb-2 block text-sm font-semibold text-white mt-4">Confirm password</label>
                                <input
                                    type="password"
                                    placeholder="Repeat your password"
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                    value={form.confirmpassword}
                                    name='confirmpassword'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <button
                                    type="submit"
                                    className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Restablecer;
