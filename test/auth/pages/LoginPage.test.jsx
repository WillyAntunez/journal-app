import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginUserWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginUserWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginUserWithEmailPassword({email, password})
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(), 
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en <LoginPage />', () => { 

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrar el componente correctamente', () => { 
        
        render(
            <MemoryRouter>
                <Provider store={ store }>
                    <LoginPage />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('boton de google debe de llamar el startGoogleSignIn', () => {
        render(
            <MemoryRouter>
                <Provider store={ store }>
                    <LoginPage />
                </Provider>
            </MemoryRouter>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );

        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('submit debe de llamar el startLoginWithEmailPassword', () => { 
        
        const email = 'willyantunez@google.com';
        const password = '123456';

        render(
            <MemoryRouter>
                <Provider store={ store }>
                    <LoginPage />
                </Provider>
            </MemoryRouter>
        );

        const emailField = screen.getByRole('textbox', {name: 'correo'});
        
        fireEvent.change( 
            emailField, 
            { target: { name: 'email', value: email, } },
        );

        const passwordField = screen.getByTestId('password');
        fireEvent.change( 
            passwordField, 
            { target: { name: 'password', value: password, } },
        );

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginUserWithEmailPassword ).toHaveBeenCalled();

        expect( mockStartLoginUserWithEmailPassword )
            .toHaveBeenCalledWith({email, password})

    });

});