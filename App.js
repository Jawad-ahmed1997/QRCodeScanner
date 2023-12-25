import React from "react";

import { View, StatusBar } from "react-native";
import Navigator from "./screens/Navigator";

export default function App() {
  return (
    <View style={{ flex: 1, height: "100%", backgroundColor: "white" }}>
      <StatusBar />
      <Navigator/>
    </View>
  );
}
