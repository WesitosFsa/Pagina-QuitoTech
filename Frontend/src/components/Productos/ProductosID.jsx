import React, { useState } from "react";
import Tabla from "./TablaBTienda.jsx";

const ListarProductosPorID = () => {
  const [id, setId] = useState("");
  const [productos, setProductos] = useState([]);

  const handleBuscar = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/producto/listarproductos/${id}`);
      const data = await response.json();
      
      // Verifica y ajusta el formato de los datos
      console.log("Datos recibidos:", data);
      
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
      <input
        type="text"
        placeholder="Ingrese ID del producto"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="bg-slate-100 px-3 py-2 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white cursor-pointer transition-all"
      />
      <button onClick={handleBuscar} className="ml-2 bg-blue-800 px-3 py-2 text-white rounded-lg">
        Buscar
      </button>
      <Tabla productos={productos} />
    </div>
  );
};

export default ListarProductosPorID;
