import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";

const Tablatienda = () => {
  const [tiendas, setTiendas] = useState([]);

  const listartiendas = async () => {
    try { 
      //const token = localStorage.getItem("token");
      //console.log(token);
      const url = `${import.meta.env.VITE_BACKEND_URL}/listartiendas`
      const options = {
      headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`
      }
      };
      const respuesta = await axios.get(url, options);
      setTiendas(respuesta.data, ...tiendas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listartiendas();
  }, []);

  return (
<>
  {tiendas.length === 0 ? (
    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
  ) : (
    <div className="overflow-x-auto p-4">
      <table className='w-full mt-5 table-auto shadow-lg bg-gray-50 rounded-lg border border-gray-300'>
        <thead className='bg-gradient-to-r from-blue-500 to-teal-500 text-white'>
          <tr>
            <th className='p-4 text-left font-medium text-sm'>N°</th>
            <th className='p-4 text-left font-medium text-sm'>Nombre</th>
            <th className='p-4 text-left font-medium text-sm'>Dirección</th>
            <th className='p-4 text-left font-medium text-sm'>Estado</th>
          </tr>
        </thead>
        <tbody>
          {tiendas.map((tienda, index) => (
            <tr className="border-b border-gray-200 hover:bg-gray-100 text-left transition-all duration-300" key={tienda._id}>
              <td className='p-4 text-sm'>{index + 1}</td>
              <td className='p-4 text-sm'>{tienda.Nombre_tienda}</td>
              <td className='p-4 text-sm'>{tienda.Direccion}</td>
              <td className='p-4 text-sm'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${tienda.Verificado ? 'bg-green-200 text-green-600'
                    : 'bg-red-200 text-red-600'
                }`}>
                  {tienda.Verificado ? "Activo" : "Inactivo"}
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