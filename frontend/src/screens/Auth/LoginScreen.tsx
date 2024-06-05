import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StatusBar,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import CheckBox from "expo-checkbox";
import Footer from "../../images/FooterLogin.png";
import Icon from "@expo/vector-icons/Fontisto";
import ColorSystem from "../../color/ColorSystem";
import { stateIsLogin } from "../../store/reducers/login.reducer";
import { usePostLoginMutation } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
import { set } from "date-fns";

const imageAspectRatio = 414 / 218;
const scaleWidth = Dimensions.get("window").width;
const scaleHeight = scaleWidth / imageAspectRatio;

const LoginScreen = ({ navigation }: any) => {
  const [isCheck, setIsCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkMail, setCheckMail] = useState(true);
  const [errorPass, setErrorPass] = useState("");
  const dispatch = useDispatch();
  let [login, { isLoading }] = usePostLoginMutation();
  const onSubmit = async () => {
    let formData = {
      email: email,
      password: password,
    };
    console.log(formData);
    let regexEmail = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    console.log(regexEmail.test(email.toLowerCase()));

    if (!regexEmail.test(email.toLowerCase())) {
      setCheckMail(false);
      return;
    }

    if (!regexEmail.test(email.toLowerCase())) {
      setCheckMail(false);
    } else {
      setCheckMail(true);
    }
    formData.password === ""
      ? setErrorPass("Password cannot be empty")
      : setErrorPass("");
    console.log(checkMail);

    if (
      checkMail === false ||
      formData.email === "" ||
      formData.password === ""
    ) {
      return;
    }

    try {
      console.log("login");
      const authInfo = await login(formData).unwrap();
      console.log(authInfo);
      dispatch(
        stateIsLogin({
          isLogin: true,
          accessToken: authInfo.accessToken,
          userId: authInfo.userId,
        })
      );
    } catch (error) {
      Alert.alert("Login failed", error.data.message);
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && isLoading === true && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={ColorSystem.primary[800]} />
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.containerview}
      >
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"#fff"}
        ></StatusBar>
        <View>
          <View style={styles.title}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "700",
                color: ColorSystem.primary[900],
                paddingBottom: 60,
              }}
            >
              Đăng nhập
            </Text>
            <Text style={{ fontSize: 17 }}>
              Hãy đăng nhập để đồng bộ dữ liệu của bạn, cũng như kết nối bạn với
              cộng đồng người dùng của chúng tôi. By signing in you are agreeing
              our:
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Sau nay lam chuyen trang");
                }}
              >
                <Text style={{ fontSize: 17, color: "#0386D0" }}>
                  Term and privacy policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.form}>
              <View style={styles.group}>
                <Icon
                  style={styles.icon}
                  name="email"
                  color={ColorSystem.primary[800]}
                />
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder="Email"
                  onChangeText={(value) => setEmail(value)}
                ></TextInput>
                {!checkMail && (
                  <Text style={{ color: "red" }}>Invalid email!</Text>
                )}
              </View>
              <View style={styles.group}>
                <Icon
                  style={styles.icon}
                  name="locked"
                  color={ColorSystem.primary[800]}
                />
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={(value) => setPassword(value)}
                ></TextInput>
                <Text style={{ color: "red" }}>{errorPass}</Text>
              </View>
              <View style={styles.group1}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    disabled={false}
                    value={isCheck}
                    onValueChange={() => setIsCheck(!isCheck)}
                  />
                  <Text style={{ marginLeft: 6 }}>Ghi nhớ đăng nhập</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("Quen mat khau");
                    }}
                  >
                    <Text style={{ color: "#0386D0" }}>Quên mật khẩu?</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEmail("");
                  setPassword("");
                  setCheckMail(true);
                  setErrorPass("");
                  navigation.navigate("RegisterScreen");
                }}
                style={styles.btnRegister}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "300", fontSize: 16 }}
                >
                  Chưa có tài khoản?
                </Text>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  {" "}
                  Đăng ký ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Image
        style={{
          zIndex: -1,
          //   backgroundColor: "cyan",
          position: "absolute",
          bottom: -200,
          width: scaleWidth,
          height: undefined,
          aspectRatio: 0.9,
        }}
        source={Footer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
  containerview: {
    paddingHorizontal: 30,
  },
  form: {
    marginTop: 50,
  },
  group: {
    marginTop: 15,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  group1: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    paddingLeft: 35,
    paddingVertical: 0,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
  },
  btn: {
    marginTop: 30,
    backgroundColor: ColorSystem.primary[800],
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  btnRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: ColorSystem.secondary[800],
    paddingVertical: 15,
    borderRadius: 10,
  },

  title: {
    marginTop: 40,
    alignItems: "flex-start",
  },
  icon: {
    fontSize: 25,
    position: "absolute",
    zIndex: 5,
    top: 12,
  },
});

export default LoginScreen;
