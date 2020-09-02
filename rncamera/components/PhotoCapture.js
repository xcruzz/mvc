import React from "react";
//import ImagePicker from "../node_modules/react-native-image-picker";
//import ImagePicker from "react-native-image-crop-picker";
import { Button } from "react-native";

export default class PhotoCaptureComponent extends React.Component {
  handlePhoto = () => {
    const options = {};
    console.log(`Load Image Picker`);
  };

  render() {
    return <Button title="Quienes Son?" onPress={this.handlePhoto} />;
  }
}
