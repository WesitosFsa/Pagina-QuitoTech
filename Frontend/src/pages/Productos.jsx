import mandos from '../assets/mandos.jpg';
import consolas from '../assets/consolas.webp';
import videojuegos from '../assets/videojuegos.webp';
import perifericos from '../assets/perifericos.jpg';
import componentes from '../assets/componentes.jpg';
import sillasGaming from '../assets/sillasgamer.jpg';
import refrigeracion from '../assets/refrigeracion.webp';
import monitores from '../assets/monitores.webp';
import audio from '../assets/audio.webp';
import almacenamiento from '../assets/almacenamiento.webp';
import { useState } from 'react';

export const Productos = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className='bg-gray-900 px-10 md:px-20 lg:px-40'>
        <section>
          <div>
            <h3 className='text-3xl py-1 dark:text-white'>Categorías de Productos</h3>
            <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>
              Encuentra las mejores <span className='text-purple-600'>categorías</span> de productos disponibles en nuestra tienda en Quito. 
              <span className='text-purple-600'>Ubicación de las tiendas</span> también disponibles aquí.
            </p>
            <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, delectus iure <span className='text-white'>quibusdam</span> quas quaerat itaque, est minima ducimus recusandae illo ipsam numquam nam earum libero <span className='text-white'>deleniti</span> voluptatem! Autem, veniam ut.
            </p>
          </div>

          <div className='md:flex md:flex-wrap lg:flex lg:justify-center gap-10'>
            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={mandos} alt="Mandos" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>MANDOS</h3>
              <p className='py-4 text-white'>
                Descubre nuestra variedad de mandos para diferentes consolas y plataformas, perfectos para mejorar tu experiencia de juego.
              </p>
              <p className='text-white py-1'>PlayStation</p>
              <p className='text-white py-1'>Xbox</p>
              <p className='text-white py-1'>Nintendo</p>
              <p className='text-white py-1'>Celular</p>
            </div>

            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={consolas} alt="Consolas" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>CONSOLAS</h3>
              <p className='py-4 text-white'>
                Encuentra la consola ideal para tu estilo de juego, con las mejores marcas y modelos disponibles.
              </p>
              <p className='text-white py-1'>PlayStation</p>
              <p className='text-white py-1'>Nintendo</p>
              <p className='text-white py-1'>Xbox</p>
              <p className='text-white py-1'>Otras</p>
            </div>

            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={videojuegos} alt="Videojuegos" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>VIDEOJUEGOS</h3>
              <p className='py-4 text-white'>
                Explora nuestra colección de videojuegos, desde los clásicos hasta los últimos lanzamientos.
              </p>
              <p className='text-white py-1'>Acción</p>
              <p className='text-white py-1'>Aventura</p>
              <p className='text-white py-1'>Terror</p>
              <p className='text-white py-1'>Psicológico</p>
            </div>

            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={perifericos} alt="Periféricos" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>PERIFÉRICOS</h3>
              <p className='py-4 text-white'>
                Mejora tu configuración con nuestra gama de periféricos, desde teclados y ratones hasta auriculares.
              </p>
              <p className='text-white py-1'>Teclados</p>
              <p className='text-white py-1'>Mouses</p>
              <p className='text-white py-1'>Auriculares</p>
              <p className='text-white py-1'>Micrófonos</p>
            </div>

            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={componentes} alt="Componentes PC" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>COMPONENTES PC</h3>
              <p className='py-4 text-white'>
                Encuentra los mejores componentes para personalizar y potenciar tu PC, adaptados a todas tus necesidades.
              </p>
              <p className='text-white py-1'>Tarjetas RAM</p>
              <p className='text-white py-1'>Microprocesadores</p>
              <p className='text-white py-1'>Ventiladores</p>
              <p className='text-white py-1'>Fuente de Energía</p>
            </div>
          </div>
        </section>

        <section>
          <div>
            <h3 className='text-3xl py-1 dark:text-white'>OTROS</h3>
            <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>
              Buscas algo más específico, en nuestra sección de otros podrías encontrarlo.
            </p>
            <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, delectus iure <span className='text-white'>quibusdam</span> quas quaerat itaque, est minima ducimus recusandae illo ipsam numquam nam earum libero <span className='text-white'>deleniti</span> voluptatem! Autem, veniam ut.
            </p>
          </div>

          <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
            <div className="text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105">
              <img className='mx-auto' src={sillasGaming} alt="Sillas Gaming" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>SILLAS GAMING</h3>
              <p className='py-4 text-white'>
                Disfruta de una experiencia de juego cómoda con nuestras sillas gaming, diseñadas para largas sesiones de juego.
              </p>
              <p className='text-white py-1'>Ergonómicas</p>
              <p className='text-white py-1'>Reclinables</p>
              <p className='text-white py-1'>Con Soporte Lumbar</p>
              <p className='text-white py-1'>Con Reposabrazos Ajustables</p>
            </div>

            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={refrigeracion} alt="Sistemas de Refrigeración" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>SISTEMAS DE REFRIGERACIÓN</h3>
              <p className='py-4 text-white'>
                Mantén tu PC a la temperatura ideal con nuestros sistemas de refrigeración eficientes.
              </p>
              <p className='text-white py-1'>Refrigeración Líquida</p>
              <p className='text-white py-1'>Ventiladores</p>
              <p className='text-white py-1'>Disipadores de Calor</p>
              <p className='text-white py-1'>Controladores de Temperatura</p>
            </div>

            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={monitores} alt="Monitores" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>MONITORES</h3>
              <p className='py-4 text-white'>
                Encuentra monitores con la mejor calidad de imagen y tasa de refresco para mejorar tu experiencia de juego.
              </p>
              <p className='text-white py-1'>144Hz</p>
              <p className='text-white py-1'>4K</p>
              <p className='text-white py-1'>Curvos</p>
              <p className='text-white py-1'>Ultra Anchos</p>
            </div>

            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={audio} alt="Sistemas de Audio" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>SISTEMAS DE AUDIO</h3>
              <p className='py-4 text-white'>
                Mejora tu experiencia de sonido con nuestros sistemas de audio, que ofrecen una inmersión total en el juego.
              </p>
              <p className='text-white py-1'>Altavoces 2.1</p>
              <p className='text-white py-1'>Barra de Sonido</p>
              <p className='text-white py-1'>Subwoofers</p>
              <p className='text-white py-1'>Auriculares Gaming</p>
            </div>

            <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 bg-purple-600 transition-transform transform hover:scale-105'>
              <img className='mx-auto' src={almacenamiento} alt="Almacenamiento Externo" />
              <h3 className='text-lg font-medium pt-8 pb-2 text-white'>ALMACENAMIENTO EXTERNO</h3>
              <p className='py-4 text-white'>
                Amplía tu capacidad de almacenamiento con nuestras opciones de discos duros y SSDs externos.
              </p>
              <p className='text-white py-1'>Discos Duros Externos</p>
              <p className='text-white py-1'>SSDs Externos</p>
              <p className='text-white py-1'>Memorias USB</p>
              <p className='text-white py-1'>Almacenamiento en Red</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
