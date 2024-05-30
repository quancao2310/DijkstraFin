import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import BudgetDetailCard from "../../components/Home/budget/BudgetDetailCard";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import GoalCardDetail from "../../components/Goal/goal/GoalCardDetail";
import TransactionCard from "../../components/Home/add/transaction/TransactionCard";
const AllTransaction = ({ navigation, route }) => {
  const records = route.params.data;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 24, paddingBottom: 10 }}>
            {" "}
            Giao dịch thu chi{" "}
          </Text>
          <MaterialIcons name="filter-list" size={30} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          {records &&
            records.length > 0 &&
            records.map((item, index) => {
              return <TransactionCard key={index} record={item} />;
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllTransaction;
