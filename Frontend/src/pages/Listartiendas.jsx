import React from 'react'
import Tablatienda from '../components/Tablatienda'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'

const Listartienda = () => {
    const urlActual = location.pathname
    return (
    <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
    <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 max-w-md min-h-screen flex flex-col justify-start space-y-4">
        <h2 className='text-4xl font-black text-center text-white'>QuitoTech</h2>
        <hr className="border-blue-500" />
        <ul className="mt-5 flex flex-col space-y-4">
        <li className="text-center">
            <div className="text-white bg-blue-800 px-4 py-2 rounded-lg text-xl transition duration-300 ease-in-out transform hover:bg-blue-700">Productos</div>
        </li>
        <li className="text-center">
            <div className="text-white bg-blue-800 px-4 py-2 rounded-lg text-xl transition duration-300 ease-in-out transform hover:bg-blue-700">Buscar</div>
        </li>
        <li className="text-center">
            <div className="text-white bg-blue-800 px-4 py-2 rounded-lg text-xl transition duration-300 ease-in-out transform hover:bg-blue-700">Registrar tienda</div>
        </li>
        <li className="text-center">
            <Link
            to='listartienda'
            className={`${
                urlActual === 'dashboard/listartienda'
                ? 'text-white bg-blue-800'
                : 'text-white bg-blue-800'
            } px-4 py-2 rounded-lg text-xl transition duration-300 ease-in-out transform hover:bg-blue-700`}
            >
            Visualizar tiendas
            </Link>
        </li>
        <li className="text-center">
            <Link
            to='/dashboard'
            className={`${
                urlActual === 'dashboard'
                ? 'text-white bg-blue-800'
                : 'text-white bg-blue-800'
            } px-4 py-2 rounded-lg text-xl transition duration-300 ease-in-out transform hover:bg-blue-700`}
            >
            Inicio
            </Link>
        </li>
        </ul>
    </div>
    <div className="flex-grow flex justify-center items-center p-10">
        <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 border border-gray-700">
        <h1 className='font-black text-5xl text-gray-200 text-center'>TIENDAS DISPONIBLES</h1>
        <hr className='my-4 border-gray-500' />
        <h2 className='text-2xl text-gray-200 mb-4 text-center'>TUS TIENDAS FAVORITAS A TU ALCANCE</h2>
        <Tablatienda />
        </div>
    </div>
    </div>

      )
}

export default Listartienda