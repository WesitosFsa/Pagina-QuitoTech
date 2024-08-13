// __tests__/CrearProducto.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CrearProducto from '../../pages/AdministrarTienda';

// Mock para las imágenes del carrusel
jest.mock('../../assets/1.jpg', () => 'mock-image-1');
jest.mock('../../assets/2.jpg', () => 'mock-image-2');
jest.mock('../../assets/3.jpg', () => 'mock-image-3');

describe('CrearProducto Component', () => {
  test('renderiza correctamente y muestra el texto de bienvenida', () => {
    render(
      <MemoryRouter>
        <CrearProducto />
      </MemoryRouter>
    );

    // Verifica que el título se renderiza correctamente
    expect(screen.getByText('Administra tu tienda')).toBeInTheDocument();
    
    // Verifica que las descripciones están presentes
    expect(screen.getByText(/Dentro de este apartado tu podras añadir productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Recuerda que QuitoTech es una plataforma de divulgacion tecnologica/i)).toBeInTheDocument();
  });

  test('verifica la funcionalidad de los botones del carrusel', async () => {
    render(
      <MemoryRouter>
        <CrearProducto />
      </MemoryRouter>
    );

    // Simula el clic en el botón de siguiente
    fireEvent.click(screen.getByText('❯'));

    // Espera un momento para permitir que la transición ocurra
    await waitFor(() => {
      // Verifica que el texto del carrusel cambie
      expect(screen.getByText(/¡Usuarios personalizados e interesados en productos gamer podran encontrar tu tienda!/i)).toBeInTheDocument();
    });

    // Simula el clic en el botón anterior
    fireEvent.click(screen.getByText('❮'));

    // Verifica que el texto del carrusel vuelva a su estado original
    await waitFor(() => {
      expect(screen.getByText(/¡Añade tus productos!/i)).toBeInTheDocument();
    });
  });

  test('los enlaces de navegación funcionan correctamente', () => {
    render(
      <MemoryRouter>
        <CrearProducto />
      </MemoryRouter>
    );

    // Verifica que los enlaces de navegación están presentes
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Nuevo Producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar Productos')).toBeInTheDocument();
  });
});
