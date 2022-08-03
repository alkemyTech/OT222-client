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


// This test is to check if the login form works correctly

describe('LoginForm', () => {

    describe('render', () => {

        //This block test that the component is rendered correctly

        test('should have a email input', () => {

            //This test that the email input is rendered correctly

            render(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const emailInput = screen.getByPlaceholderText('Email');
            expect(emailInput).toBeInTheDocument();
        })

        test('should have a password input', () => {

            //This test that the password input is rendered correctly

            render(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const passwordInput = screen.getByPlaceholderText('Contraseña');
            expect(passwordInput).toBeInTheDocument();
        })

        test('should have a submit button', () => {

            //This test that the submit button is rendered correctly

            render(<MemoryRouter initialEntries={['/login']} ><LoginForm /></MemoryRouter>);
            const submitButton = screen.getByRole('button', { type: 'submit' });
            expect(submitButton).toBeInTheDocument();
        })

    })

    describe('submit', () => {

        //This block test validations and submit functionality

        test('should not submit when email is empty', async () => {

            //This test that the form won't be submitted when the email is empty

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

            //This test that the form won't be submitted when the password is empty

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

            //This test that the form won't be submitted when the email is not valid 

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

            // This test that the form won't be submitted when the password is not valid (less than 8 characters)

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

        test('should submit when email and password are valid', async () => {

            //This test that the form will be submitted when the email and password are valid, calling the LoginApi function that sends the request to the server

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