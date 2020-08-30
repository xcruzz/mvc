import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Linking, Image } from "react-native";
// import PhotoCaptureComponent from "./components/PhotoCapture";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  let handlePhoto = async () => {
    const options = {};

    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    console.log();
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("./assets/mvcLogoBlanco.png")}
      />
      <Text style={styles.headerText} />
      <Text style={styles.headerText} />
      <Text style={styles.headerText}>Movimiento Victoria Ciudadana</Text>
      <Text style={styles.headerText} />
      <Text style={styles.headerText} />

      <Button
        style={styles.baseText}
        title="Agenda Urgente!"
        onPress={() => {
          Linking.openURL("https://www.mvcpr.org/");
        }}
      />
      <Text style={styles.headerText} />
      <Button
        style={styles.baseText}
        title="Quienes Son?"
        onPress={() => {
          return handlePhoto();
        }}
      />
      <Text style={styles.headerText} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    textDecorationColor: "#fff",
  },
  baseText: {
    color: "#fff",
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
  },
  logo: {
    width: 108,
    height: 120,
  },
});