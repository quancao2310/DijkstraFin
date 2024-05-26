import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import ColorSystem from "../../color/ColorSystem";

const DateFilterButton = () => {
  const [selectedButton, setSelectedButton] = useState(0);

  const handlePress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === 0
            ? styles.selectedButton
            : styles.unselectedButton,
        ]}
        onPress={() => handlePress(0)}
      >
        <Text
          style={
            selectedButton === 0
              ? styles.selectedButtonText
              : styles.unselectedButtonText
          }
        >
          Hôm nay
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === 1
            ? styles.selectedButton
            : styles.unselectedButton,
        ]}
        onPress={() => handlePress(1)}
      >
        <Text
          style={
            selectedButton === 1
              ? styles.selectedButtonText
              : styles.unselectedButtonText
          }
        >
          Tháng này
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === 2
            ? styles.selectedButton
            : styles.unselectedButton,
        ]}
        onPress={() => handlePress(2)}
      >
        <Text
          style={
            selectedButton === 2
              ? styles.selectedButtonText
              : styles.unselectedButtonText
          }
        >
          Năm nay
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === 3
            ? styles.selectedButton
            : styles.unselectedButton,
        ]}
        onPress={() => handlePress(3)}
      >
        <Text
          style={
            selectedButton === 3
              ? styles.selectedButtonText
              : styles.unselectedButtonText
          }
        >
          Tùy chỉnh
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9999,
    // marginRight: 5,
    marginLeft: 2.5,
    marginRight: 2.5,
    width: "23.7%",
  },
  unselectedButton: {
    backgroundColor: ColorSystem.primary[100],
  },
  selectedButton: {
    backgroundColor: ColorSystem.primary[800],
  },
  unselectedButtonText: {
    color: ColorSystem.primary[600],
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
  },
  selectedButtonText: {
    color: ColorSystem.neutral[100],
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
  },
});

export default DateFilterButton;
