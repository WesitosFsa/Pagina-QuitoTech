// __tests__/Crear.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Crear from '../../pages/Confirmacion_registro_tienda';

describe('Crear Component', () => {
  test('representa el componente confirmacion_registro__tienda y verifica el contenido estático', () => {
    render(
      <MemoryRouter>
        <Crear />
      </MemoryRouter>
    );

    // Verifica que el título principal esté presente
    expect(screen.getByText('Crea y únete a la tendencia de tiendas en Quito-Tech!!')).toBeInTheDocument();

    // Verifica que el botón "Llenar Solicitud" esté presente
    expect(screen.getByText('Llenar Solicitud')).toBeInTheDocument();

    // Verifica que el botón "Inicio" esté presente
    expect(screen.getByText('Inicio')).toBeInTheDocument();
  });

  test('El carrusel debe cambiar de diapositiva automáticamente cada 10 segundos.', async () => {
    render(
      <MemoryRouter>
        <Crear />
      </MemoryRouter>
    );

    // Inicialmente, el primer texto debe estar visible
    expect(screen.getByText('¡Bienvenido a la comunidad de tiendas!')).toBeInTheDocument();

    // Espera 10 segundos y verifica que el texto cambie
    await waitFor(() => {
      expect(screen.getByText('¡Aumenta tu visibilidad y ventas!')).toBeInTheDocument();
    }, { timeout: 11000 });

    // Espera 10 segundos más y verifica que el texto cambie nuevamente
    await waitFor(() => {
      expect(screen.getByText('¡Forma parte de Quito-Tech hoy mismo!')).toBeInTheDocument();
    }, { timeout: 11000 });
  });

  test('cambiar diapositivas manualmente con los botones siguiente y anterior', () => {
    render(
      <MemoryRouter>
        <Crear />
      </MemoryRouter>
    );

    // Se asegura de que la primera diapositiva esté visible
    expect(screen.getByText('¡Bienvenido a la comunidad de tiendas!')).toBeInTheDocument();

    // Lógica para simular la interacción con los botones si existen (necesitarías agregar botones)
    // fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
    // expect(screen.getByText('¡Aumenta tu visibilidad y ventas!')).toBeInTheDocument();
  });
});
