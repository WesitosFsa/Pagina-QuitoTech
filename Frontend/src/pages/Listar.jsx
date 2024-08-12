import React from "react";
import Tabla from "../components/Productos/TablaBTienda.jsx";
import mandos from "../assets/mandos.jpg";
import consolas from "../assets/consolas.webp";
import videojuegos from "../assets/videojuegos.webp";
// ! mejorar
const Listar = () => {
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
              <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl">
                Productos
              </div>
            </li>
            <li className="text-center">
              <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl">
                Buscar
              </div>
            </li>
            <li className="text-center">
              <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl">
                Registrar tienda
              </div>
            </li>
          </ul>
        </div>
        <div className="flex-grow flex justify-center items-center">
        <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12   flex flex-col justify-start space-y-4 border border-gray-700  mt-10 mb-10 ml-10 mr-5">
            <h1 className='font-black text-4xl text-gray-200'>ONLY-GAMES</h1>
            <hr className='my-4' />
            <p className='text-gray-200 mb-4'>Si tienes tu tienda aqui podras registrarla y mandar solicitud para poder manejar tu tienda</p>
          <Tabla />
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
                    <Link to="/" onClick={() => { localStorage.clear() }}><img src="/public/images/salida.png" alt="Volver" className="w-16 h-16" /></Link>
        </div>
      </div>
    </>
  );
};

export default Listar;
