import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Use router for navigation
import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the arrow icon

const TodoList = () => {
  const router = useRouter(); // Use router from expo-router
  const { todos, dispatch } = useTodos();
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", payload: text });
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace("../(tabs)/exercises")}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Content Wrapper with Padding on Top, Left, and Right */}
      <View style={styles.contentWrapper}>
        {/* Header Section */}
        <Text style={styles.title}>TODO LIST</Text>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write here your plans today..."
            value={text}
            onChangeText={setText}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* Task List Header */}
        <Text style={styles.todoListTitle}>LIST OF TASKS:</Text>
      </View>

      {/* Scrollable Todo List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem todo={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    paddingTop: 50, 
    paddingHorizontal: 20, 
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  contentWrapper: {
    width: "100%",
    paddingHorizontal: 200, // Added horizontal padding
    paddingTop: 50, // Added top padding
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "rgb(13,8,46)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  todoListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
    textAlign: "center",
  },
  listContainer: {
    width: "100%",
  },
});


export default TodoList;
