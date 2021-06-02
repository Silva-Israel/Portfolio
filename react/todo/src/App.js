import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/dist/v4';
import './App.css';

const local = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: 'Wash dishes', complete: false }, 
    { id: 2, name: 'Do laundry', complete: true }
  ]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(local));
    if(storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(local, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);

    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if(name === '') return;
    
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })

    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <h1>Izzy's Todo List</h1>
      <TodoList todos={ todos } toggleTodo={ toggleTodo } />
      <input ref={ todoNameRef } type="text" />
      <button onClick={ handleAddTodo }>Add</button>
      <button onClick={ handleClearTodos }>Clear Complete</button>
      <div>{ todos.filter(todo => !todo.complete).length } left to do</div>
    </>
  );
}

export default App;
