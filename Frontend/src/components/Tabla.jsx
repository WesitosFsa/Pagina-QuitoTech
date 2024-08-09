import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "../components/Alertas.jsx";

const Tabla = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  const listarPacientes = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      // const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`
      const options = {
        // headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`
        // }
      };
      const respuesta = await axios.get(url, options);
      setPacientes(respuesta.data, ...pacientes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmar = confirm(
        "Vas a registrar la salida de un paciente, ¿Estás seguro de realizar esta acción?"
      );
      if (confirmar) {
        const token = localStorage.getItem("token");
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/paciente/eliminar/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const data = {
          salida: new Date().toString(),
        };
        await axios.delete(url, { headers, data });
        listarPacientes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarPacientes();
  }, []);

  return (
    <>
      <table className="w-full mt-5 table-auto shadow-lg  bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Calidad</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Consola"}</td>
            <td>{"$ 245"}</td>
            <td>{"Alta"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Videojuegos"}</td>
            <td>{"$ 39.67"}</td>
            <td>{"Alta"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Monitor"}</td>
            <td>{"$ 300"}</td>
            <td>{"Alta"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Teclado Mecánico"}</td>
            <td>{"$ 80"}</td>
            <td>{"Media"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Ratón Gamer"}</td>
            <td>{"$ 50"}</td>
            <td>{"Alta"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Auriculares Bluetooth"}</td>
            <td>{"$ 120"}</td>
            <td>{"Alta"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Disco Duro Externo"}</td>
            <td>{"$ 90"}</td>
            <td>{"Media"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Router WiFi"}</td>
            <td>{"$ 70"}</td>
            <td>{"Media"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Webcam HD"}</td>
            <td>{"$ 60"}</td>
            <td>{"Media"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Cámara Digital"}</td>
            <td>{"$ 400"}</td>
            <td>{"Alta"}</td>
          </tr>
          <tr className="border-b hover:bg-gray-300 text-center">
            <td>{"Smartphone"}</td>
            <td>{"$ 800"}</td>
            <td>{"Alta"}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Tabla;
