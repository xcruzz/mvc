import React from "react";

import { Button, StyleSheet } from "react-native";
import * as CognitiveService from "../logoPredictSvc";
import * as ImagePicker from "expo-image-picker";

const tolerance = 0.78;
export default class BrowsePhoto extends React.Component {
  handlePredictionResponse = (response) => {
    console.log(`LOG: [FILTERING PREDICTIONS T - ${tolerance}]`);

    let definiteMatches = response.predictions.filter(
      (match) => match.probability > tolerance
    );
    // let maybeMatches = response.predictions.filter(
    //   (match) => match.probability <= tolerance
    // );

    let parties = definiteMatches.map((p) => {
      return { party: p.tagName, probability: p.probability };
    });
    console.log(`LOG: [${parties.length} PARTIES MATCHED T - ${tolerance}]`);

    //doSomething(parties);
  };

  constructor(props) {
    super(props);
    this.state = {
      predictedResults: {},
    };
  }

  componentDidMount() {
    this.selectPhotoFromLibrary = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      console.log(`LOG: [OPENING IMAGE LIBRARY]`);
      let result = await ImagePicker.launchImageLibraryAsync();
      return result;
    };
  }

  render() {
    return (
      <Button
        style={styles.baseText}
        title="Quienes Son?"
        onPress={() => {
          this.selectPhotoFromLibrary()
            .then((selectedImg) => {
              let predictionResponse = CognitiveService.PredictLogoSvc(
                selectedImg
              );
              predictionResponse.then((predictionResponse) => {
                console.log(`LOG: [PREDICTIONS - RECEIVED])}`);
                this.handlePredictionResponse(predictionResponse);
                console.log(`LOG: [PREDICTION HANDLED]`);
              });
            })
            .catch((error) => {
              console.log(`LOG: [CATCH - ${error}]`);
            });
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
