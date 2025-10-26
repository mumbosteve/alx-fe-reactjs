import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const initialTodoCount = screen.getAllByRole('button', { name: 'Delete' }).length;
    const addButton = screen.getByText('Add Todo');
    
    fireEvent.click(addButton);
    
    const finalTodoCount = screen.getAllByRole('button', { name: 'Delete' }).length;
    expect(finalTodoCount).toBe(initialTodoCount);
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    
    // Initially not completed
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Click to complete
    fireEvent.click(todoText);
    
    // Should now be completed
    expect(todoText.parentElement).toHaveClass('completed');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByText('Delete');
    const initialCount = deleteButtons.length;
    
    // Delete first todo
    fireEvent.click(deleteButtons[0]);
    
    const remainingDeleteButtons = screen.getAllByText('Delete');
    expect(remainingDeleteButtons.length).toBe(initialCount - 1);
  });

  test('shows empty state when no todos', () => {
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByText('Delete');
    deleteButtons.forEach(button => {
      fireEvent.click(button);
    });
    
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });
});