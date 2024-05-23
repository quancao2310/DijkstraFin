import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import ColorSystem from "../../../color/ColorSystem";
import { MaterialIcons } from "@expo/vector-icons";
const NoInfo = (props: any) => {
  const { name } = props;
  return (
    <>
      <View>
        <View style={styles.container}>
          <View style={styles.buttonContent}>
            <MaterialIcons
              name="local-atm"
              size={36}
              color={ColorSystem.neutral[400]}
            />
            <Text
              style={{
                color: ColorSystem.neutral[400],
                fontSize: 18,
                paddingTop: 10,
              }}
            >
              Chi tiết {name}
            </Text>
            <Text
              style={{
                color: ColorSystem.neutral[400],
                fontSize: 18,
              }}
            >
              sẽ hiển thị ở đây
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: "5%",
    borderColor: ColorSystem.neutral[300],
    borderRadius: 8,
    backgroundColor: ColorSystem.neutral[100],
    padding: "7%",
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoInfo;
