import { render, screen } from '@testing-library/react';
import { Productos } from '../../pages/Productos'; 
import React from "react";

test('renderiza correctamente y muestra las categorías de productos', () => {
  render(<Productos />);

  // Verifica que el título se renderiza correctamente
  expect(screen.getByText('Categorías de Productos')).toBeInTheDocument();

  // Verifica que las descripciones están presentes
  expect(screen.getByText(/Encuentra las mejores/i)).toBeInTheDocument();
  
  // Usa getAllByText para manejar múltiples elementos con el mismo texto
  const loremTextElements = screen.getAllByText(/Lorem ipsum dolor/i);
  expect(loremTextElements.length).toBeGreaterThan(0);

  // Verifica que las categorías de productos están presentes
  expect(screen.getByText('MANDOS')).toBeInTheDocument();
  expect(screen.getByText('CONSOLAS')).toBeInTheDocument();
  expect(screen.getByText('VIDEOJUEGOS')).toBeInTheDocument();
});
