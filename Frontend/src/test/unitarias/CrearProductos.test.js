// __tests__/CrearProducto.test.js
import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CrearProducto from '../../pages/CrearProductos';  // Asegúrate de que el nombre y la ruta sean correctos
import { FormularioPro } from '../../components/FormularioPro';

// Mock para el componente FormularioPro
jest.mock('../../components/FormularioPro', () => ({
  FormularioPro: () => <div>FormularioPro Mock</div>
}));

describe('CrearProducto Component', () => {
  test('renderiza correctamente todos los elementos', () => {
    render(
      <MemoryRouter initialEntries={['/crearproducto']}>
        <Routes>
          <Route path="/crearproducto" element={<CrearProducto />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que los elementos principales están presentes en el documento
    expect(screen.getByText('QuitoTech')).toBeInTheDocument();
    expect(screen.getByText('Volver')).toBeInTheDocument();
    expect(screen.getByText('Agrega Producto')).toBeInTheDocument();
    expect(screen.getByText('Si tienes tu tienda aqui podras registrar tus productos')).toBeInTheDocument();
    
    // Verifica que el componente FormularioPro se renderiza correctamente
    expect(screen.getByText('FormularioPro Mock')).toBeInTheDocument();

    // Verifica la imagen de salida y su comportamiento
    const img = screen.getByAltText('Volver');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/public/images/salida.png');
  });
});
