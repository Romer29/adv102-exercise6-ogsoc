import React, { createContext, useReducer, useContext } from "react";

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
