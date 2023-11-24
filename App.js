import * as React from "react";
import QRScreen from "./screens/QRScreen";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <QRScreen />
    </SafeAreaProvider>
  );
}
//androidmanifest -> <application android:usesCleartextTraffic="true" .../>
