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

const GoalScreen = () => {
  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false);
  const handleAddBudget = () => {
    setIsAddBudgetModalVisible(true);
  };
  const handleAddTransaction = () => {};
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
