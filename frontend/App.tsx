import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./src/screens/Onboarding/OnboardingScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LogoOnboarding from "./src/screens/Onboarding/LogoOnboarding";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { store } from "./src/store";
import TestRedux from "./src/screens/TestRedux";

const Stack = createStackNavigator();

const App = () => {
  //   const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  //   React.useEffect(async () => {
  //     const appData = await AsyncStorage.getItem("isAppFirstLaunched");
  //     if (appData == null) {
  //       setIsAppFirstLaunched(true);
  //       AsyncStorage.setItem("isAppFirstLaunched", "false");
  //     } else {
  //       setIsAppFirstLaunched(false);
  //     }

  // AsyncStorage.removeItem('isAppFirstLaunched');
  //   }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {/* <Stack.Screen name="TestRedux" component={TestRedux} /> */}
          <Stack.Screen name="LogoOnboarding" component={LogoOnboarding} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
