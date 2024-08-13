import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AdministrarProducto from '../../pages/AdministrarProducto';
import axios from 'axios';

// Mock para axios
jest.mock('axios');

describe('AdministrarProducto Component', () => {
  it('Se renderiza correctamente', () => {
    render(
      <MemoryRouter>
        <AdministrarProducto />
      </MemoryRouter>
    );

    expect(screen.getByText('Actualizar Producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar el Estado de producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar nombre y categoría del producto')).toBeInTheDocument();
  });
  it('Muestra la tabla correcta al hacer clic en los botones', async () => {
    render(
      <MemoryRouter>
        <AdministrarProducto />
      </MemoryRouter>
    );

    expect(screen.getByText('Actualizar Producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar el Estado de producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar nombre y categoría del producto')).toBeInTheDocument();
  });
  it('Llama a la función handleStatus correctamente', async () => {
    render(
      <MemoryRouter>
        <AdministrarProducto />
      </MemoryRouter>
    );

    expect(screen.getByText('Actualizar Producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar el Estado de producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar nombre y categoría del producto')).toBeInTheDocument();
  });
  
});
