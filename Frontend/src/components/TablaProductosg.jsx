import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";
import tienda from "../../../Backend/src/models/tienda.js";

const TablaproductosG = () => {
  const [productos, setProductos] = useState([]);
  const [userId, setUserId] = useState(null); 
  const [tiendaId, setTiendaId] = useState(null);

  const listarproductosIDtienda = async (tiendaId) => {
    try {
      console.log("Tienda ID:", tiendaId); // Verifica si el tiendaId es correcto antes de hacer la solicitud
      const url = `${import.meta.env.VITE_BACKEND_URL}/tienda/productos/${tiendaId}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const respuesta = await axios.get(url, options);
      setProductos(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerIdTienda = async (userId) => {
    try {
      console.log("User ID:", userId); // Verifica si el userId es correcto
      const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/tienda/${userId}`;
      const respuesta = await axios.get(url);
  
      // Accede al ID de la tienda desde la respuesta
      if (respuesta.data.tienda && respuesta.data.tienda._id) {
        const tiendaId = respuesta.data.tienda._id;
        console.log("ID de la tienda obtenida:", tiendaId); // Verifica si el tiendaId se está obteniendo correctamente
        setTiendaId(tiendaId);
        listarproductosIDtienda(tiendaId); // Listar productos de la tienda usando su ID
      } else {
        console.log("No se encontró id_tienda en la respuesta del backend");
      }
    } catch (error) {
      console.log('Error al obtener el ID de la tienda:', error);
    }
  };
  

  useEffect(() => {
    const idUsuario = localStorage.getItem('id_usuario');
    console.log("ID Usuario en localStorage:", idUsuario); // Verifica si el idUsuario está en localStorage
    setUserId(idUsuario);

    if (idUsuario) {
      obtenerIdTienda(idUsuario); // Obtener y usar el ID de la tienda
    }
  }, []);

  const actualizarProducto = async (productoId, datosActualizados) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/producto/${productoId}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      await axios.put(url, datosActualizados, options);
      listarproductosIDtienda(tiendaId); // Volver a listar productos después de actualizar
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e, productoId) => {
    e.preventDefault();
    const datosActualizados = {
      Nombre_producto: e.target.Nombre_producto.value,
      Categoria: e.target.Categoria.value,
      Estado: e.target.Estado.checked,
    };
    actualizarProducto(productoId, datosActualizados);
  };

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
                    <button onClick={(e) => handleSubmit(e, producto._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Actualizar
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
