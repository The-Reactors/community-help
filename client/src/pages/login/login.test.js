import { render, screen } from '@testing-library/react';
import Login from './login';
import userEvent from '@testing-library/user-event'
import {queryByAttribute } from '@testing-library/react';

describe('Login Component', () => {
    test('Checks Whether Login Screen Is Visible Or Not ', () => {
        //Arrange
        render(<Login/>);
    
        //Act
        // ....
    
        //Assert
        const loginElement = screen.getByText(/Login To Your Account/i);
        expect(loginElement).toBeInTheDocument();
    });

    test('Checks Whether Empty Name And Email Gives Warning ', () => {


        //Arrange
        const dom = render(<Login/>);

        //Act
        const getById = queryByAttribute.bind(null, 'id');
        const signInBtn = getById(dom.container, 'signIn-btn-native');
        userEvent.click(signInBtn);

        //Assert
        const outputElement  = screen.getByText(/Login To Your Account/i);
        expect(outputElement).toBeInTheDocument();

    })
});
