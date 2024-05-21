import React from "react";
import { Text, View } from "react-native";
import DonutChartContainer from "./DonutChartScreen";
const CircleGraph = () => {
  return (
    <View
      style={{
        flex: 1,
        aspectRatio: 1,
        borderColor: "#555",
      }}
    >
      <DonutChartContainer />
    </View>
  );
};

export default CircleGraph;
