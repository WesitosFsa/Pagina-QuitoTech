// __tests__/Listartienda.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Listartienda from '../../pages/Listartienda';
import Tablatienda from '../../components/Tablatienda';

// Mock para el componente Tablatienda
jest.mock('../../components/Tablatienda', () => () => (
  <div data-testid="tablatienda">Tabla de Tiendas</div>
));

// Mock para localStorage.clear
jest.spyOn(Storage.prototype, 'clear');

describe('Listartienda Component', () => {
  test('renderiza correctamente y muestra los elementos principales', () => {
    render(
      <MemoryRouter>
        <Listartienda />
      </MemoryRouter>
    );

    // Verifica que el título principal se muestra correctamente
    expect(screen.getByText('QuitoTech')).toBeInTheDocument();
    expect(screen.getByText('TIENDAS DISPONIBLES')).toBeInTheDocument();
    expect(screen.getByText('TUS TIENDAS FAVORITAS A TU ALCANCE')).toBeInTheDocument();

    // Verifica que los enlaces de navegación se muestran correctamente
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();

    // Verifica que el componente Tablatienda se renderiza
    expect(screen.getByTestId('tablatienda')).toBeInTheDocument();

    // Verifica que el botón de salida se muestra correctamente
    expect(screen.getByAltText('Volver')).toBeInTheDocument();
  });

  test('verifica que el enlace de salida limpia el localStorage', () => {
    render(
      <MemoryRouter>
        <Listartienda />
      </MemoryRouter>
    );

    // Simula un clic en el enlace de salida dentro de act
    act(() => {
      fireEvent.click(screen.getByAltText('Volver'));
    });

    // Verifica que el localStorage se ha limpiado
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
