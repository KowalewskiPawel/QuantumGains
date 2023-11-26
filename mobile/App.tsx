import React from "react";
import { PaperProvider } from "react-native-paper";
import { Main } from "./src/Main";
import { darkTheme } from "./src/themes/darkTheme";
import { Provider } from "react-redux";
import { store } from "./src/app";

export default function App() {
  return (
    <PaperProvider theme={darkTheme}>
      <Provider store={store}>
        <Main />
      </Provider>
    </PaperProvider>
  );
}
