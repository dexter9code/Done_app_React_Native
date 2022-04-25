import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
