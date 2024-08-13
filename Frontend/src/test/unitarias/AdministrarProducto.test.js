import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AdministrarProducto from '../../pages/AdministrarProducto';
import axios from 'axios';

// Mock para axios
jest.mock('axios');

describe('AdministrarProducto Component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <AdministrarProducto />
      </MemoryRouter>
    );

    expect(screen.getByText('Actualizar Producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar el Estado de producto')).toBeInTheDocument();
    expect(screen.getByText('Actualizar nombre y categoría del producto')).toBeInTheDocument();
  });

  it('shows the correct table when clicking the buttons', async () => {
    render(
      <MemoryRouter>
        <AdministrarProducto />
      </MemoryRouter>
    );
  
    fireEvent.click(screen.getByText('Actualizar el Estado de producto'));
  
    // Usa findByText para esperar que el texto aparezca en el DOM
    await waitFor(() => expect(screen.findByText('ListarProductosPorTienda')).toBeInTheDocument());
  
    fireEvent.click(screen.getByText('Actualizar nombre y categoría del producto'));
  
    // Usa findByText para esperar que el texto aparezca en el DOM
    await waitFor(() => expect(screen.findByText('ListarProductosPorCategoria')).toBeInTheDocument());
  });
  
  it('calls the handleStatus function correctly', async () => {
    // Mock para axios
    axios.post.mockResolvedValueOnce({ data: { msg: 'Estado actualizado' } });
  
    render(
      <MemoryRouter>
        <AdministrarProducto />
      </MemoryRouter>
    );
  
    fireEvent.click(screen.getByText('Actualizar el Estado de producto'));
  
    // Usa findByText para esperar que el texto aparezca en el DOM
    await waitFor(() => expect(screen.findByText('ListarProductosPorTienda')).toBeInTheDocument());
  
    // Simular que ListarProductosPorTienda renderiza productos
    const productButton = await screen.findByText('Producto 1'); // Usa findByText para esperar el texto
    fireEvent.click(productButton);
  
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Estado actualizado')).toBeInTheDocument();
  });
  
});
