import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Help from './Help';

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };
  
// Mock axios
jest.mock('axios');

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Help Component', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'Test Post 1',
      description: 'Description 1',
      location: 'Location 1',
      createdAt: '2023-01-01T00:00:00Z',
      posterId: 'user1'
    },
    {
      id: 2,
      title: 'Test Post 2',
      description: 'Description 2',
      location: 'Location 2',
      createdAt: '2023-01-02T00:00:00Z',
      posterId: 'user2'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token';
      if (key === 'userId') return 'mock-user-id';
      return null;
    });
  });

  test('renders correctly when not logged in', () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<Help />);
    
    expect(screen.getByText('Segítség kérése')).toBeInTheDocument();
    expect(screen.getByText('Be kell jelentkezned a segítségkérés létrehozásához!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cím')).toBeDisabled();
    expect(screen.getByPlaceholderText('Leírás')).toBeDisabled();
    expect(screen.getByPlaceholderText('Hova kell a segítség?')).toBeDisabled();
    expect(screen.getByText('Beküldés')).toBeDisabled();
  });

  test('renders correctly when logged in', async () => {
    axios.get.mockResolvedValue({ data: mockPosts });
    render(<Help />);
    
    await waitFor(() => {
      expect(screen.getByText('Segítség kérése')).toBeInTheDocument();
      expect(screen.queryByText('Be kell jelentkezned a segítségkérés létrehozásához!')).not.toBeInTheDocument();
      expect(screen.getByPlaceholderText('Cím')).toBeEnabled();
      expect(screen.getByPlaceholderText('Leírás')).toBeEnabled();
      expect(screen.getByPlaceholderText('Hova kell a segítség?')).toBeEnabled();
      expect(screen.getByText('Beküldés')).toBeEnabled();
    });
  });

  test('fetches and displays posts', async () => {
    axios.get.mockResolvedValue({ data: mockPosts });
    render(<Help />);
    
    expect(screen.getByText('Adatok betöltése...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Helyszín: Location 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });

  test('shows error when post fetch fails', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));
    render(<Help />);
    
    await waitFor(() => {
      expect(screen.getByText(`Hiba történt: ${errorMessage}`)).toBeInTheDocument();
      expect(screen.getByText('Újrapróbálkozás')).toBeInTheDocument();
    });
  });

  test('shows empty state when no posts', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<Help />);
    
    await waitFor(() => {
      expect(screen.getByText('Nincs elérhető segítségkérés.')).toBeInTheDocument();
    });
  });

  describe('Post Creation', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: mockPosts });
      axios.post.mockResolvedValue({ data: {} });
    });

    test('creates new post when form is submitted', async () => {
      render(<Help />);
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByPlaceholderText('Cím'), {
        target: { value: 'New Post' }
      });
      fireEvent.change(screen.getByPlaceholderText('Leírás'), {
        target: { value: 'New Description' }
      });
      fireEvent.change(screen.getByPlaceholderText('Hova kell a segítség?'), {
        target: { value: 'New Location' }
      });
      fireEvent.click(screen.getByText('Beküldés'));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          "https://localhost:7285/api/Post",
          {
            posterId: 'mock-user-id',
            title: 'New Post',
            description: 'New Description',
            location: 'New Location'
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer mock-token"
            }
          }
        );
      });
    });

    test('shows alert when required fields are missing', async () => {
      window.alert = jest.fn();
      render(<Help />);
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Beküldés'));

      expect(window.alert).toHaveBeenCalledWith("Minden mezőt ki kell tölteni!");
      expect(axios.post).not.toHaveBeenCalled();
    });

    test('shows error when post creation fails', async () => {
      const errorMessage = 'Creation failed';
      axios.post.mockRejectedValue({ response: { data: { message: errorMessage } }});
      window.alert = jest.fn();
      
      render(<Help />);
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByPlaceholderText('Cím'), {
        target: { value: 'New Post' }
      });
      fireEvent.change(screen.getByPlaceholderText('Leírás'), {
        target: { value: 'New Description' }
      });
      fireEvent.change(screen.getByPlaceholderText('Hova kell a segítség?'), {
        target: { value: 'New Location' }
      });
      fireEvent.click(screen.getByText('Beküldés'));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(`Hiba történt a segítségkérés mentésekor: ${errorMessage}`);
      });
    });
  });

  test('refetches data when retry button is clicked', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage))
          .mockResolvedValueOnce({ data: mockPosts });
    
    render(<Help />);
    
    await waitFor(() => {
      expect(screen.getByText(`Hiba történt: ${errorMessage}`)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Újrapróbálkozás'));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    });
  });
});