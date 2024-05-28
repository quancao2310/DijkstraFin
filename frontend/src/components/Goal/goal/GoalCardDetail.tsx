import { FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import ColorSystem from "../../../color/ColorSystem";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Modal, TextInput, Button, Alert } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
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

function formatCurrencyTotal(number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.icon}>
          <AnimatedCircularProgress
            size={60}
            width={6}
            fill={(goal.balance / goal.total) * 100}
            tintColor={IconGoalSystem[goal.icon].color}
            backgroundColor={ColorSystem.neutral[300]}
          >
            {(fill) => (
              <View style={styles.iconTitle}>
                <MaterialIcons
                  name={IconGoalSystem[goal.icon].name}
                  size={32}
                  color={IconGoalSystem[goal.icon].color}
                />
              </View>
            )}
          </AnimatedCircularProgress>
          <View style={styles.leftContainer}>
            <Text style={styles.goalName}>
              {goal.name.length < 16
                ? goal.name
                : goal.name.slice(0, 14) + "..."}
            </Text>
            <View style={styles.detailContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Bắt đầu:</Text>
                <Text style={styles.value}>{formatDate(goal.startDate)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Kết thúc:</Text>
                <Text style={styles.value}>{formatDate(goal.endDate)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.goalName}>
              {formatCurrencyTotal(goal.total)}
            </Text>
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
          </View>
          <View style={styles.detailRightContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Còn lại:</Text>
              <Text style={styles.value}>
                {formatCurrency(goal.total - goal.balance)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Đã tiết kiệm:</Text>
              <Text style={styles.value}>{formatCurrency(goal.balance)}</Text>
            </View>
          </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: ColorSystem.neutral[400],
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#FBFCFB",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  icon: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 5,
  },
  iconTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalName: {
    fontSize: 18,
    paddingBottom: 15,
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
    gap: 5,
  },
  detailRightContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  label: {
    fontSize: 13,
    color: "#ADADAD",
  },
  value: {
    fontSize: 13,
    color: "#ADADAD",
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
