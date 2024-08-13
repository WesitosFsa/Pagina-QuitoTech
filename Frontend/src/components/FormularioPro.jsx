import { useState, useEffect } from "react";
import axios from 'axios';
import Mensaje from './Alertas';
import Swal from 'sweetalert2';

export const FormularioPro = () => {
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    Nombre_producto: "",
    Categoria: "",
  });
  const [tiendaUsuario, setTiendaUsuario] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchTiendaUsuario = async () => {
      try {
        const idUsuario = localStorage.getItem('id_usuario');
        setUserId(idUsuario);
        const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/tienda/${idUsuario}`;
        const respuesta = await axios.get(url);
        setTiendaUsuario(respuesta.data.tienda);
      } catch (error) {
        console.error('Error al obtener la tienda del usuario:', error);
      }
    };

    fetchTiendaUsuario();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tiendaUsuario) {
      setMensaje({ respuesta: "No tienes una tienda asociada para registrar productos", tipo: false });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/producto/registro`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      await axios.post(url, { ...form, id_tienda: tiendaUsuario._id }, options);
      
      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto registrado exitosamente",
        showConfirmButton: false,
        timer: 2100
      });

      // Limpia el formulario después del registro exitoso
      setForm({
        Nombre_producto: "",
        Categoria: "",
      });

    } catch (error) {
      console.error(error);
      setMensaje({ respuesta: error.response?.data?.msg, tipo: false });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
      <div>
        <label htmlFor='nombre:' className='text-slate-400 uppercase font-bold text-sm'>Nombre del Producto: </label>
        <input
          id='Nombre_producto'
          type="text"
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          placeholder='Nombre del producto'
          name='Nombre_producto'
          value={form.Nombre_producto}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor='categoria:' className='text-slate-400 uppercase font-bold text-sm'>Categoría: </label>
        <select
          id='Categoria'
          name='Categoria'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          value={form.Categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Categoría</option>
          <option value="Mandos">Mandos</option>
          <option value="Consolas">Consolas</option>
          <option value="Videojuegos">Videojuegos</option>
          <option value="Perifericos">Perifericos</option>
          <option value="ComponentesPC">ComponentesPC</option>
          <option value="Otros">Otros</option>
        </select>
      </div>
      <input
        type="submit"
        className='bg-purple-500 w-full p-3 
            text-slate-300 uppercase font-bold rounded-lg 
            hover:bg-gray-900 cursor-pointer transition-all'
        value='Registrar Producto' />
    </form>
  );
}
