import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import BudgetDetailCard from "../../components/Home/budget/BudgetDetailCard";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
const AllBudget = ({ navigation, route }) => {
  const budgets = route.params.data;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 24, paddingBottom: 10 }}> Ngân sách</Text>
          <MaterialIcons name="filter-list" size={30} />
        </View>
        <ScrollView>
          {budgets &&
            budgets.length > 0 &&
            budgets.map((item, index) => {
              return <BudgetDetailCard key={index} budget={item} />;
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllBudget;
