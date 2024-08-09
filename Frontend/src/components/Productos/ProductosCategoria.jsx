import React, { useState } from "react";
import Tabla from "../Tabla.jsx";

const ListarProductosPorCategoria = () => {
  const [categoria, setCategoria] = useState("");
  const [productos, setProductos] = useState([]);

  const categorias = ['Mandos','Consolas','Videojuegos','Perifericos','ComponentesPC','Otros']; // Agrega las categorías que necesites

  const handleBuscar = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/productos/categoria/${categoria}`);
      const data = await response.json();
      setProductos(data.productos);
    } catch (error) {
      console.error("Error al listar productos por categoría:", error);
    }
  };

  return (
    <div>
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="bg-slate-100 px-3 py-2 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white cursor-pointer transition-all"
      >
        <option value="" disabled>Seleccione una categoría</option>
        {categorias.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={handleBuscar} className="ml-2 bg-blue-800 px-3 py-2 text-white rounded-lg">
        Buscar
      </button>
      <Tabla productos={productos} />
    </div>
  );
};

export default ListarProductosPorCategoria;
