import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import IconBudgetSystem from "../../../icon/IconBugetSystem";
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

interface props {
  record: any;
}
function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("vi-VN", {
    // style: "currency",
    currency: "VND",
  });
  return formatter.format(amount) + " VND";
}

function formatDate(isoString) {
  const date = new Date(isoString);

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month and date
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();

  return `${month} ${day}`;
}

const BudgetDetailCard = ({ budget }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState(0);
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name={budget.icon.name}
              size={32}
              color={budget.icon.color}
            />
            <Text style={{ fontSize: 18, paddingLeft: 15 }}>{budget.name}</Text>
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <MaterialIcons name="edit" size={20} />
                    <Text style={{ color: "black" }}>Sửa</Text>
                  </View>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    Alert.alert(
                      "Xác nhận", // Title
                      "Bạn có chắc chắn muốn xóa?", // Message
                      [
                        {
                          text: "Không", // No option
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Có", // Yes option
                          onPress: () => console.log("Delete Pressed"),
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <MaterialIcons name="delete-outline" size={20} />
                    <Text style={{ color: "black" }}>Xóa</Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <Progress.Bar
            progress={budget.used / budget.budget}
            color={budget.icon.color}
            width={null}
            borderWidth={0}
            unfilledColor={"#DEDDDD"}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{ flexDirection: "column", alignItems: "center", gap: 5 }}
          >
            <Text style={{ fontSize: 16, color: "#ADADAD" }}>Đã chi tiêu</Text>
            <Text style={{ fontSize: 16 }}>{formatCurrency(budget.used)}</Text>
          </View>
          <View
            style={{ flexDirection: "column", alignItems: "center", gap: 5 }}
          >
            <Text style={{ fontSize: 16, color: "#ADADAD" }}>
              Ngân sách hàng tháng
            </Text>
            <Text style={{ fontSize: 16 }}>
              {formatCurrency(budget.budget)}
            </Text>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SafeAreaView
              style={{
                width: "70%",
                backgroundColor: "#fff",
                borderColor: "#000",
                borderWidth: 1,
                borderRadius: 10,
              }}
            >
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 16, paddingBottom: 10 }}>
                  Nhập tiền ngân sách cần sửa:
                </Text>
                <MaterialIcons
                  style={{
                    position: "absolute",
                    zIndex: 5,
                    top: "34%",
                    left: "7%",
                  }}
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
                  // showPositiveSign
                  onChangeText={(formattedValue) => {
                    console.log(
                      parseInt(
                        formattedValue.replace(/\./g, "").replace(" VND", "")
                      )
                    ); // 100.000 VND
                  }}
                />
                {/* <TextInput
                  style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  onChangeText={(text) => setUpdatedBudget(text)}
                  value={updatedBudget}
                /> */}

                <Button
                  title="Update"
                  onPress={() => {
                    // TODO: Update the budget here
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
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: ColorSystem.neutral[400],
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#FBFCFB",
    gap: 10,
    // aspectRatio: 1,
  },
  title: {
    color: ColorSystem.neutral[900],
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5,
  },
  balance: { color: ColorSystem.neutral[400] },
  input: {
    paddingLeft: 35,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "#fff",
  },
});

export default BudgetDetailCard;
