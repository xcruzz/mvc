import React from "react";
import { Animated, StyleSheet, AppRegistry } from "react-native";

export default class ColorView extends React.Component {
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1500,
    }).start();
  }

  state = {
    blackgroundTransition: {
      party_colors: {
        pnp_blue: "#3399ff",
        ppd_red: "#ff3333",
        pip_green: "#66cc00",
        mvc_gold: "#cc9933",
        blackground: "#f000000",
      },
    },
    blackGroundColor: "#f000000",
  };

  animateBlackground = () => {
    this.setState({});
  };

  render() {
    const black_ground_interpolate = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: [`rgb(0,0,0)`, `rgb(0,24,0)`],
    });

    const animatedBlackStyle = StyleSheet.create({
      backgroundColor: black_ground_interpolate,
    });
    return (
      <Animated.View
        style={[styles.container, { backgroundColor: animatedBlackStyle }]}
      ></Animated.View>
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

AppRegistry.registerComponent("ColorView", () => ColorView);
