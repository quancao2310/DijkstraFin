import { FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import ColorSystem from "../../../color/ColorSystem";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Modal, TextInput, Button, Alert } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import * as Progress from "react-native-progress";
import {
  FlatList,
  View,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import IconTransactionSystem from "../../../icon/IconTransactionSystem";
import { center } from "@shopify/react-native-skia";
import CurrencyInput from "react-native-currency-input";
import IconGoalSystem from "../../../icon/IconGoalSystem";

function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return `${month}/${year}`;
}

const GoalCardDetail = ({ goal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState(0);

  useEffect(() => {
    console.log(goal);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.icon}>
          <View style={styles.iconTitle}>
            <MaterialIcons
              name={IconGoalSystem[goal.icon].name}
              size={32}
              color={IconGoalSystem[goal.icon].color}
            />
          </View>
        </View>
        <View>
          <Text style={styles.goalName}>{goal.name}</Text>
        </View>

        <View>
          <Menu>
            <MenuTrigger>
              <MaterialIcons
                color={ColorSystem.neutral[400]}
                name="more-vert"
                size={20}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => setModalVisible(true)}>
                <View style={styles.menuOption}>
                  <MaterialIcons name="edit" size={20} />
                  <Text style={{ color: "black" }}>Sửa</Text>
                </View>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  Alert.alert(
                    "Xác nhận",
                    "Bạn có chắc chắn muốn xóa?",
                    [
                      {
                        text: "Không",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Có",
                        onPress: () => console.log("Delete Pressed"),
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <View style={styles.menuOption}>
                  <MaterialIcons name="delete-outline" size={20} />
                  <Text style={{ color: "black" }}>Xóa</Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <SafeAreaView style={styles.modalContent}>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 16, paddingBottom: 10 }}>
                  Nhập tiền ngân sách cần sửa:
                </Text>
                <MaterialIcons
                  style={styles.moneyIcon}
                  name="attach-money"
                  size={22}
                  color={ColorSystem.neutral[400]}
                />
                <CurrencyInput
                  style={styles.input}
                  value={updatedBudget}
                  onChangeValue={setUpdatedBudget}
                  suffix=" VND"
                  delimiter="."
                  separator=","
                  placeholder="0.000 VND"
                  precision={0}
                  minValue={0}
                  onChangeText={(formattedValue) => {
                    console.log(
                      parseInt(
                        formattedValue.replace(/\./g, "").replace(" VND", "")
                      )
                    );
                  }}
                />

                <Button
                  title="Update"
                  onPress={() => {
                    // TODO: Update the goal here
                    setModalVisible(!modalVisible);
                  }}
                />

                <Button
                  title="Cancel"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: ColorSystem.neutral[400],
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#FBFCFB",
    gap: 10,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalName: {
    fontSize: 18,
    paddingLeft: 15,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  detailContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoRow: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  label: {
    fontSize: 16,
    color: "#ADADAD",
  },
  value: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "70%",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    paddingLeft: 35,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "#fff",
  },
  moneyIcon: {
    position: "absolute",
    zIndex: 5,
    top: "34%",
    left: "7%",
  },
});

export default GoalCardDetail;
