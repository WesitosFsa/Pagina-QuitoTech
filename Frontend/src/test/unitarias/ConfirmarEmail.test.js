// __tests__/Confirmar.test.js
import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Confirmar } from '../../pages/ConfirmarEmail';
import axios from 'axios';
import Mensaje from '../../components/Alertas';
import notfound from '../../assets/consulting.png';

// Mock para axios
jest.mock('axios');

// Mock para el componente Mensaje
jest.mock('../../components/Alertas', () => ({ tipo, children }) => (
  <div data-testid={`mensaje-${tipo}`}>{children}</div>
));

describe('Confirmar Component', () => {
  test('renderiza correctamente y muestra el mensaje de éxito', async () => {
    axios.get.mockResolvedValue({ data: { msg: 'Confirmación exitosa' } });

    render(
      <MemoryRouter initialEntries={['/confirmar/123']}>
        <Routes>
          <Route path="/confirmar/:token" element={<Confirmar />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que el mensaje se muestra correctamente
    await waitFor(() => {
      expect(screen.getByTestId('mensaje-true')).toHaveTextContent('Confirmación exitosa');
    });

    // Verifica que el mensaje y otros elementos se renderizan
    expect(screen.getByText('Muchas Gracias')).toBeInTheDocument();
    expect(screen.getByText('Ya puedes iniciar sesión')).toBeInTheDocument();
    expect(screen.getByAltText('image description')).toHaveAttribute('src', notfound);
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });

  test('renderiza correctamente y muestra el mensaje de error', async () => {
    axios.get.mockRejectedValue({ response: { data: { msg: 'Error de confirmación' } } });

    render(
      <MemoryRouter initialEntries={['/confirmar/123']}>
        <Routes>
          <Route path="/confirmar/:token" element={<Confirmar />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que el mensaje de error se muestra correctamente
    await waitFor(() => {
      expect(screen.getByTestId('mensaje-false')).toHaveTextContent('Error de confirmación');
    });

    // Verifica que otros elementos también se renderizan
    expect(screen.getByText('Muchas Gracias')).toBeInTheDocument();
    expect(screen.getByText('Ya puedes iniciar sesión')).toBeInTheDocument();
    expect(screen.getByAltText('image description')).toHaveAttribute('src', notfound);
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });
});
