import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from "./HomeScreen";
import SelectedProduct from "./SelectedProduct";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Navigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}

        name="Product"
        component={SelectedProduct}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navigator
