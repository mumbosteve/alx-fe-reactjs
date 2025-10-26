import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../components/TodoItem';

jest.mock('../components/TodoItem.css', () => ({}));

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test Todo',
    completed: false
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  test('renders todo text and delete button', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('calls onToggle when todo text is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    fireEvent.click(screen.getByText('Test Todo'));
    
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    fireEvent.click(screen.getByText('Delete'));
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});