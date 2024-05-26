import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LegendComponent = ({ labels, colors }) => {
  return (
    <View style={styles.container}>
      {labels.map((label, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: colors[index] }]} />
          <Text style={styles.labelText}>{label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  labelText: {
    fontSize: 16,
  },
});

export default LegendComponent;
