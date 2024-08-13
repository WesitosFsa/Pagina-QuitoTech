// __tests__/Confirmartienda.test.js
import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Confirmartienda } from '../../pages/confirmartienda';
import axios from 'axios';
import Mensaje from '../../components/Alertas';
import notfound from '../../assets/consulting.png';

// Mock para axios
jest.mock('axios');

// Mock para el componente Mensaje
jest.mock('../../components/Alertas', () => ({ tipo, children }) => (
  <div data-testid={`mensaje-${tipo}`}>{children}</div>
));

describe('Confirmartienda Component', () => {
  test('renderiza correctamente y muestra el mensaje de éxito', async () => {
    axios.get.mockResolvedValue({ data: { msg: 'Tienda verificada correctamente' } });

    render(
      <MemoryRouter initialEntries={['/confirmartienda/123']}>
        <Routes>
          <Route path="/confirmartienda/:tokentienda" element={<Confirmartienda />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mensaje-true')).toHaveTextContent('Tienda verificada correctamente');
    });

    expect(screen.getByText('Tu tienda ya se encuentra verificada')).toBeInTheDocument();
    expect(screen.getByText('Ya puedes registrar tus productos')).toBeInTheDocument();
    expect(screen.getByAltText('image description')).toHaveAttribute('src', notfound);
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });

  test('renderiza correctamente y muestra el mensaje de error', async () => {
    axios.get.mockRejectedValue({ response: { data: { msg: 'Error en la verificación de la tienda' } } });

    render(
      <MemoryRouter initialEntries={['/confirmartienda/123']}>
        <Routes>
          <Route path="/confirmartienda/:tokentienda" element={<Confirmartienda />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mensaje-false')).toHaveTextContent('Error en la verificación de la tienda');
    });

    expect(screen.getByText('Tu tienda ya se encuentra verificada')).toBeInTheDocument();
    expect(screen.getByText('Ya puedes registrar tus productos')).toBeInTheDocument();
    expect(screen.getByAltText('image description')).toHaveAttribute('src', notfound);
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });
});
