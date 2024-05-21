import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardBudget from "../../components/Home/budget/CardBudget";
import IconBudgetSystem from "../../icon/IconBugetSystem";
import IconGoalSystem from "../../icon/IconGoalSystem";
import ListCardBudget from "../../components/Home/budget/ListCardBudget";
import NoInfo from "../../components/Home/budget/NoInfo";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ColorSystem from "../../color/ColorSystem";
import ModalAddBudget from "../../components/Home/add/ModalAddBudget";
import CircleGraph from "../../components/Home/graph/CircleGraph";

const budgets = [
  { name: "restaurant", balance: 0 },
  { name: "grocery", balance: 0 },
  { name: "transport", balance: 0 },
  { name: "cloth", balance: 0 },
  { name: "beauty", balance: 0 },
  { name: "bill", balance: 0 },
  { name: "medication", balance: 0 },
  { name: "entertainment", balance: 0 },
];

const HomeScreen = () => {
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
            <Text style={{ fontSize: 20, fontWeight: "500" }}>Ngân sách</Text>
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
          <ListCardBudget budgets={budgets} />
          <NoInfo name="ngân sách" />

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

          <ModalAddBudget
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

export default HomeScreen;
