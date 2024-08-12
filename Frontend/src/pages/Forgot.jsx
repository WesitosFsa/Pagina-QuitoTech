import { useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";
import {Link} from 'react-router-dom'

const Forgot = () => {
const [mensaje, setMensaje] = useState({})
	const [mail, setMail] = useState({})
    
    const handleChange = (e)=>{
        setMail({
            ...mail,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/recuperar-password`
          const respuesta = await axios.post(url,mail)
          setMensaje({respuesta:respuesta.data.msg,tipo:true})
          setMail("")
      } catch (error) { 
          setMensaje({respuesta:error.response.data.msg,tipo:false})
      }
  }

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center bg-[url('/public/images/olvidarcontra.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-4/5 sm:w-full">
            <h1 className="text-4xl font-bold mb-4 text-white text-center uppercase">
              ¿Olvidaste tu contraseña?
            </h1>
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <small className="text-white block my-4 text-sm text-center">
              Para recuperarla, ingresa tu email
            </small>
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label className="mb-2 block text-sm font-semibold text-white">
                  Email
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 py-2 px-3 bg-gray-800 text-white"
                />
              </div>
              <div className="mb-3">
                <button className="bg-purple-500 text-slate-300 border-width:0px py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                  Enviar email
                </button>
              </div>
            </form>
            <div className="mt-3 text-sm flex justify-between items-center">
              <p className="text-white">¿Lo recordaste?</p>
              <Link
                to="/ingresar"
                className="py-2 px-5 bg-purple-500 text-slate-300 border-width:0px rounded-xl hover:scale-110 duration-300 hover:bg-gray-900"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <Link to="/">
            <img
              src="/public/images/casa.png"
              alt="Volver"
              className="w-16 h-16"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Forgot;
