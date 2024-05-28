import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import ColorSystem from "../../../color/ColorSystem";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  FlatList,
  View,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

interface props {
  icon: any;
  balance: number;
}
function convertMoney(amount) {
  if (amount < 1000) {
    return amount + " VND";
  } else if (amount < 1000000) {
    return Math.floor(amount / 1000) + "K";
  } else if (amount < 1000000000) {
    return (amount / 1000000).toFixed(1).replace(".0", "") + "M";
  } else {
    return (amount / 1000000000).toFixed(1).replace(".0", "") + "B";
  }
}

const CardBudget = (data: props) => {
  return (
    <>
      <View style={styles.container}>
        <MaterialIcons
          name={data.icon.name}
          size={32}
          color={data.icon.color}
        />
        <Text style={styles.title}>{data.icon.title}</Text>
        <Text style={styles.balance}>
          {data.balance === 0 ? "0 VND" : convertMoney(data.balance)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: ColorSystem.neutral[400],
    borderRadius: 8,
    aspectRatio: 1,
  },
  title: {
    color: ColorSystem.neutral[900],
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5,
  },
  balance: { color: ColorSystem.neutral[400] },
});

export default CardBudget;
