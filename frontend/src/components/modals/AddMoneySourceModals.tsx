import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { RootState } from "../../store";
import { stateToggle } from "../../store/reducers/addMoneySrcModal.reducer";
import ColorSystem from "../../color/ColorSystem";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useCreateMoneySourceMutation } from "../../services/moneySources";

const AddMoneySrcModal = () => {
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector(
    (state: RootState) => state.AddMoneySrcModal.visible
  );
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [createMoneySource] = useCreateMoneySourceMutation();

  const handleCreate = async () => {
    try {
      await createMoneySource({ name, balance: parseFloat(balance) }).unwrap();
      dispatch(stateToggle()); // Close the modal on success
      setName(""); // Clear the inputs
      setBalance("");
    } catch (error) {
      console.error("Failed to create money source:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        dispatch(stateToggle());
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ marginTop: 0, padding: 0, alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                width: "auto",
              }}
              onPress={() => dispatch(stateToggle())}
            >
              <Text style={{ fontSize: 22 }}>x</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Thêm nguồn tiền</Text>
          <Text style={styles.textLabel}>Tên nguồn tiền:</Text>
          <View style={styles.inputView}>
            <View style={{ marginTop: 4, marginEnd: 2 }}>
              <MaterialIcons name="monetization-on" size={18} color="black" />
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity
              style={{ marginTop: 4, marginEnd: 2 }}
              onPress={() => setName("")}
            >
              <Text>x</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textLabel}>Số dư:</Text>
          <View style={styles.inputView}>
            <View style={{ marginTop: 4, marginEnd: 2 }}>
              <MaterialIcons name="balance" size={18} color="black" />
            </View>
            <TextInput
              style={styles.input}
              value={balance}
              onChangeText={setBalance}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={{ marginTop: 4, marginEnd: 2 }}
              onPress={() => setBalance("")}
            >
              <Text>x</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleCreate}
          >
            <Text
              style={{ color: ColorSystem.neutral[100], textAlign: "center" }}
            >
              Thêm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  input: {
    width: "90%",
  },
  inputView: {
    flexDirection: "row",
    width: "95%",
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: "2.5%",
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    paddingBottom: 35,
    paddingHorizontal: 25,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: ColorSystem.secondary[600],
    width: "50%",
    alignSelf: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
  modalTitle: {
    color: ColorSystem.secondary[600],
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  textLabel: {
    marginHorizontal: "2.5%",
    color: ColorSystem.neutral[600],
  },
});
export default AddMoneySrcModal;
