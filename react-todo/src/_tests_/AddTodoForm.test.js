import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from '../components/AddTodoForm';

jest.mock('../components/AddTodoForm.css', () => ({}));

describe('AddTodoForm Component', () => {
  test('calls onAdd with input value when form is submitted', () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    
    expect(mockOnAdd).toHaveBeenCalledWith('Test Todo');
    expect(input.value).toBe('');
  });

  test('does not call onAdd when input is empty', () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const addButton = screen.getByText('Add Todo');
    
    fireEvent.click(addButton);
    
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});