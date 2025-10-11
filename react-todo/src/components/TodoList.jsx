import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: true },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={`flex justify-between items-center p-2 border-b cursor-pointer ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span>{todo.text}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              className="text-red-500"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <AddTodoForm onAdd={addTodo} />
    </div>
  );
}
