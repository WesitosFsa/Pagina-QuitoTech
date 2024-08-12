import React from 'react'
import { useState,useEffect } from "react";
import { FormularioPro } from '../components/FormularioPro.jsx'
import { Link } from 'react-router-dom'
import tienda from "../assets/1.jpg";
import tienda2 from "../assets/2.jpg";
import tienda3 from "../assets/3.jpg";

const CrearProducto = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [tienda, tienda2, tienda3]; // Reemplaza con las imágenes reales
    const totalSlides = slides.length;

    const showSlide = (index) => {
      const carouselImages = document.querySelector('.carousel-images');
      if (carouselImages) {
          const offset = -index * 100;
          carouselImages.style.transform = `translateX(${offset}%)`;
      } else {
          console.error('No se pudo encontrar el elemento con la clase "carousel-images".');
      }
  };
  
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    useEffect(() => {
        showSlide(currentSlide);
    }, [currentSlide]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center">
            <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 max-w-md min-h-screen flex flex-col justify-start space-y-4">
                <h2 className='text-4xl font-black text-center text-white'>QuitoTech</h2>
                <hr className="border-blue-500" />
                <ul className="mt-5 flex flex-col space-y-4">
                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                        <Link to="/dashboard">Inicio</Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                        <Link to="/dashboard/crearproducto">Nuevo Producto</Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="text-white bg-blue-800 px-3 py-2 rounded-md text-xl hover:bg-blue-700">
                        <Link to="/dashboard/actualizarproducto">Actualizar Productos</Link>
                        </div>
                    </li>
                </ul>
              </div>
              

              <div className="flex-grow flex justify-center items-center">
                                <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12   flex flex-col justify-start space-y-4 border border-gray-700  mt-10 mb-10 ml-10 mr-5">
                                <h1 className='font-black text-4xl text-gray-200 text-center'>Administra tu tienda</h1>

                <p className='text-gray-200 mb-4 text-center'>
                    Dentro de este apartado tu podras añadir productos para que mas usuarios lo puedan
                    ver ademas de cambiar el estado de un producto o actualizarlo
                </p>
                <p className='text-gray-200 mb-4 text-center'>
                    Recuerda que QuitoTech es una plataforma de divulgacion tecnologica por lo
                    que debes tener en cuenta que es vital que tu negocio este enfocado en este ambito
                </p>
                <div className="relative max-w-md overflow-hidden rounded-lg mt-5 mx-auto">
                    <div className="carousel-images flex transition-transform duration-500 ease-in-out">
                        {slides.map((slide, index) => (
                            <div key={index} className="carousel-item relative w-full flex-shrink-0">
                                <img src={slide} alt={`Tienda ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
                                <div className="carousel-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold bg-black bg-opacity-50 p-2 rounded text-center">
                                    {index === 0 && '¡Añade tus productos!'}
                                    {index === 1 && '¡Usuarios personalizados e interesados en productos gamer podran encontrar tu tienda!'}
                                    {index === 2 && '¡Registra con confianza!'}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="carousel-buttons absolute top-1/2 w-full flex justify-between transform -translate-y-1/2">
                        <button className="carousel-button bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full ml-2" onClick={prevSlide}>❮</button>
                        <button className="carousel-button bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full mr-2" onClick={nextSlide}>❯</button>
                    </div>
                    <div className="text-center mt-5">
                    </div>
                </div>
                </div>
            </div>
            <div className="absolute bottom-4 left-4">
                    <Link to="/" onClick={() => { localStorage.clear() }}><img src="/public/images/salida.png" alt="Volver" className="w-16 h-16" /></Link>
            </div>
        </div>
    )

}

export default CrearProducto