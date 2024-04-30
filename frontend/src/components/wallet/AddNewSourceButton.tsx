import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import ColorSystem from "../../color/ColorSystem";
const AddNewSourceButton = () => {
  return (
    <View>
      <TouchableOpacity>
        <View style={{ paddingVertical: "5%" }}>
          <FontAwesome6 name="add" size={24} color={ColorSystem.neutral[400]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default AddNewSourceButton;
