import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay={true}
        loop={true}
        source={require("../assets/animations/9844-loading-40-paperplane.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    zIndex: 1,
    opacity: 0.8,
    backgroundColor: "white",
  },
});
export default ActivityIndicator;
