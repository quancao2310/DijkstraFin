import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import {
  ActivityIndicator,
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
} from "react-native";
import CheckBox from "expo-checkbox";
import Footer from "../../images/FooterLogin.png";
import Icon from "@expo/vector-icons/Fontisto";
import ColorSystem from "../../color/ColorSystem";
import { stateIsLogin } from "../../store/reducers/login.reducer";
import { usePostRegisterMutation } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
import { set } from "date-fns";
import { useCreateCategoryMutation } from "../../services/categories";

const imageAspectRatio = 414 / 218;
const scaleWidth = Dimensions.get("window").width;
const scaleHeight = scaleWidth / imageAspectRatio;

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [checkMail, setCheckMail] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [errorPass, setErrorPass] = useState("");
  const [
    createCategory,
    { isLoading: isCategoryLoading, isSuccess, isError, error },
  ] = useCreateCategoryMutation();
  let [register, { isLoading }] = usePostRegisterMutation();

  const createDefaultCategory = async (userId) => {
    const defaultCategory = [
      { name: "Tiền lương", type: "income", userId },
      { name: "Tiền thưởng", type: "income", userId },
      { name: "Học bổng", type: "income", userId },
      { name: "Đầu tư", type: "income", userId },
      { name: "Quà tặng", type: "income", userId },
      { name: "Di chuyển", type: "expense", userId },
      { name: "Mua sắm", type: "expense", userId },
      { name: "Ăn uống", type: "expense", userId },
      { name: "Tiết kiệm", type: "saving", userId },
      { name: "Quần áo", type: "expense", userId },
      { name: "Làm đẹp", type: "expense", userId },
      { name: "Hóa đơn", type: "expense", userId },
      { name: "Sức khỏe", type: "expense", userId },
      { name: "Giải trí", type: "expense", userId },
    ];

    for (const item of defaultCategory) {
      try {
        let msg = await createCategory(item).unwrap();
        console.log(msg);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async () => {
    let formData = {
      name: name,
      email: email,
      password: password,
    };
    console.log(formData);
    let regexEmail = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (name === "") {
      setCheckName(false);
    } else {
      setCheckName(true);
    }
    if (!regexEmail.test(email.toLowerCase())) {
      setCheckMail(false);
    } else {
      setCheckMail(true);
    }
    formData.password === ""
      ? setErrorPass("Mật khẩu không được để trống")
      : setErrorPass("");

    if (
      name === "" ||
      checkMail === false ||
      formData.email === "" ||
      formData.password === ""
    ) {
      return;
    }

    try {
      const authInfo = await register(formData).unwrap();
      console.log(authInfo);
      dispatch(
        stateIsLogin({
          isLogin: false,
          accessToken: authInfo.accessToken,
          userId: authInfo.userId,
        })
      );
      navigation.navigate("LoginScreen");
      Toast.show({
        type: "success",
        text1: "Chúc mừng bạn đã đăng ký thành công",
        text2: "Hãy đăng nhập để trải nghiệm ngay",
        position: "top",
        topOffset: Dimensions.get("window").height / 2 - 50,
      });
      await createDefaultCategory(authInfo.userId);
    } catch (error) {
      Alert.alert("Register failed", error.data.message);
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {((isLoading && isLoading === true) || isCategoryLoading) && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={ColorSystem.primary[800]} />
        </View>
      )}
      <View style={styles.containerview}>
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
                alignSelf: "center",
              }}
            >
              Đăng ký
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "700",
                color: ColorSystem.primary[900],
                paddingBottom: 60,
                alignSelf: "center",
              }}
            >
              DijkstraFin
            </Text>
            <Text style={{ textAlign: "center", fontSize: 17 }}>
              Hãy đăng ký để trải nghiệm những tính năng quản lý tài chính đầy
              hấp dẫn đang chờ đợi bạn.
            </Text>
          </View>
          <View>
            <View style={styles.form}>
              <View style={styles.group}>
                <Icon
                  style={styles.icon}
                  name="person"
                  color={ColorSystem.primary[800]}
                />
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder="Tên của bạn"
                  onChangeText={(value) => setName(value)}
                ></TextInput>
                {!checkName && (
                  <Text style={{ color: "red" }}>
                    Tên người dùng không được để trống
                  </Text>
                )}
              </View>
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
                  <Text style={{ color: "red" }}>
                    Email không đúng định dạng
                  </Text>
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
                  placeholder="Mật khẩu"
                  onChangeText={(value) => setPassword(value)}
                ></TextInput>
                <Text style={{ color: "red" }}>{errorPass}</Text>
              </View>
              {/* <View style={styles.group1}>
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
              </View> */}
              <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  Đăng ký
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={styles.btnRegister}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "300", fontSize: 16 }}
                >
                  Đã có tài khoản?
                </Text>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  {" "}
                  Đăng nhập ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

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
  containerview: {
    paddingHorizontal: 30,
  },
  form: {
    marginTop: 50,
  },
  group: {
    marginTop: 15,
  },
  group1: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    paddingLeft: 35,
    paddingVertical: 18,
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

export default RegisterScreen;
