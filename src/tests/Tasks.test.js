import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Tasks from './Tasks';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

describe('Tasks Component', () => {
  const mockTasks = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
    { id: 3, name: 'Task 3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders loading state', async () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {})); 

    render(<Tasks />);
    expect(screen.getByText(/loading tasks.../i)).toBeInTheDocument(); 
  });

  test('renders tasks from API', async () => {
    axios.get.mockResolvedValueOnce({ data: mockTasks }); 

    render(<Tasks />);
    
    
    expect(screen.getByText(/loading tasks.../i)).toBeInTheDocument();

    
    await waitFor(() => expect(screen.getByText(/task 1/i)).toBeInTheDocument());

    
    mockTasks.forEach((task) => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    });
  });

  test('renders error message on API failure', async () => {
    const mockError = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(mockError)); 

    render(<Tasks />);
    
    
    await waitFor(() => expect(screen.getByText(/error:/i)).toBeInTheDocument());
    expect(screen.getByText(new RegExp(mockError, 'i'))).toBeInTheDocument(); 
  });

  test('updates task list when component is re-rendered', async () => {
    const updatedTasks = [
      { id: 4, name: 'Task 4' },
      { id: 5, name: 'Task 5' },
    ];

    
    axios.get.mockResolvedValueOnce({ data: mockTasks });

    const { rerender } = render(<Tasks />);

    
    await waitFor(() => expect(screen.getByText(/task 1/i)).toBeInTheDocument());

    
    axios.get.mockResolvedValueOnce({ data: updatedTasks });

    
    rerender(<Tasks />);

    
    await waitFor(() => expect(screen.getByText(/task 4/i)).toBeInTheDocument());

    
    updatedTasks.forEach((task) => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    });

    
    mockTasks.forEach((task) => {
      expect(screen.queryByText(task.name)).not.toBeInTheDocument();
    });
  });
});
