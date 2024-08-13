import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Forgot from '../../pages/Forgot'; // Asegúrate de que la ruta sea correcta
import Mensaje from '../../components/Alertas';
import axios from 'axios';

// Mock para el componente Mensaje
jest.mock('../../components/Alertas', () => ({
  __esModule: true,
  default: ({ tipo, children }) => (
    <div data-testid="mensaje" className={tipo ? 'success' : 'error'}>
      {children}
    </div>
  )
}));

// Mock para axios
jest.mock('axios');

describe('Forgot Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renderiza correctamente todos los elementos', () => {
    render(
      <MemoryRouter initialEntries={['/forgot']}>
        <Routes>
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica que los elementos principales están presentes en el documento
    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
    expect(screen.getByText('Para recuperarla, ingresa tu email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Enviar email')).toBeInTheDocument();
    expect(screen.getByText('¿Lo recordaste?')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByAltText('Volver')).toBeInTheDocument();
  });

  test('muestra mensaje de éxito al enviar email correctamente', async () => {
    // Configura un mock para la función axios.post
    axios.post.mockResolvedValue({ data: { msg: 'Email enviado correctamente' } });

    render(
      <MemoryRouter initialEntries={['/forgot']}>
        <Routes>
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Enviar email'));

    // Verifica que el mensaje de éxito se muestra
    expect(await screen.findByText('Email enviado correctamente')).toBeInTheDocument();
  });

  test('muestra mensaje de error al fallar el envío del email', async () => {
    // Configura un mock para la función axios.post
    axios.post.mockRejectedValue({ response: { data: { msg: 'Error al enviar el email' } } });

    render(
      <MemoryRouter initialEntries={['/forgot']}>
        <Routes>
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Enviar email'));

    // Verifica que el mensaje de error se muestra
    expect(await screen.findByText('Error al enviar el email')).toBeInTheDocument();
  });
});
