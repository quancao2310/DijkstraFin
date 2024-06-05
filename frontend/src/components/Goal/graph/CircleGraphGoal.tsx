import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { DonutChartContainerGoal } from "./DonutChartScreenGoal";
const CircleGraphGoal = ({ goals }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        borderColor: "#555",
      }}
    >
      {goals && goals.length >= 0 && <DonutChartContainerGoal goals={goals} />}
    </View>
  );
};

export default CircleGraphGoal;
