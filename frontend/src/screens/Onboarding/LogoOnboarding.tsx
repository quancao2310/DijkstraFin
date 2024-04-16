import {
  ImageBackground,
  View,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Logo from "../../images/lg.png";
import Background from "../../images/bgg.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { width, height } = Dimensions.get("window");

const LogoOnboarding = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      style={{
        width: width,
        overflow: "hidden",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("OnboardingScreen")}
    >
      <ImageBackground source={Background}>
        <SafeAreaView
          style={{
            opacity: 0,
          }}
        />
        <Image
          source={Logo}
          style={{
            maxWidth: "100%",
            resizeMode: "contain",
          }}
        />
        <SafeAreaView style={{ opacity: 0 }} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default LogoOnboarding;
