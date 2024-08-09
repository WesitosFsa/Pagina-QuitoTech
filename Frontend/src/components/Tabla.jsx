import React from "react";

const Tabla = ({ productos }) => {
  console.log("Productos recibidos en Tabla:", productos);

  if (!Array.isArray(productos)) {
    return <p>No se encontraron productos</p>;
  }

  return (
    <table className="min-w-full bg-gray-700 bg-opacity-70">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-900 text-white">ID</th>
          <th className="py-2 px-4 border-b border-gray-900 text-white">Nombre</th>
          <th className="py-2 px-4 border-b border-gray-900 text-white">Categoría</th>
          <th className="py-2 px-4 border-b border-gray-900 text-white">Precio</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto._id}>
            <td className="py-2 px-4 border-b border-gray-900 text-white">{producto._id}</td>
            <td className="py-2 px-4 border-b border-gray-900 text-white">{producto.Nombre_producto}</td>
            <td className="py-2 px-4 border-b border-gray-900 text-white">{producto.Categoria}</td>
            <td className="py-2 px-4 border-b border-gray-900 text-white">{producto.Estado}</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};

export default Tabla;
