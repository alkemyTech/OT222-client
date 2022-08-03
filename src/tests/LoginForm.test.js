import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import LoginApi from '../services/LoginApi';

jest.mock('../services/LoginApi')


const setup = (jsx) => {
    return {
        user: userEvent.setup(),
        ...render(jsx)
    }
}


describe('LoginForm', () => {

    describe('render', () => {

        test('should have a email input', () => {
            render(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const emailInput = screen.getByPlaceholderText('Email');
            expect(emailInput).toBeInTheDocument();
        })

        test('should have a password input', () => {
            render(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const passwordInput = screen.getByPlaceholderText('Contraseña');
            expect(passwordInput).toBeInTheDocument();
        })

        test('should have a submit button', () => {
            render(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const submitButton = screen.getByRole('button', { type: 'submit' });
            expect(submitButton).toBeInTheDocument();
        })

    })

    describe('submit', () => {

        test('should not submit when email is empty', async () => {
            const { user } = setup(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const passwordInput = screen.getByPlaceholderText('Contraseña');
            await user.type(passwordInput, '12345678');
            await user.click(screen.getByRole('button', { type: 'submit' }));
            await waitFor(() => {
                const errorMessage = screen.getByText('Obligatorio');
                expect(errorMessage).toBeInTheDocument();
            })
        })

        test('should not submit when password is empty', async () => {
            const { user } = setup(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const emailInput = screen.getByPlaceholderText('Email');
            await user.type(emailInput, 'test@test.com');
            await user.click(screen.getByRole('button', { type: 'submit' }));
            await waitFor(() => {
                const errorMessage = screen.getByText('Obligatorio');
                expect(errorMessage).toBeInTheDocument();
                expect(errorMessage).toHaveTextContent('Obligatorio');
            })
        })

        test('should not submit when email is not valid', async () => {
            const { user } = setup(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const emailInput = screen.getByPlaceholderText('Email');
            await user.type(emailInput, 'test');
            const passwordInput = screen.getByPlaceholderText('Contraseña');
            await user.type(passwordInput, 'test');
            const submitButton = screen.getByRole('button', { type: 'submit' });
            await user.click(submitButton);
            await waitFor(() => {
                const errorMessage = screen.getByText('Direccción de correo inválida');
                expect(errorMessage).toBeInTheDocument();
            })
        })

        test('should not submit when password is not valid', async () => {
            const { user } = setup(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const emailInput = screen.getByPlaceholderText('Email');
            await user.type(emailInput, 'test@test.com');
            const passwordInput = screen.getByPlaceholderText('Contraseña');
            await user.type(passwordInput, '123');
            const submitButton = screen.getByRole('button', { type: 'submit' });
            await user.click(submitButton);
            await waitFor(() => {
                const errorMessage = screen.getByText('Debe tener al menos 6 caracteres');
                expect(errorMessage).toBeInTheDocument();
            })
        })

    })

    describe('HTTP request', () => {

        test('should submit when email and password are valid', async () => {
            const { user } = setup(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const emailInput = screen.getByPlaceholderText('Email');
            await user.type(emailInput, 'test@test.com');
            const passwordInput = screen.getByPlaceholderText('Contraseña');
            await user.type(passwordInput, '12345678');
            const submitButton = screen.getByRole('button', { type: 'submit' });
            await user.click(submitButton);

            await waitFor(() => {
                expect(LoginApi).toHaveBeenCalled()
            });
        })
    })


});