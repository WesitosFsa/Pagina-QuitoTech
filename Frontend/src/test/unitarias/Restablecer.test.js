import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Restablecer from '../../pages/Restablecer';
import axios from 'axios';
import { jest } from '@jest/globals';

// Mock de axios
jest.mock('axios');

describe('Restablecer Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the Restablecer component and checks form fields', () => {
        render(
            <MemoryRouter initialEntries={['/restablecer/12345']}>
                <Routes>
                    <Route path="/restablecer/:token" element={<Restablecer />} />
                </Routes>
            </MemoryRouter>
        );

        // Usa getAllByLabelText para manejar múltiples coincidencias
        const [inputPassword] = screen.getAllByLabelText(/contraseña/i);
        const [inputConfirmPassword] = screen.getAllByLabelText(/confirmar contraseña/i);

        expect(inputPassword).toBeInTheDocument();
        expect(inputConfirmPassword).toBeInTheDocument();
    });

    test('handles input changes correctly', () => {
        render(
            <MemoryRouter initialEntries={['/restablecer/12345']}>
                <Routes>
                    <Route path="/restablecer/:token" element={<Restablecer />} />
                </Routes>
            </MemoryRouter>
        );

        // Usa getAllByLabelText para manejar múltiples coincidencias
        const [inputPassword] = screen.getAllByLabelText(/contraseña/i);
        const [inputConfirmPassword] = screen.getAllByLabelText(/confirmar contraseña/i);

        // Simular cambios en el campo de contraseña
        fireEvent.change(inputPassword, { target: { value: 'NewPassword123' } });
        expect(inputPassword.value).toBe('NewPassword123');

        // Simular cambios en el campo de confirmar contraseña
        fireEvent.change(inputConfirmPassword, { target: { value: 'NewPassword123' } });
        expect(inputConfirmPassword.value).toBe('NewPassword123');
    });

    test('renders the component with correct styles', () => {
        render(
            <MemoryRouter initialEntries={['/restablecer/12345']}>
                <Routes>
                    <Route path="/restablecer/:token" element={<Restablecer />} />
                </Routes>
            </MemoryRouter>
        );

        // Verifica que el contenedor de fondo de pantalla tiene las clases adecuadas
        const backgroundContainer = screen.getByTestId('background-container');
        expect(backgroundContainer).toHaveClass(
            'min-h-screen w-full flex justify-center items-center bg-[url(\'/public/images/paginalogin.png\')] bg-no-repeat bg-cover bg-center'
        );

        // Verifica que el botón de cambio de contraseña tiene la clase adecuada
        const changePasswordButton = screen.getByRole('button', { name: /cambiar contraseña/i });
        expect(changePasswordButton).toHaveClass(
            'bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white'
        );
    });

    test('submits the form correctly', async () => {
        axios.post.mockResolvedValue({ data: { msg: 'Contraseña cambiada con éxito' } });

        render(
            <MemoryRouter initialEntries={['/restablecer/12345']}>
                <Routes>
                    <Route path="/restablecer/:token" element={<Restablecer />} />
                </Routes>
            </MemoryRouter>
        );

        // Completa el formulario
        const [inputPassword] = screen.getAllByLabelText(/contraseña/i);
        const [inputConfirmPassword] = screen.getAllByLabelText(/confirmar contraseña/i);

        fireEvent.change(inputPassword, { target: { value: 'NewPassword123' } });
        fireEvent.change(inputConfirmPassword, { target: { value: 'NewPassword123' } });

        // Envia el formulario
        fireEvent.click(screen.getByRole('button', { name: /cambiar contraseña/i }));

        // Verifica que la petición POST fue realizada con los datos correctos
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
            expect.stringContaining('/usuario/nuevo-password/12345'),
            { password: 'NewPassword123', confirmpassword: 'NewPassword123' }
        ));

        // Verifica que el mensaje de éxito es mostrado
        expect(screen.getByText('Contraseña cambiada con éxito')).toBeInTheDocument();
    });
});
