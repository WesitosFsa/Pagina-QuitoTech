import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";

const Tablatienda = () => {
  const [tiendas, setTiendas] = useState([]);
  const [userId, setUserId] = useState(null); // Para almacenar el ID del usuario

  const listartiendas = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/listartiendas`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const respuesta = await axios.get(url, options);
      setTiendas(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Obtener el ID del usuario del localStorage
    const idUsuario = localStorage.getItem('id_usuario');
    setUserId(idUsuario);
    listartiendas();
  }, []);

  return (
    <>
      {tiendas.length === 0 ? (
        <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
      ) : (
        <div className="overflow-x-auto p-4">
          <table className="mt-4 min-w-full bg-gray-700 bg-opacity-70">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-900 text-white">N°</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Nombre</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Dirección</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Estado</th>
              </tr>
            </thead>
            <tbody>
              {tiendas.map((tienda, index) => (
                <tr key={tienda._id}>
                  <td className="text-center py-2 px-4 border-b border-gray-900 text-white">{index + 1}</td>
                  <td className="text-center py-2 px-4 border-b border-gray-900 text-white">{tienda.Nombre_tienda}</td>
                  <td className="text-center py-2 px-4 border-b border-gray-900 text-white">{tienda.Direccion}</td>
                  <td className="text-center py-2 px-4 border-b border-gray-900 text-white">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${tienda.Verificado ? 'bg-green-200 text-green-600'
                        : 'bg-red-200 text-red-600'
                    }`}>
                      {tienda.Verificado ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>  
          </table>
        </div>
      )}
    </>
  );
}

export default Tablatienda;
