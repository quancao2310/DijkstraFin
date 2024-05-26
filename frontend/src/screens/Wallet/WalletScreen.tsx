import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, View, Dimensions } from "react-native";
import DateFilterButton from "../../components/utils/DateFilterButton";
import MoneySource from "../../components/wallet/MoneySource";
import ColorSystem from "../../color/ColorSystem";
import AddNewSourceButton from "../../components/wallet/AddNewSourceButton";
import NoRecord from "../../components/records/NoRecord";
import RecordCard from "../../components/records/RecordCard";
import AddMoneySrcModal from "../../components/modals/AddMoneySourceModals";

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
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AddMoneySrcModal />
      <ScrollView nestedScrollEnabled={true}>
        <DateFilterButton />
        <View style={styles.innerScroll}>
          <ScrollView nestedScrollEnabled={true}>
            {tempData.map((item, index) => (
              <MoneySource
                key={index}
                name={item.name}
                balance={item.balance}
                used={item.used}
                icon={item.icon}
              />
            ))}
          </ScrollView>
        </View>
        <AddNewSourceButton />
        <NoRecord />
        <RecordCard source="tiền mặt" title="mua quà" amount={10000} date="14/2/2024" />
        <RecordCard source="tiền mặt" title="mua quà" amount={10000} date="14/2/2024" />
        <RecordCard source="tiền mặt" title="mua quà" amount={10000} date="14/2/2024" />
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
