import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome6 } from "@expo/vector-icons";
import ColorSystem from "../../color/ColorSystem";
import { stateToggle } from "../../store/reducers/addMoneySrcModal.reducer";
const AddNewSourceButton = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => dispatch(stateToggle())}
      >
        <View style={styles.buttonContent}>
          <FontAwesome6 name="add" size={24} color={ColorSystem.neutral[400]} />
          <Text
            style={{
              color: ColorSystem.neutral[400],
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Thêm nguồn tiền mới
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    marginVertical: "5%",
    marginHorizontal: "5%",
    borderColor: ColorSystem.primary[600],
    borderRadius: 30,
    borderStyle: "dashed",
    padding: "5%",
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddNewSourceButton;
