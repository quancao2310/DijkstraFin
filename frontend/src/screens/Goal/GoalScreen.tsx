import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ListCardGoal from "../../components/Goal/goal/ListCardGoal";
import NoInfo from "../../components/Home/budget/NoInfo";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ColorSystem from "../../color/ColorSystem";
import ModalAddGoal from "../../components/Goal/add/ModalAddGoal";
import CircleGraph from "../../components/Home/graph/CircleGraph";
import ModalAddTransaction from "../../components/Home/add/ModalAddTransaction";
import { useGetUserGoalsQuery } from "../../services/users";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GoalCardDetail from "../../components/Goal/goal/GoalCardDetail";

const goals = [
  {
    _id: "6651c8a19d93aa935ebd0e2c",
    name: "Tiệc sinh nhật",
    total: 4000000,
    balance: 4000000,
    isCompleted: true,
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: "2024-02-01T00:00:00.000Z",
    icon: "beach-access",
    userId: "664da67d075cdd1e0f0a9851",
    moneySourceId: "664ebbacbb15d5d4a664d3a9",
    __v: 0,
  },
  {
    _id: "6651c8709d93aa935ebd0e2a",
    name: "Học đại học",
    total: 100000000,
    balance: 0,
    isCompleted: false,
    startDate: "2021-09-30T00:00:00.000Z",
    endDate: "2025-09-30T00:00:00.000Z",
    icon: "beach-access",
    userId: "664da67d075cdd1e0f0a9851",
    moneySourceId: "664f5925eab4cf12bf675e44",
    __v: 0,
  },
  {
    _id: "6651c8469d93aa935ebd0e28",
    name: "Sửa nhà",
    total: 50000000,
    balance: 0,
    isCompleted: false,
    startDate: "2021-01-01T00:00:00.000Z",
    endDate: "2023-01-01T00:00:00.000Z",
    icon: "beach-access",
    userId: "664da67d075cdd1e0f0a9851",
    moneySourceId: "664f5925eab4cf12bf675e44",
    __v: 0,
  },
  {
    _id: "6651c7ed9d93aa935ebd0e26",
    name: "Đi du lịch 2026",
    total: 25000000,
    balance: 7500000,
    isCompleted: false,
    startDate: "2025-01-01T00:00:00.000Z",
    endDate: "2026-01-01T00:00:00.000Z",
    icon: "beach-access",
    userId: "664da67d075cdd1e0f0a9851",
    moneySourceId: "664f5925eab4cf12bf675e44",
    __v: 0,
  },
  {
    _id: "6651c4f79d93aa935ebd0e1c",
    name: "Đi du lịch 2022",
    total: 30000000,
    balance: 30000000,
    isCompleted: true,
    startDate: "2021-01-01T00:00:00.000Z",
    endDate: "2022-01-01T00:00:00.000Z",
    icon: "beach-access",
    userId: "664da67d075cdd1e0f0a9851",
    moneySourceId: "664f5925eab4cf12bf675e44",
    __v: 0,
  },
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
  const userId = useSelector((state: RootState) => state.LoginStatus.userId);

  //   let { data: goals, isLoading: isLoadingGoals } = useGetUserGoalsQuery(userId);

  useEffect(() => {
    console.log(goals);
    console.log("GoalScreen");
  });
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
          <GoalCardDetail goal={goals[3]} />
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
