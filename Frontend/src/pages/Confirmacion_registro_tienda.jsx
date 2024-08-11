import React, { useState, useEffect } from 'react';
import tienda from "../assets/perifericos.jpg";
import { Link } from 'react-router-dom';
import carrusel3 from "../../public/images/imagen_carrusel_3.jpg";
import carrusel2 from "../../public/images/imagen_carrusel_2.webp";
import logoGamer from '../assets/gamer.png';
const Crear = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [tienda, carrusel2, carrusel3]; // Reemplaza con las imágenes reales
    const totalSlides = slides.length;

    const showSlide = (index) => {
        const offset = -index * 100;
        document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
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
        <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/paginalogin.png')] bg-no-repeat bg-cover bg-center relative">
            <div className="flex-grow flex justify-center items-center">
                <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 flex flex-col justify-start space-y-4 border border-gray-700 mt-10 mb-10 ml-10 mr-5">
                    <h1 className='font-black text-4xl text-gray-200 text-center'>Crea y únete a la tendencia de tiendas en Quito-Tech!!</h1>

                    <p className='text-gray-200 mb-4 text-center'>
                        Da el siguiente paso para hacer crecer tu negocio y llegar a más clientes.
                        Solo necesitas rellenar nuestro formulario de aceptación y prepararte para
                        comenzar esta nueva y emocionante etapa para tu tienda.
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
                                        {index === 0 && '¡Bienvenido a la comunidad de tiendas!'}
                                        {index === 1 && '¡Aumenta tu visibilidad y ventas!'}
                                        {index === 2 && '¡Forma parte de Quito-Tech hoy mismo!'}
                                    </div>
                                </div>
                            ))}
                        </div>
                       
                    </div>
                    <div className="text-center mt-5">
                        <Link to="/dashboard/crear" className="mr-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-all">
                            Llenar Solicitud
                        </Link>
                        <Link to="/dashboard" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-all">
                            Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Crear;
