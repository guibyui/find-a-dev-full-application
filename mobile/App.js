import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import Routes from "./src/routes";

export default function App() {
  return (
    <>
      {/* Making the status bar while */}
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}
