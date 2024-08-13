// __tests__/BuscarProducto.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BuscarProducto from '../../pages/BuscarProducto';
import ListarProductosPorCategoria from '../../components/Productos/ProductosCategoria';
import ListarProductosPorTienda from '../../components/Productos/ProductosTienda';

// Mock para los componentes ListarProductosPorCategoria y ListarProductosPorTienda
jest.mock('../../components/Productos/ProductosCategoria', () => () => <div>Lista por Categoría</div>);
jest.mock('../../components/Productos/ProductosTienda', () => () => <div>Lista por Tienda</div>);

describe('BuscarProducto Component', () => {
  test('renderiza correctamente y muestra el texto de bienvenida', () => {
    render(
      <MemoryRouter>
        <BuscarProducto />
      </MemoryRouter>
    );

    // Verifica que el título se renderiza correctamente
    expect(screen.getByText('Buscar producto')).toBeInTheDocument();
    
    // Verifica que las descripciones están presentes
    expect(screen.getByText(/Dentro de aquí podrás buscar el producto de tu interés/i)).toBeInTheDocument();
  });

  test('verifica la funcionalidad de los botones de búsqueda', async () => {
    render(
      <MemoryRouter>
        <BuscarProducto />
      </MemoryRouter>
    );

    // Simula el clic en el botón "Buscar Productos por Nombre de tienda"
    fireEvent.click(screen.getByText('Buscar Productos por Nombre de tienda'));

    // Verifica que el componente ListarProductosPorTienda se renderiza
    await waitFor(() => {
      expect(screen.getByText('Lista por Tienda')).toBeInTheDocument();
    });

    // Simula el clic en el botón "Buscar Productos por categoría"
    fireEvent.click(screen.getByText('Buscar Productos por categoría'));

    // Verifica que el componente ListarProductosPorCategoria se renderiza
    await waitFor(() => {
      expect(screen.getByText('Lista por Categoría')).toBeInTheDocument();
    });
  });

  test('los enlaces de navegación funcionan correctamente', () => {
    render(
      <MemoryRouter>
        <BuscarProducto />
      </MemoryRouter>
    );

    // Verifica que los enlaces de navegación están presentes
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Buscar Tienda')).toBeInTheDocument();
  });
});
