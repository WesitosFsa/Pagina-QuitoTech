// __tests__/NoEncontrada.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { NoEncontrada } from '../../pages/NoEncontrada';

describe('NoEncontrada Component', () => {
  test('renderiza el componente NoEncontrada con el contenido correcto, ignorando las imágenes', () => {
    render(
      <MemoryRouter>
        <NoEncontrada />
      </MemoryRouter>
    );

    // Verifica que el texto "¿Te Perdiste?" está presente
    expect(screen.getByText('¿Te Perdiste?')).toBeInTheDocument();

    // Verifica que el mensaje de error está presente
    expect(screen.getByText('Lo sentimos, la página que intentas buscar no se encuentra disponible o no existe.')).toBeInTheDocument();

    // Verifica que el enlace "ingresar" está presente y tiene el href correcto
    const link = screen.getByText('ingresar');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/ingresar');
  });

  test('renderiza el componente con los estilos correctos', () => {
    render(
      <MemoryRouter>
        <NoEncontrada />
      </MemoryRouter>
    );

    // Selecciona el contenedor más externo (el que tiene el fondo)
    const container = screen.getByTestId('container');  // Usamos data-testid para un acceso más directo
    expect(container).toHaveClass('min-h-screen w-full flex justify-center items-center bg-[url(\'/public/images/olvidarcontra.jpg\')] bg-no-repeat bg-cover bg-center');
  });
});
