import {
  ImageBackground,
  View,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Logo from "../../images/lg.png";
import Background from "../../images/bgg.png";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const LogoOnboarding = () => {
  let navigate = useNavigation();

  return (
    <ImageBackground
      source={Background}
      style={{
        height: null,
        width: width,
        // resizeMode: "cover",
        overflow: "hidden",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onTouchStart={() => {
        navigate.navigate("OnboardingScreen");
      }}
    >
      <SafeAreaView
        style={{
          opacity: 0,
        }}
        onTouchStart={() => {
          navigate.navigate("OnboardingScreen");
        }}
      />
      <Image
        source={Logo}
        style={{ maxWidth: "95%", resizeMode: "contain" }}
        onTouchStart={() => {
          navigate.navigate("OnboardingScreen");
        }}
      />
      <SafeAreaView style={{ opacity: 0 }} />
    </ImageBackground>
    // <SafeAreaView
    //   style={{
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flex: 1,
    //     backgroundColor: "#9333EA",
    //   }}
    //   onTouchStart={() => {
    //     navigate.navigate("OnboardingScreen");
    //   }}
    // >
    //   {/* <ImageBackground source={Background}> */}
    //   <Image
    //     source={Background}
    //     style={{ height: "100%", width: "100%", resizeMode: "cover" }}
    //   />
    //   {/* </ImageBackground> */}
    // </SafeAreaView>
  );
};

export default LogoOnboarding;
