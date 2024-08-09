import notfound from '/public/images/notfound.jpg'
import {Link} from 'react-router-dom'


export const NoEncontrada = () => {
    return (
        
        <div className="min-h-screen w-full flex justify-center items-center bg-[url('/public/images/olvidarcontra.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 max-w-md">

            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={notfound} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-white mt-12">¿Te Perdiste?</p>
                
                <p className="md:text-lg lg:text-xl text-white mt-8">Lo sentimos, la página que intentas buscar no se encuentra disponible o no existe.</p>
                
                <Link to="/ingresar" className="inline-block mt-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">ingresar</Link>

            </div>
        </div>
        </div>
    )
}
