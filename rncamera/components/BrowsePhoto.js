import React from "react";

import { Button, StyleSheet } from "react-native";
import MOCKED_RESPONSE from "../assets/mockedPredictions";
import * as ImagePicker from "expo-image-picker";

export default class BrowsePhoto extends React.Component {
  handlePredictionResponse = (response) => {
    let tolerance = 0.78;

    console.log(`LOG: [FILTERING PREDICTIONS T - ${tolerance}]`);

    let matches = response.predictions.filter(
      (match) => match.probability > tolerance
    );

    let parties = matches.map((p) => {
      return { party: p.tagName, probability: p.probability };
    });
    console.log(`LOG: [${parties.length} PARTIES MATCHED T - ${tolerance}]`);

    //doSomething(parties);
  };

  getPredictions = async (selectedImg) => {
    const prediction = "1a377b443688419985e29b42d65923f8";
    const endPoint = "https://eastus.api.cognitive.microsoft.com/";
    const predictionResourceId =
      "customvision/v3.0/Prediction/41641520-c2cf-4e4c-883f-a001e9d2e4c4/detect/iterations/LogosIteration3/image";

    let localUri = selectedImg.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });
    //formData.append("image", localUri);

    var azureHeaders = new Headers();
    azureHeaders.append("Prediction-Key", prediction);
    azureHeaders.append("Content-Type", "application/octet-stream");

    console.log(`LOG: [GETTING PREDICTIONS - FETCH]`);
    let res = await fetch(endPoint + predictionResourceId, {
      method: "POST",
      body: formData,
      headers: azureHeaders,
      redirect: "follow",
    });
    let responseJson = await res.json();
    if (responseJson.status == 1) {
      console.log(`LOG: [PREDICTIONS UPLOAD - SUCCESSFUL]`);
      this.handlePredictionResponse(responseJson);
    } else {
      console.log(
        "LOG: \u001b[" +
          93 +
          "m" +
          "[PREDICTIONS UPLOAD - BAD REQUEST]" +
          "\u001b[0m"
      );

      console.log(
        "LOG: \u001b[" + 90 + "m" + "[USING MOCK DATA]" + "\u001b[0m"
      );
      this.handlePredictionResponse(MOCKED_RESPONSE());
    }
  };

  componentDidMount() {
    this.selectPhotoFromLibrary = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      console.log(`LOG: [OPENING IMAGE LIBRARY]`);
      let result = await ImagePicker.launchImageLibraryAsync();
      console.log(`LOG: [IMAGE SELECTED]`);
      this.getPredictions(result).then((predictionResponse) => {
        console.log(`LOG: [PREDICTION COMPLETED]`);
      });
    };
  }

  render() {
    return (
      <Button
        style={styles.baseText}
        title="Quienes Son?"
        onPress={() => {
          return this.selectPhotoFromLibrary();
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textDecorationColor: "#fff",
  },
});
