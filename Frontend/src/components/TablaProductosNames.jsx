import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";

const TablaproductosG = () => {
  const [categoria, setCategoria] = useState("");
  const categorias = ['Mandos','Consolas','Videojuegos','Perifericos','ComponentesPC','Otros'];
  const [productos, setProductos] = useState([]);
  const [userId, setUserId] = useState(null); 
  const [tiendaId, setTiendaId] = useState(null);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formData, setFormData] = useState({ Nombre_producto: '', Categoria: '' });

  const listarproductosIDtienda = async (tiendaId) => {
    try {
      console.log("Tienda ID:", tiendaId);
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
      console.log("User ID:", userId);
      const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/tienda/${userId}`;
      const respuesta = await axios.get(url);
  
      if (respuesta.data.tienda && respuesta.data.tienda._id) {
        const tiendaId = respuesta.data.tienda._id;
        console.log("ID de la tienda obtenida:", tiendaId);
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
    console.log("ID Usuario en localStorage:", idUsuario);
    setUserId(idUsuario);

    if (idUsuario) {
      obtenerIdTienda(idUsuario);
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
      listarproductosIDtienda(tiendaId); 
      setProductoEditando(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarProducto(productoEditando._id, formData);
  };

  const handleEditClick = (producto) => {
    setProductoEditando(producto);
    setFormData({
      Nombre_producto: producto.Nombre_producto,
      Categoria: producto.Categoria
    });
    setCategoria(producto.Categoria); // Actualiza la categoría seleccionada
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Categoria") {
      setCategoria(value); // Actualiza el estado local de categoría
    }

    setFormData({
      ...formData,
      [name]: value
    });
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
                    <button onClick={() => handleEditClick(producto)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {productoEditando && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-gray-800 text-white rounded-lg p-8 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nombre del producto</label>
                    <input
                      type="text"
                      name="Nombre_producto"
                      value={formData.Nombre_producto}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-600 rounded text-black" // Color de texto negro
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Categoría</label>
                    <select
                      name="Categoria"
                      value={categoria}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-600 rounded text-black" // Color de texto negro
                    >
                      <option value="" disabled>Seleccione una categoría</option>
                      {categorias.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <input
                      type="checkbox"
                      name="Estado"
                      checked={productoEditando.Estado} // No editable
                      className="mr-2"
                      disabled
                    />
                    Disponible
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Guardar cambios
                    </button>
                    <button type="button" onClick={() => setProductoEditando(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TablaproductosG;
