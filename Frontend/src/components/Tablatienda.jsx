import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";

const Tablatienda = () => {
  const navigate = useNavigate();
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

  const handleDelete = async (id) => {
    try {
      const confirmar = confirm(
        "Vas a registrar la salida de una tienda, ¿Estás seguro de realizar esta acción?"
      );
      if (confirmar) {
        //const token = localStorage.getItem("token");
        const url = `${
          import.meta.env.VITE_BACKEND_URL}/tienda/eliminar/${id}`;
        const headers = {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`,
        };
        const data = {
          salida: new Date().toString(),
        };
        await axios.delete(url, { headers, data });
        listartiendas();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listartiendas();
  }, []);

  return (<>
    {
        tiendas.length === 0
            ?
            <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            :
            <table className='w-full mt-5 table-auto shadow-lg bg-white rounded-lg'>
                <thead className='bg-purple-600 text-white'>
                    <tr>
                        <th className='p-4'>N°</th>
                        <th className='p-4'>Nombre</th>
                        <th className='p-4'>Dirección</th>
                        <th className='p-4'>Estado</th>
                        <th className='p-4'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tiendas.map((tiendas, index) => (
                            <tr className="border-b hover:bg-purple-100 text-center" key={tiendas._id}>
                                <td className='p-4'>{index + 1}</td>
                                <td className='p-4'>{tiendas.Nombre_tienda}</td>
                                <td className='p-4'>{tiendas.Direccion}</td>
                                <td className='p-4'>
                                    <span className="bg-blue-200 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                                        {tiendas.estado && "Activo"}
                                    </span>
                                </td>
                                <td className='py-2 text-center'>
                                    <MdNoteAdd className="h-6 w-6 text-blue-600 cursor-pointer inline-block mr-2" 
                                    onClick={() => navigate(`/dashboard/visualizar/${tiendas._id}`)}
                                    />
                                    {
                                        // auth.rol === "veterinario" &&
                                        <>
                                            <MdDeleteForever className="h-6 w-6 text-red-600 cursor-pointer inline-block" 
                                            onClick={() => { handleDelete(tiendas._id) }}
                                            />
                                        </>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    }
</>
  );
};

export default Tablatienda;