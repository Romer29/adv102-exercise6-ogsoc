import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useTodos } from "./TodoContext";

const TodoItem = ({ todo }) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const toggleEdit = () => {
    if (isEditing && newText.trim()) {
      dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: newText } });
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.item}>
      {/* Checkbox for Completion */}
      <TouchableOpacity onPress={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}>
        <Text style={styles.checkbox}>{todo.completed ? "✔" : " "}</Text>
      </TouchableOpacity>

      {/* Todo Text / Edit Input */}
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={newText}
          onChangeText={setNewText}
        />
      ) : (
        <Text style={[styles.text, todo.completed && styles.completed]}>
          {todo.text}
        </Text>
      )}

      {/* Edit Button */}
      <TouchableOpacity style={styles.button} onPress={toggleEdit}>
        <Text style={styles.edit}>{isEditing ? "✔" : "EDIT"}</Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity style={styles.button} onPress={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}>
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkbox: {
    fontSize: 18,
    color: "green",
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  completed: {
    textDecorationLine: "line-through",
    fontStyle: "italic",
    color: "#777",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 3,
  },
  button: {
    paddingHorizontal: 10,
  },
  edit: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  delete: {
    color: "red",
    fontSize: 16,
  },
});

export default TodoItem;
