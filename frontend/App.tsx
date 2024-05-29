import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AppMenuProvider from "./src/navigation/AppMenuProvider";
import Toast from "react-native-toast-message";
import * as Sentry from '@sentry/react-native';

const Stack = createStackNavigator();
Sentry.init({
  dsn: "https://221748e12638aaeb8cdb4625acef036c@o4507321111674880.ingest.us.sentry.io/4507321115082752",
});

const App = () => {
  return (
    <Provider store={store}>
      <AppMenuProvider></AppMenuProvider>
      <Toast />
    </Provider>
  );
};

export default Sentry.wrap(App);
