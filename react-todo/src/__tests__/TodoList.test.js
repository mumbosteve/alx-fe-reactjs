import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Mock CSS imports to prevent Jest errors
jest.mock('../components/TodoList.css', () => ({}));
jest.mock('../components/AddTodoForm.css', () => ({}));
jest.mock('../components/TodoItem.css', () => ({}));

describe('TodoList Component', () => {
  test('renders initial todos correctly', () => {
    render(<TodoList />);
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if the form elements are present
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'Test New Todo' } });
    fireEvent.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('Test New Todo')).toBeInTheDocument();
    
    // Check if input is cleared after adding
    expect(input.value).toBe('');
  });

  test('does not add empty todo when form is submitted', () => {
    render(<TodoList />);
    
    // Get initial count of todos (by counting delete buttons)
    const initialDeleteButtons = screen.getAllByText('Delete');
    const initialTodoCount = initialDeleteButtons.length;
    
    const addButton = screen.getByText('Add Todo');
    
    // Try to add empty todo
    fireEvent.click(addButton);
    
    // Count should remain the same
    const currentDeleteButtons = screen.getAllByText('Delete');
    expect(currentDeleteButtons.length).toBe(initialTodoCount);
  });

  test('toggles todo completion when clicked', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    const todoItem = todoText.closest('div');
    
    // Initially should not have completed class
    expect(todoItem).not.toHaveClass('completed');
    
    // Click to toggle completion
    fireEvent.click(todoText);
    
    // Should now have completed class
    expect(todoItem).toHaveClass('completed');
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByText('Delete');
    const initialCount = deleteButtons.length;
    const todoToDelete = screen.getByText('Learn React');
    
    // Delete the first todo
    fireEvent.click(deleteButtons[0]);
    
    // Check if todo is removed
    expect(todoToDelete).not.toBeInTheDocument();
    
    // Check if count decreased
    const remainingDeleteButtons = screen.getAllByText('Delete');
    expect(remainingDeleteButtons.length).toBe(initialCount - 1);
  });

  test('displays empty state when no todos exist', () => {
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByText('Delete');
    deleteButtons.forEach(button => {
      fireEvent.click(button);
    });
    
    // Should show empty state message
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });
});