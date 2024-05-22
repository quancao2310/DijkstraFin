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
import ModalAddTransaction from "../../components/Home/add/ModalAddTransaction";
import CircleGraph from "../../components/Home/graph/CircleGraph";
import TransactionCard from "../../components/Home/add/transaction/TransactionCard";

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

const records = [
  {
    _id: "661fb7c7e68985486257c3b3",
    amount: 25000,
    type: "expense",
    category: "restaurant",
    description: "Ăn sáng",
    date: "2024-04-17T00:00:00.000Z",
    __v: 0,
  },
  {
    _id: "661fb7d3e68985486257c3b5",
    amount: 50000,
    type: "expense",
    category: "beauty",
    description: "Ăn trưa",
    date: "2024-04-17T00:00:00.000Z",
    __v: 0,
  },
  {
    _id: "661fb7d7e68985486257c3b7",
    amount: 50000,
    type: "expense",
    category: "restaurant",
    description: "Ăn tối",
    date: "2024-04-17T00:00:00.000Z",
    __v: 0,
  },
  //   {
  //     _id: "661fb7f0e68985486257c3b9",
  //     amount: 10000000,
  //     type: "income",
  //     category: "salary",
  //     description: "Lương tháng 3",
  //     date: "2024-04-17T00:00:00.000Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "661fb7f4e68985486257c3bb",
  //     amount: 10000000,
  //     type: "income",
  //     category: "salary",
  //     description: "Lương tháng 4",
  //     date: "2024-04-17T00:00:00.000Z",
  //     __v: 0,
  //   },
  {
    _id: "66201ee6b7049857abc2b2dc",
    amount: 25000,
    type: "expense",
    category: "restaurant",
    description: "Ăn sáng",
    date: "2024-04-17T00:00:00.000Z",
    __v: 0,
  },
];

const HomeScreen = () => {
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
        isAddBudgetModalVisible || isAddTransactionModalVisible
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
          {(!records || records.length === 0) && <NoInfo name="giao dịch" />}
          {records &&
            records.length > 0 &&
            records.map((item, index) => {
              return <TransactionCard record={item} key={index} />;
            })}
          <ModalAddBudget
            isModalVisible={isAddBudgetModalVisible}
            setIsModalVisible={setIsAddBudgetModalVisible}
          />
          <ModalAddTransaction
            isModalVisible={isAddTransactionModalVisible}
            setIsModalVisible={setIsAddTransactionModalVisible}
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
    padding: 10,
  },
});

export default HomeScreen;
