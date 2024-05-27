import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import LogoOnboarding from "../screens/Onboarding/LogoOnboarding";
import BottomBarNavigation from "./BottomBarNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { MenuProvider } from "react-native-popup-menu";
import AllTransaction from "../screens/Home/AllTransaction";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
const Stack = createStackNavigator();

const AppMenuProvider = () => {
  // this is temp for testing
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const appData = await AsyncStorage.getItem("isAppFirstLaunched");
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem("isAppFirstLaunched", "false");
      } else {
        setIsAppFirstLaunched(false);
      }
    };

    fetchData();
    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);

  const isLogin = useSelector((state: RootState) => state.LoginStatus.isLogin);
  const onBoarding = isAppFirstLaunched != null && (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAppFirstLaunched && (
          <>
            <Stack.Screen name="LogoOnboarding" component={LogoOnboarding} />
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          </>
        )}
        {!isLogin && (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AllTransaction" component={AllTransaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  //   const loginScreen = (
  //     <NavigationContainer>
  //       <Stack.Navigator screenOptions={{ headerShown: true }}>
  //         <Stack.Screen name="LoginScreen" component={LoginScreen} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  const mainScreen = (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={BottomBarNavigation} />
          <Stack.Screen
            name="AllTransaction"
            component={AllTransaction}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );

  return (
    <MenuProvider>
      {/* {isAppFirstLaunched ? onBoarding : !isLogin ? loginScreen : mainScreen} */}
      {!isLogin ? onBoarding : mainScreen}
    </MenuProvider>
  );
};

export default AppMenuProvider;
