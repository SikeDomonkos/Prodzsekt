import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Bejelentkezes from './Bejelentkezes';

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };


jest.mock('axios');




const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Bejelentkezes Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form by default', () => {
    render(<Bejelentkezes />);
    expect(screen.getByText('Bejelentkezés')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Írd be a felhasználóneved')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Írd be a jelszavad')).toBeInTheDocument();
    expect(screen.getByText('Regisztráció')).toBeInTheDocument();
  });

  test('shows register modal when register button is clicked', () => {
    render(<Bejelentkezes />);
    fireEvent.click(screen.getByText('Regisztráció'));
    expect(screen.getByText('Regisztráció')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Írd be a teljes neved')).toBeInTheDocument();
  });

  describe('Login Functionality', () => {
    test('successful login', async () => {
      const mockToken = 'mock.token.here';
      const mockResponse = { data: { token: mockToken } };
      axios.post.mockResolvedValue(mockResponse);

      render(<Bejelentkezes />);
      
      fireEvent.change(screen.getByPlaceholderText('Írd be a felhasználóneved'), {
        target: { value: 'testuser' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be a jelszavad'), {
        target: { value: 'testpass' }
      });
      fireEvent.click(screen.getByText('Bejelentkezés'));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'https://localhost:7285/auth/login',
          { username: 'testuser', password: 'testpass' },
          expect.any(Object)
        );
        expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
      });
    });

    test('failed login shows error message', async () => {
      const mockError = {
        response: {
          data: { errorType: 'LOGIN_FAILED' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      render(<Bejelentkezes />);
      
      fireEvent.change(screen.getByPlaceholderText('Írd be a felhasználóneved'), {
        target: { value: 'wronguser' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be a jelszavad'), {
        target: { value: 'wrongpass' }
      });
      fireEvent.click(screen.getByText('Bejelentkezés'));

      await waitFor(() => {
        expect(screen.getByText('Hibás felhasználónév vagy jelszó!')).toBeInTheDocument();
      });
    });
  });

  describe('Register Functionality', () => {
    test('successful registration', async () => {
      axios.post.mockResolvedValue({ data: {} });

      render(<Bejelentkezes />);
      fireEvent.click(screen.getByText('Regisztráció'));

      fireEvent.change(screen.getByPlaceholderText('Írd be a teljes neved'), {
        target: { value: 'Test User' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be a felhasználóneved'), {
        target: { value: 'testuser' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be az emailed'), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be a jelszavad'), {
        target: { value: 'TestpassŁ123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be újra a jelszavad'), {
        target: { value: 'TestpassŁ123' }
      });
      fireEvent.click(screen.getByText('Regisztráció'));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'https://localhost:7285/auth/register',
          {
            fullname: 'Test User',
            username: 'testuser',
            email: 'test@example.com',
            password: 'TestpassŁ123'
          },
          expect.any(Object)
        );
        expect(screen.getByText('Sikeres regisztráció! Kérlek jelentkezz be.')).toBeInTheDocument();
      });
    });

    test('failed registration shows error message', async () => {
      const mockError = {
        response: {
          data: { errorType: 'USERNAME_TAKEN' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      render(<Bejelentkezes />);
      fireEvent.click(screen.getByText('Regisztráció'));

      // Fill in form
      fireEvent.change(screen.getByPlaceholderText('Írd be a teljes neved'), {
        target: { value: 'Test User' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be a felhasználóneved'), {
        target: { value: 'takenuser' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be az emailed'), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be a jelszavad'), {
        target: { value: 'TestpassŁ123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be újra a jelszavad'), {
        target: { value: 'TestpassŁ123' }
      });
      fireEvent.click(screen.getByText('Regisztráció'));

      await waitFor(() => {
        expect(screen.getByText('A felhasználónév már foglalt!')).toBeInTheDocument();
      });
    });

    test('password mismatch shows error', async () => {
      render(<Bejelentkezes />);
      fireEvent.click(screen.getByText('Regisztráció'));

      fireEvent.change(screen.getByPlaceholderText('Írd be a jelszavad'), {
        target: { value: 'TestpassŁ123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Írd be újra a jelszavad'), {
        target: { value: 'TestpassŁ123' }
      });
      fireEvent.click(screen.getByText('Regisztráció'));

      expect(screen.getByText('A jelszavak nem egyeznek!')).toBeInTheDocument();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  test('closes register modal', async () => {
    render(<Bejelentkezes />);
    fireEvent.click(screen.getByText('Regisztráció'));
    expect(screen.getByText('Regisztráció')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Bezárás'));
    expect(screen.queryByText('Regisztráció')).not.toBeInTheDocument();
  });
});