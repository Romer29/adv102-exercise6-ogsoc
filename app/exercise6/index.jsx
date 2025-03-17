import React from "react";
import { TodoProvider } from "./TodoContext";
import TodoList from "./TodoList";
import { Stack } from "expo-router";

export default function Exercise6() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}
