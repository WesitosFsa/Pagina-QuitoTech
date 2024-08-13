// __tests__/Crear.test.js
import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Crear from '../../pages/Crear';  // Asegúrate de que la ruta sea correcta
import { Formulario } from '../../components/Formulario';

// Mock para el componente Formulario
jest.mock('../../components/Formulario', () => ({
  Formulario: () => <div>Formulario Mock</div>
}));

describe('Ingresar Component', () => {
  test('renderiza correctamente todos los elementos', () => {
    render(
      <MemoryRouter initialEntries={['/crear']}>
        <Routes>
          <Route path="/crear" element={<Crear />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que los elementos principales están presentes en el documento
    expect(screen.getByText('QuitoTech')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Agregar tu tienda')).toBeInTheDocument();
    expect(screen.getByText('Si tienes tu tienda aqui podras registrarla y mandar solicitud para poder manejar tu tienda')).toBeInTheDocument();
    
    // Verifica que el componente Formulario se renderiza correctamente
    expect(screen.getByText('Formulario Mock')).toBeInTheDocument();

    // Verifica la imagen de salida y su comportamiento
    const img = screen.getByAltText('Volver');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/public/images/salida.png');
  });
});
