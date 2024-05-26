import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AppMenuProvider from "./src/navigation/AppMenuProvider";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppMenuProvider></AppMenuProvider>
    </Provider>
  );
};

export default App;
