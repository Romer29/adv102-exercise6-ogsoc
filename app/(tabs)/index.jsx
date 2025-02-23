import { View, Text, StyleSheet, ImageBackground } from "react-native";

import logo from "@/assets/images/image-background.jpeg";

export default function Home() {
  return (
    <ImageBackground source={logo} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.author}>Romer Quibod Ogsoc</Text>
        <Text style={styles.author}>BSIT-2</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  author: {
    marginStart: 20,
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
});
