import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import BudgetDetailCard from "../../components/Home/budget/BudgetDetailCard";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import GoalCardDetail from "../../components/Goal/goal/GoalCardDetail";
const AllGoal = ({ navigation, route }) => {
  const goals = route.params.data;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 24, paddingBottom: 10 }}> Kế hoạch </Text>
          <MaterialIcons name="filter-list" size={30} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          {goals &&
            goals.length > 0 &&
            goals.map((item, index) => {
              return <GoalCardDetail key={index} goal={item} />;
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllGoal;
