import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
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
interface Data {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

type Props = {
  item: Data;
  index: number;
};

const RenderItemGoal = ({ item, index }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <Animated.View
      style={[styles.container, { width: width * 0.9 }]}
      entering={FadeInDown.delay(index * 200)}
      exiting={FadeOutDown}
    >
      <View style={styles.contentContainer}>
        <View style={[styles.color, { backgroundColor: item.color }]} />
        <Text style={{ fontSize: 16, fontWeight: "bold", color: item.color }}>
          {item.name}
        </Text>
        <Text style={styles.text}>{item.percentage}%</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: item.color }}>
          {convertMoney(item.value)}
        </Text>
      </View>
    </Animated.View>
  );
};

export default RenderItemGoal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#f4f7fc",
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  color: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
