import React from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import DateFilterButton from "../../components/wallet/DateFilterButton";
import MoneySource from "../../components/wallet/MoneySource";
import ColorSystem from "../../color/ColorSystem";
import AddNewSourceButton from "../../components/wallet/AddNewSourceButton";
import NoRecord from "../../components/records/NoRecord";
const tempData = [
  {
    name: "Visa",
    balance: 10000,
    used: 100,
    icon: "credit-card",
  },
  {
    name: "Ví tiền mặt",
    balance: 1000000,
    used: 0,
    icon: "wallet",
  },
  {
    name: "Shopee Pay",
    balance: 1000000,
    used: 0,
    icon: "shopping-cart",
  },
];

export default function WalletScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView nestedScrollEnabled={true}>
        <DateFilterButton></DateFilterButton>
        <View style={styles.innerScroll}>
          <ScrollView>
            {tempData.map((item) => (
              <MoneySource
                name={item.name}
                balance={item.balance}
                used={item.used}
                icon={item.icon}
              ></MoneySource>
            ))}
          </ScrollView>
        </View>
        <AddNewSourceButton></AddNewSourceButton>
        <NoRecord></NoRecord>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  innerScroll: {
    height: 0.4 * Dimensions.get("window").height,
    borderBottomWidth: 1,
    borderColor: ColorSystem.primary[600],
  },
});
