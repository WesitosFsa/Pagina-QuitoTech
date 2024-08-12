import React, { useState } from "react";
import ListarProductosPorCategoria from "../components/Productos/ProductosCategoria";
import ListarProductosPorTienda from "../components/Productos/ProductosTienda.jsx";
import { Link } from "react-router-dom";
const BuscarProducto = () => {
  const [mostrarTabla, setMostrarTabla] = useState(null);

  const handleShowTable = (tipo) => {
    setMostrarTabla(tipo);
  };

  return (
    <>
      <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
        <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 max-w-md min-h-screen flex flex-col justify-start space-y-4">
          <h2 className="text-4xl font-black text-center text-white">
            QuitoTech
          </h2>
          <hr className="border-blue-500" />
          <ul className="mt-5 flex flex-col space-y-4">
            <li className="text-center">
              <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                <Link to="/dashboard">Inicio</Link>
              </div>
            </li>
            <li className="text-center">
              <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                <Link to="/dashboard/listartienda">Buscar Tienda</Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex-grow flex justify-center items-center">
          <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 flex flex-col justify-start space-y-4 border border-gray-700 mt-10 mb-10 ml-10 mr-5">
            <h1 className="font-black text-4xl text-gray-200">Buscar producto</h1>
            <hr className="my-4" />
            <p className="text-gray-200 mb-4">
              Dentro de aquí podrás buscar el producto de tu interés a comprar su tienda y su ubicación
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => handleShowTable('nombreTienda')}
                className="bg-green-500 px-3 py-2 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all"
              >
                Buscar Productos por Nombre de tienda
              </button>
              <button
                onClick={() => handleShowTable('categoria')}
                className="bg-blue-500 px-3 py-2 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all"
              >
                Buscar Productos por categoría
              </button>
            </div>
            {mostrarTabla === 'categoria' && <ListarProductosPorCategoria />}
            {mostrarTabla === 'nombreTienda' && <ListarProductosPorTienda />}
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
                    <Link to="/" onClick={() => { localStorage.clear() }}><img src="/public/images/salida.png" alt="Volver" className="w-16 h-16" /></Link>
            </div>
      </div>
    </>
  );
};

export default BuscarProducto;
