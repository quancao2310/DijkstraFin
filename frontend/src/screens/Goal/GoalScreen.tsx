import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

const GoalScreen = ({ navigation }: any) => {
  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false);
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] =
    useState(false);
  const handleAddBudget = () => {
    setIsAddBudgetModalVisible(true);
  };
  const handleAddTransaction = () => {
    setIsAddTransactionModalVisible(true);
  };
  const handleViewAllGoals = () => {
    navigation.navigate("All Goals", { data: goals });
  };
  const userId = useSelector((state: RootState) => state.LoginStatus.userId);

  let { data: goals, isLoading: isLoadingGoals } = useGetUserGoalsQuery(userId);

  useEffect(() => {
    console.log(goals);
  }, [goals]);
  return (
    <SafeAreaView
      style={[
        styles.container,
        isAddBudgetModalVisible
          ? { backgroundColor: "rgba(0,0,0,0.3)" }
          : { backgroundColor: "#fff" },
      ]}
    >
      {isLoadingGoals && isLoadingGoals == true && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={ColorSystem.primary[800]} />
        </View>
      )}
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
          <View style={{ paddingBottom: 15 }}>
            <ListCardGoal goals={goals} />
          </View>
          {goals &&
            goals.length > 0 &&
            goals.slice(0, 2).map((goal, index) => {
              return <GoalCardDetail goal={goal} key={index} />;
            })}
          {goals && goals.length > 2 && (
            <TouchableOpacity
              style={{
                paddingTop: 15,
                paddingBottom: 30,
                alignItems: "center",
              }}
              onPress={handleViewAllGoals}
            >
              <Text
                style={{
                  color: ColorSystem.secondary[600],
                  fontSize: 16,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          )}
          {(!goals || goals.length < 1) && <NoInfo name="kế hoạch" />}

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
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
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
