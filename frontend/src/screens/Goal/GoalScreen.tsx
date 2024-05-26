import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CardGoal from "../../components/Goal/goal/CardGoal";
import IconBudgetSystem from "../../icon/IconBugetSystem";
import IconGoalSystem from "../../icon/IconGoalSystem";
import ListCardGoal from "../../components/Goal/goal/ListCardGoal";
import NoInfo from "../../components/Home/budget/NoInfo";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ColorSystem from "../../color/ColorSystem";
import ModalAddGoal from "../../components/Goal/add/ModalAddGoal";
import CircleGraph from "../../components/Home/graph/CircleGraph";
import ModalAddTransaction from "../../components/Home/add/ModalAddTransaction";

const goals = [
  { name: "vacation", balance: 0 },
  { name: "house", balance: 0 },
  { name: "graduation", balance: 0 },
  { name: "car", balance: 0 },
  { name: "repair", balance: 0 },
  { name: "furniture", balance: 0 },
  { name: "investment", balance: 0 },
  { name: "boat", balance: 0 },
];
const moneySources = [
  {
    _id: "664ebbacbb15d5d4a664d3a9",
    name: "Ví điện tử Momo",
    balance: 2000000,
    userId: "664da67d075cdd1e0f0a9851",
  },
  {
    _id: "664f5925eab4cf12bf675e44",
    name: "Ngân hàng ABC",
    balance: 1000000,
    userId: "664da67d075cdd1e0f0a9851",
    __v: 0,
  },
  {
    _id: "664f6147eab08ab2cd75ad4d",
    name: "Ngân hàng XYZ",
    balance: 0,
    userId: "664da67d075cdd1e0f0a9851",
    __v: 0,
  },
];

const GoalScreen = () => {
  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false);
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] =
    useState(false);
  const handleAddBudget = () => {
    setIsAddBudgetModalVisible(true);
  };
  const handleAddTransaction = () => {
    setIsAddTransactionModalVisible(true);
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        isAddBudgetModalVisible
          ? { backgroundColor: "rgba(0,0,0,0.3)" }
          : { backgroundColor: "#fff" },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.containerview}>
          <CircleGraph />
          <View style={styles.addBudget}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>Kế hoạch</Text>
            <TouchableOpacity
              style={styles.buttonAddBudget}
              onPress={handleAddBudget}
            >
              <MaterialIcons
                name="add"
                size={25}
                color={ColorSystem.secondary[600]}
              />
              <Text style={{ fontSize: 18, color: ColorSystem.secondary[600] }}>
                Thêm
              </Text>
            </TouchableOpacity>
          </View>
          <ListCardGoal goals={goals} />
          <NoInfo name="kế hoạch" />

          <View style={styles.addBudget}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>Giao dịch</Text>
            <TouchableOpacity
              style={styles.buttonAddBudget}
              onPress={handleAddTransaction}
            >
              <MaterialIcons
                name="add"
                size={25}
                color={ColorSystem.secondary[600]}
              />
              <Text style={{ fontSize: 18, color: ColorSystem.secondary[600] }}>
                Thêm
              </Text>
            </TouchableOpacity>
          </View>
          <NoInfo name="giao dịch" />

          <ModalAddGoal
            isModalVisible={isAddBudgetModalVisible}
            setIsModalVisible={setIsAddBudgetModalVisible}
            moneySources={moneySources}
          />
          <ModalAddTransaction
            isModalVisible={isAddTransactionModalVisible}
            setIsModalVisible={setIsAddTransactionModalVisible}
            moneySources={moneySources}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerview: {
    paddingHorizontal: "5%",
  },
  addBudget: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "3%",
  },
  buttonAddBudget: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "",
    padding: 10,
  },
});

export default GoalScreen;