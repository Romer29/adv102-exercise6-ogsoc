import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [image, setImage] = useState(null);

  const { width } = Dimensions.get("window");

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);

    if (!text) {
      setEmailError("Email is required.");
    } else if (!validateEmail(text)) {
      setEmailError("Please provide a valid email address.");
    } else {
      setEmailError("");
    }

    setIsButtonDisabled(!text || !password || emailError);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsButtonDisabled(!email || !text || emailError);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    toast.success("Registration Successful!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    });
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Profile Image:", image);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ToastContainer />
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("../(tabs)/exercises")}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Create your account here</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {}
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text>Select a Profile Image</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        {emailError && <Text style={styles.emailError}>{emailError}</Text>}
        <TextInput
          style={[styles.input, { width: width * 0.85 }]}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TextInput
        style={[styles.input, { width: width * 0.85 }]}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.disabledButton, { width: width * 0.85 }]}
        onPress={handleLogin}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Do you have an account? Log In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  inputWrapper: {
    width: "88.8%",
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    width: "100%",
  },
  emailError: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#0D082E",
    alignItems: "center",
    height: 50,
    width: "85%",
  },
  disabledButton: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#555",
    fontSize: 14,
  },
  imagePickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", 
    borderWidth: 2,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
});
