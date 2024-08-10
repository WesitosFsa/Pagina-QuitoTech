import React, { useEffect, useState } from "react";
import Tabla from "./TablaBCategoria.jsx";

const ListarProductosPorCategoria = () => {
  const [categoria, setCategoria] = useState("");
  const [productos, setProductos] = useState([]);
  const [tiendas, setTiendas] = useState([]);
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
  const productosConTiendas = productos.map(producto => {
    // Asegúrate de que id_tienda es un ID y no un objeto
    const tiendaId = producto.id_tienda?._id || producto.id_tienda; // Ajusta si es necesario
    
    if (!tiendaId) {
      console.error(`ID de tienda no definido para producto ${producto._id}`);
      return {
        ...producto,
        Nombre_tienda: "Desconocida"
      };
    }
  
    const tienda = tiendas.find(tienda => String(tienda._id) === String(tiendaId));
    console.log(`Buscando tienda con ID ${tiendaId}:`, tienda);
    return {
      ...producto,
      Nombre_tienda: tienda?.Nombre_tienda || "Desconocida"
    };
  });
  

  return (
    <div>
      <hr className="my-4" />
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
      <hr className="my-4" />
      <Tabla productos={productosConTiendas} />
      
    </div>
  );
};

export default ListarProductosPorCategoria;
