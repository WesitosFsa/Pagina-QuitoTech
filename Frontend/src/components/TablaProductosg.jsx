import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";

const TablaproductosG = () => {
  const [productos, setProductos] = useState([]);
  const [userId, setUserId] = useState(null); // Para almacenar el ID del usuario

  const listarproductos = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/listartiendas`;
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

  useEffect(() => {
    // Obtener el ID del usuario del localStorage
    const idUsuario = localStorage.getItem('id_usuario');
    setUserId(idUsuario);
    listarproductos();
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
      listarproductos();
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
      Direccion: e.target.Direccion.value,
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
                <th className="py-2 px-4 border-b border-gray-900 text-white">Dirección</th>
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
                    <input type="checkbox" name="Estado" defaultChecked={producto.Estado} className="bg-gray-800 text-white p-1" />
                </td>
                <td className="py-2 px-4 border-b border-gray-900 text-white text-center text-sm">
                    {producto.Direccion}
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

