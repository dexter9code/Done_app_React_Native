import React, { useState } from "react";
import { Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./app/components/Screen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import myTheme from "./app/navigation/navigationTheme";

const Tweets = ({ navigation }) => (
  <Screen>
    <Text>Just Tweet</Text>
    <Button
      title="Tweet-Details"
      onPress={() => navigation.navigate("TweetsDetails")}
    />
  </Screen>
);
const TweetsDetails = () => (
  <Screen>
    <Text>Tweet Details</Text>
  </Screen>
);
const Account = () => (
  <Screen>
    <Text>Account-Details</Text>
  </Screen>
);

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tweets" component={Tweets} />
    <Stack.Screen name="TweetsDetails" component={TweetsDetails} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: "dodgerblue",
      tabBarActiveTintColor: "white",
      tabBarInactiveBackgroundColor: "#eee",
    }}
  >
    <Tab.Screen
      name="Feed"
      component={StackNavigator} //Nested Navigation
      options={{
        tabBarIcon: ({ size }) => (
          <MaterialCommunityIcons name="home" size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
