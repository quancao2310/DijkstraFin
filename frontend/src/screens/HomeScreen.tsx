import React from "react";
import { SafeAreaView, Text } from "react-native";
import CardBudget from "../components/Home/budget/CardBudget";
import IconBudgetSystem from "../icon/IconBugetSystem";
import IconGoalSystem from "../icon/IconGoalSystem";
const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <CardBudget icon={IconGoalSystem.repair} balance={0} />
    </SafeAreaView>
  );
};

export default HomeScreen;
