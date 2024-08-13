import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PaginaInicial } from "../../pages/PaginaInicial"; // Ajusta la ruta según la estructura de tu proyecto

describe('PaginaInicial Component', () => {
  test('representa el componente PaginaInicial correctamente', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que los elementos principales están presentes en el documento
    expect(screen.getByText('QuitoTECH')).toBeInTheDocument();
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
    expect(screen.getByText('Registrarse')).toBeInTheDocument();
    expect(screen.getByText('Tiendas en Quito para videojuegos')).toBeInTheDocument();
    expect(screen.getByText('Aqui podras encontrar tiendas con productos gamer en quito')).toBeInTheDocument();
    expect(screen.getByText('Podras encontrar variedad de productos y registrar tu tienda para que mas personas puedan encontrarte')).toBeInTheDocument();
    expect(screen.getByAltText('logo-gamer')).toBeInTheDocument();
  });
});
