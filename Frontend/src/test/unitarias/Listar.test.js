import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Listar from '../../pages/Listar'; // Ajusta la ruta según la estructura de tu proyect

test('Renderiza el componente listar', () => {
  render(
    <MemoryRouter>
      <Listar />
    </MemoryRouter>
  );

  // Verifica que el título "QuitoTech" esté en el documento
  expect(screen.getByText('QuitoTech')).toBeInTheDocument();
  // Verifica que el título "ONLY-GAMES" esté en el documento
  expect(screen.getByText('ONLY-GAMES')).toBeInTheDocument();
  // Verifica que los enlaces o botones con el texto "Productos", "Buscar" y "Registrar tienda" estén en el documento
  expect(screen.getByText('Productos')).toBeInTheDocument();
  expect(screen.getByText('Buscar')).toBeInTheDocument();
  expect(screen.getByText('Registrar tienda')).toBeInTheDocument();
  // Verifica que el enlace de salida esté en el documento
  expect(screen.getByAltText('Volver')).toBeInTheDocument();
});
