import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AllTransaction from "../screens/Home/AllTransaction";
import HomeScreen from "../screens/Home/HomeScreen";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AllTransaction" component={AllTransaction} />
    </Stack.Navigator>
  );
}
