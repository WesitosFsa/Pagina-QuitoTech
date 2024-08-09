import React from "react";

const Tabla = ({ productos }) => {
  console.log("Productos recibidos en Tabla:", productos);

  if (!Array.isArray(productos) || productos.length === 0) {
    return <p className="mt-4 font-black text-2xl text-gray-200">No hay productos en esta categoria seleccione otra categoria</p>;
  }

  return (
    <table className="mt-4 min-w-full bg-gray-700 bg-opacity-70">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-900 text-white">N-</th> 
          <th className="py-2 px-4 border-b border-gray-900 text-white">Nombre</th>
          <th className="py-2 px-4 border-b border-gray-900 text-white">Categoría</th>
          <th className="py-2 px-4 border-b border-gray-900 text-white">Estado</th>
          <th className="py-2 px-4 border-b border-gray-900 text-white">Tienda</th> 
          
        </tr>
      </thead>
      <tbody>
        {productos.map((producto,index) => (
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
              {producto.Nombre_tienda}
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default Tabla;
