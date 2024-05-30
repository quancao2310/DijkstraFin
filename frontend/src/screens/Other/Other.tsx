// /screens/Other/OtherScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ColorSystem from "../../color/ColorSystem";
import { useAppDispatch } from "../../hooks/redux";
import { logOut } from "../../store/reducers/login.reducer";

export default function OtherScreen() {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    console.log("User signed out");
    dispatch(logOut());
  };

  const handleHelp = () => {
    console.log("help");
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài đặt</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Thông tin thêm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trung tâm hỗ trợ</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleHelp}>
            Hỗ trợ
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button, styles.signOutButton]}>
        <Text style={styles.buttonText} onPress={handleSignOut}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: ColorSystem.primary[600],
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  signOutButton: {
    marginTop: 20,
  },
});
