import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorSystem from "../../color/ColorSystem";

interface MoneyFlowIndicatorProps {
  label: string;
  amount: number;
  percent: number;
  color: string;
}

const MoneyFlowIndicator: React.FC<MoneyFlowIndicatorProps> = ({
  label,
  amount,
  percent,
  color,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.label, { color }]}>{label}</Text>
        <Text style={[styles.amount, { color }]}>{amount} VNĐ</Text>
      </View>

      <View style={styles.ammount}>
        <View
          style={{
            padding: 5,
            width: `${percent * 100}%`,
            backgroundColor: color,
            borderRadius: 12,
          }}
        ></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ammount: {
    marginBottom: 5,
    width: "90%",
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: 12,
    marginStart: "5%",
  },
  container: {
    flexDirection: "column",
    // justifyContent: "center",
    // alignContent: "center",
    marginVertical: 10,
    width: "90%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MoneyFlowIndicator;
