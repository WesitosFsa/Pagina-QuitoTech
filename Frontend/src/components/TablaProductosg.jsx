import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";

const TablaproductosG = ({ handleStatus, productos, setProductos }) => {
  const [userId, setUserId] = useState(null); 
  const [tiendaId, setTiendaId] = useState(null);

  const listarproductosIDtienda = async (tiendaId) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/tienda/productos/${tiendaId}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const respuesta = await axios.get(url, options);
      setProductos(respuesta.data); // Actualiza los productos cuando se monta el componente
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerIdTienda = async (userId) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/tienda/${userId}`;
      const respuesta = await axios.get(url);
  
      if (respuesta.data.tienda && respuesta.data.tienda._id) {
        const tiendaId = respuesta.data.tienda._id;
        setTiendaId(tiendaId);
        listarproductosIDtienda(tiendaId);
      } else {
        console.log("No se encontró id_tienda en la respuesta del backend");
      }
    } catch (error) {
      console.log('Error al obtener el ID de la tienda:', error);
    }
  };
  
  useEffect(() => {
    const idUsuario = localStorage.getItem('id_usuario');
    setUserId(idUsuario);

    if (idUsuario) {
      obtenerIdTienda(idUsuario);
    }
  }, []);

  return (
    <>
      {productos.length === 0 ? (
        <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
      ) : (
        <div className="overflow-x-auto p-4">
          <table className="mt-4 min-w-full bg-gray-700 bg-opacity-70">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-900 text-white">N-</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Nombre</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Categoría</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Estado</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={producto._id}>
                  <td className="py-2 px-4 border-b border-gray-900 text-white text-center text-sm">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-900 text-white text-center text-sm">
                    {producto.Nombre_producto}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-900 text-white text-center text-sm">
                    {producto.Categoria}    
                  </td>
                  <td className="py-2 px-4 border-b border-gray-900 text-center">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${producto.Estado ? 'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300'}`}>
                      {producto.Estado ? 'Disponible' : 'Agotado'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-900 text-white text-center text-sm">
                    <button onClick={() => handleStatus(producto._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      {producto.Estado ? 'Marcar como Agotado' : 'Marcar como Disponible'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TablaproductosG;


