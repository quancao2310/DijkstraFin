import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./src/screens/Onboarding/OnboardingScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";
import LogoOnboarding from "./src/screens/Onboarding/LogoOnboarding";
import BottomBarNavigation from "./src/navigation/BottomBarNavigation";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { store } from "./src/store";
import TestRedux from "./src/screens/TestRedux";

const Stack = createStackNavigator();

const App = () => {
  // const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  // React.useEffect(async () => {
  //   const appData = await AsyncStorage.getItem("isAppFirstLaunched");
  //   if (appData == null) {
  //     setIsAppFirstLaunched(true);
  //     AsyncStorage.setItem("isAppFirstLaunched", "false");
  //   } else {
  //     setIsAppFirstLaunched(false);
  //   }

  //   AsyncStorage.removeItem("isAppFirstLaunched");
  // }, []);

  // this is temp for testing
  const [isOnboardingComplete, setIsOnboardingComplete] = React.useState(true);
  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
  };
  ///
  const onBoarding = (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="LogoOnboarding" component={LogoOnboarding} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  const mainScreen = (
    <NavigationContainer>
      <BottomBarNavigation></BottomBarNavigation>
    </NavigationContainer>
  );
  return (
    <Provider store={store}>
      {!isOnboardingComplete ? onBoarding : mainScreen}
    </Provider>
  );
};

export default App;
