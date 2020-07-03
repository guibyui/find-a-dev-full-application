import React from "react";
import { StatusBar, YellowBox } from "react-native";

import Routes from "./src/routes";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

export default function App() {
  return (
    <>
      {/* Making the status bar while */}
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}
