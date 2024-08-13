import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Registrar } from '../../pages/Registrar';

describe('Registrar Component', () => {
  test('representa el componente Registrar y verifica los campos del formulario', () => {
    render(
      <MemoryRouter>
        <Registrar />
      </MemoryRouter>
    );

    // Verificar que los campos de entrada están presentes
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  test('maneja los cambios de entrada correctamente', () => {
    render(
      <MemoryRouter>
        <Registrar />
      </MemoryRouter>
    );

    // Simular cambios en el campo de nombre
    const inputNombre = screen.getByLabelText(/nombre/i);
    fireEvent.change(inputNombre, { target: { value: 'Juan' } });
    expect(inputNombre.value).toBe('Juan');

    // Simular cambios en el campo de apellido
    const inputApellido = screen.getByLabelText(/apellido/i);
    fireEvent.change(inputApellido, { target: { value: 'Perez' } });
    expect(inputApellido.value).toBe('Perez');
  });

  test('renderiza el componente con los estilos correctos', () => {
    render(
      <MemoryRouter>
        <Registrar />
      </MemoryRouter>
    );

    // Verificar que el botón de registro tiene la clase adecuada
    const registerButton = screen.getByRole('button', { name: /registrar/i });
    expect(registerButton).toHaveClass('w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300');
  });
});
