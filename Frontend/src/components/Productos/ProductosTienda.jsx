import React, { useEffect, useState } from "react";
import Tabla from "./TablaBTienda.jsx";

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

    if (!id) {
      console.error("ID no seleccionado");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tienda/productos/${id}`);
      const data = await response.json();
      
      console.log("Datos recibidos:", data); // Verifica los datos aquí

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

  console.log("Productos:", productos);
  console.log("Tiendas:", tiendas);

  const productosConTiendas = productos.map(producto => {
    // Asegúrate de que id_tienda es un ID y no un objeto
    const tiendaId = producto.id_tienda?._id || producto.id_tienda; // Ajusta si es necesario
    
    if (!tiendaId) {
      console.error(`ID de tienda no definido para producto ${producto._id}`);
      return {
        ...producto,
        Direccion: "Desconocida"
      };
    }

    const tienda = tiendas.find(tienda => String(tienda._id) === String(tiendaId));
    console.log(`Buscando tienda con ID ${tiendaId}:`, tienda);
    return {
      ...producto,
      Direccion: tienda?.Direccion || "Desconocida"
    };
  });

  console.log("Productos con tiendas:", productosConTiendas);

  return (
    <div>
      <hr className="my-4" />

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
      <hr className="my-4" />
      <Tabla productos={productosConTiendas} />
    </div>
  );
};

export default ListarProductosPorTienda;
