import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../components/Alertas.jsx';

const Visualizartienda = () => {
    const { id } = useParams();
    const [tienda, setTienda] = useState({});
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarTienda = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/tienda/productos/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                const respuesta = await axios.get(url, options);
                setTienda(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarTienda();
    }, [id]);

    const handleBuscar = async () => {
        console.log("ID reconocido:", id); // Log the recognized ID

        if (!id) {
            console.error("ID no seleccionado");
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tienda/productos/${id}`);
            const data = response.data;

            console.log("Datos recibidos:", data); // Verifica los datos aquí

            if (Array.isArray(data)) {
                setProductos(data);
            } else {
                console.error("La respuesta de la API no es un array:", data);
                setProductos([]); // Limpia los productos en caso de respuesta inesperada
            }
        } catch (error) {
            console.error("Error al listar productos por ID:", error);
        }
    };

    useEffect(() => {
        handleBuscar();
    }, [id]);

    return (
<>
    <div className="min-h-screen w-full flex justify-center items-start bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
        <div className='container mx-auto p-5'>
            <div className='text-center'>
                <h1 className='font-black text-4xl text-blue-300'>Visualizar Tienda</h1>
                <hr className='my-4 border-purple-500' />
                <p className='text-blue-300 mb-4'>Este submódulo te permite visualizar los datos de la tienda</p>
            </div>
            <div className='bg-white shadow-lg rounded-lg p-8'>
                {Object.keys(tienda).length !== 0 ? (
                    <div className='flex flex-col space-y-6'>
                        <p className="text-lg text-gray-800">
                            <span className="text-white bg-purple-600 px-4 py-2 rounded-md text-lg">* Nombre de la tienda: </span>
                            {tienda.Nombre_tienda}
                        </p>
                        <p className="text-lg text-gray-800">
                            <span className="text-white bg-purple-600 px-4 py-2 rounded-md text-lg">* Dirección: </span>
                            {tienda.Direccion}
                        </p>
                        <p className="text-lg text-gray-800">
                            <span className="text-white bg-purple-600 px-4 py-2 rounded-md text-lg">* Estado: </span>
                            <span className={`bg-blue-100 text-${tienda.estado ? 'green' : 'red'}-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>
                                {tienda.estado ? "Activo" : "Inactivo"}
                            </span>
                        </p>
                    </div>
                ) : (
                    Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                )}
            </div>
            <div className='mt-10'>
                <h2 className='font-black text-3xl text-blue-300 mb-5'>Productos de la Tienda</h2>
                {productos.length > 0 ? (
                    <ul className='bg-white shadow-lg rounded-lg p-6'>
                        {productos.map((producto) => (
                            <li key={producto._id} className='border-b py-2 flex justify-between'>
                                <span>{producto.nombre}</span>
                                <span>{producto.precio}$</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='mt-5 text-purple-500'>No hay productos registrados para esta tienda.</p>
                )}
            </div>
        </div>
    </div>
</>


    );
};

export default Visualizartienda;
