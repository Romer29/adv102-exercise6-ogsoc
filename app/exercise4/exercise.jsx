import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
import HTMLView from "react-native-htmlview";
import Stopwatch from "./Stopwatch";

export default function Exercise() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const exercises = [
    {
      title: "Exercise 3",
      description:
        "Create login screen<br/>Login screen fields:\n\n<ul><li>Email</li><li>Password</li></ul>",
    },
    {
      title: "Exercise 4",
      description:
        "Create a STOP WATCH<br/>Must Have:\n\n<ul><li>Hours, Minutes, and Seconds</li><li>Start Button</li><li>Reset Button</li><li>Automatically Run</li></ul>",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={() => setSelectedExercise(index)}>
            <Text style={styles.title}>{exercise.title}</Text>
            <HTMLView value={exercise.description} stylesheet={htmlStyles} />
          </TouchableOpacity>
          {selectedExercise === index && index === 1 && <Stopwatch />} 
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#294657",
  },
  card: {
    backgroundColor: "#d3d3d3",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  ul: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
  },
  li: {
    fontSize: 14,
    color: "#555",
  },
});
