import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ColorSystem from "../../color/ColorSystem";
interface props {
  icon: string;
  name: string;
  balance: number;
  used: number;
}
const getIcon = (icon, size: number, color: string) => {
  return (
    <MaterialIcons
      name={icon}
      size={size}
      color={color}
      style={{ marginVertical: "40%", marginLeft: "25%" }}
    />
  );
};

const MoneySource = (data: props) => {
  return (
    <View style={styles.card}>
      <View style={{ width: "20%" }}>
        {getIcon(data.icon, 30, ColorSystem.secondary[600])}
      </View>
      <View style={{ width: "70%" }}>
        <Text style={styles.walletName}>{data.name.toUpperCase()}</Text>
        <Text style={styles.walletUsed}>Đã chi: {data.used} VNĐ</Text>
        <Text style={styles.walletBalance}>Số dư: {data.balance} VNĐ</Text>
      </View>
      <View style={{ width: "10%" }}>
        <TouchableOpacity style={{ marginVertical: "100%" }}>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 8,
    borderColor: ColorSystem.primary[500],
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: "2.5%",
    width: "95%",
  },
  walletName: {
    marginTop: "5%",
    marginBottom: "2%",
    color: ColorSystem.secondary[600],
    fontWeight: "bold",
  },
  walletUsed: {
    color: ColorSystem.danger[700],
    marginBottom: "2%",
  },
  walletBalance: {
    color: ColorSystem.success[700],
    marginBottom: "5%",
  },
});
export default MoneySource;
