import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import ColorSystem from "../../color/ColorSystem";
import { MaterialIcons } from "@expo/vector-icons";

const NoRecord = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.buttonContent}>
          <MaterialIcons
            name="local-atm"
            size={24}
            color={ColorSystem.neutral[400]}
          />
          <Text
            style={{
              color: ColorSystem.neutral[400],
              fontSize: 16,
            }}
          >
            Chi tiết giao dịch
          </Text>
          <Text
            style={{
              color: ColorSystem.neutral[400],
              fontSize: 16,
            }}
          >
            sẽ hiển thị ở đây
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginVertical: "5%",
    marginHorizontal: "15%",
    borderColor: ColorSystem.neutral[300],
    borderRadius: 8,
    backgroundColor: ColorSystem.neutral[100],
    padding: "5%",
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default NoRecord;
