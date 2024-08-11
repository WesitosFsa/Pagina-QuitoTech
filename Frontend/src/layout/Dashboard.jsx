import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'


const Dashboard = () => {
    const [propietario, setPropietario] = useState(null);

    useEffect(() => {
        // Obtener el valor de propietario desde localStorage
        const propietarioLocalStorage = localStorage.getItem('propietario');
        console.log('Valor recuperado de localStorage:', propietarioLocalStorage);
        // Convertir el valor a booleano
        setPropietario(propietarioLocalStorage === 'true');
    }, []);
    return (
        <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
            <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 max-w-md min-h-screen flex flex-col justify-start space-y-4">
                <h2 className='text-4xl font-black text-center text-white'>QuitoTech</h2>
                <hr className="border-blue-500" />
                <ul className="mt-5 flex flex-col space-y-4">
                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                            <Link to="/dashboard/buscar">Productos</Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                            <Link to="/dashboard/buscar">
                                Buscar Tienda
                            </Link>
                        </div>
                    </li>

                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                            <Link to={propietario ? "/dashboard/buscar" : "/dashboard/confirmacion"}>
                                Registrar tienda
                            </Link>
                        </div>
                    </li>
                    <li className="text-center">

                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                            <Link to="/dashboard/crearproducto">Registrar Producto</Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex-grow flex justify-center items-center">
                <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 flex flex-wrap gap-6 border border-gray-700 mt-10 mb-10 ml-10 mr-5">
                    <hr className='my-4 w-full' />
                    <h2 className='text-4xl font-black text-center text-white'>Lista de productos principales</h2>
                    <hr className='my-4 w-full' />
                    <div className='text-center shadow-2xl p-10 rounded-xl md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
                        <h2 className='text-lg font-medium pt-8 pb-2 text-white'>COMPONENTES PC</h2>
                        <p className='py-4 text-white'>
                            Encuentra los mejores componentes para personalizar y potenciar tu PC, adaptados a todas tus necesidades.
                        </p>
                        <p className='text-white py-1'>Tarjetas RAM</p>
                        <p className='text-white py-1'>Microprocesadores</p>
                        <p className='text-white py-1'>Ventiladores</p>
                        <p className='text-white py-1'>Fuente de Energía</p>
                    </div>

                    <div className='text-center shadow-2xl p-10 rounded-xl md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
                        <h2 className='text-lg font-medium pt-8 pb-2 text-white'>PERIFÉRICOS</h2>
                        <p className='py-4 text-white'>
                            Mejora tu configuración con nuestra gama de periféricos, desde teclados y ratones hasta auriculares.
                        </p>
                        <p className='text-white py-1'>Teclados</p>
                        <p className='text-white py-1'>Mouses</p>
                        <p className='text-white py-1'>Auriculares</p>
                        <p className='text-white py-1'>Micrófonos</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard