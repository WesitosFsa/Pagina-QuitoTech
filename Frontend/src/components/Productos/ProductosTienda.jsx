import React, { useEffect, useState } from "react";
import Tabla from "../Tabla.jsx";

const ListarProductosPorTienda = () => {
  const [id, setId] = useState("");
  const [productos, setProductos] = useState([]);
  const [tiendas, setTiendas] = useState([]);

  useEffect(() => {
    // Obtener la lista de tiendas al montar el componente
    const obtenerTiendas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/listartiendasopciones`);
        const data = await response.json();
        console.log("Datos de tiendas:", data); // Verifica los datos aquí
        setTiendas(data);
      } catch (error) {
        console.error("Error al obtener la lista de tiendas:", error);
      }
    };
  
    obtenerTiendas();
  }, []);

  const handleBuscar = async () => {
    console.log("ID reconocido:", id); // Log the recognized ID

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tienda/productos/${id}`);
      const data = await response.json();
      const data2 = await (`${import.meta.env.VITE_BACKEND_URL}/tienda/productos/${id}`);
      
      // Verifica y ajusta el formato de los datos
      console.log(data2);
      
      // Asegúrate de que los datos son un array
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

  return (
    <div>
      {tiendas.length > 0 ? (
        <select
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="bg-slate-100 px-3 py-2 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white cursor-pointer transition-all"
        >
          <option value="" disabled>Seleccione una tienda</option>
          {tiendas.map((tienda) => (
            <option key={tienda._id} value={tienda._id}>
              {tienda.Nombre_tienda}
            </option>
          ))}
        </select>
      ) : (
        <p>Cargando tiendas...</p>
      )}
      <button onClick={handleBuscar} className="ml-2 bg-blue-800 px-3 py-2 text-white rounded-lg">
        Buscar
      </button>
      <Tabla productos={productos} />
    </div>
  );
};

export default ListarProductosPorTienda;
