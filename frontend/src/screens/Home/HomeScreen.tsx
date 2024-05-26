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
import IconGoalSystem from "../../icon/IconGoalSystem";
import ListCardBudget from "../../components/Home/budget/ListCardBudget";
import NoInfo from "../../components/Home/budget/NoInfo";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ColorSystem from "../../color/ColorSystem";
import ModalAddBudget from "../../components/Home/add/ModalAddBudget";
import ModalAddTransaction from "../../components/Home/add/ModalAddTransaction";
import CircleGraph from "../../components/Home/graph/CircleGraph";
import TransactionCard from "../../components/Home/add/transaction/TransactionCard";
import IconBudgetSystem from "../../icon/IconBugetSystem";
import BudgetDetailCard from "../../components/Home/budget/BudgetDetailCard";

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
  {
    _id: "661fb7f0e68985486257c3b9",
    amount: 10000000,
    type: "income",
    category: "salary",
    description: "Lương tháng 3",
    date: "2024-04-17T00:00:00.000Z",
    __v: 0,
  },
  {
    _id: "661fb7f4e68985486257c3bb",
    amount: 10000000,
    type: "income",
    category: "salary",
    description: "Lương tháng 4",
    date: "2024-04-17T00:00:00.000Z",
    __v: 0,
  },
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
const sample_budgets = [
  {
    _id: "664f5c4feab4cf12bf675e45",
    name: "Ăn uống",
    icon: IconBudgetSystem.restaurant,
    type: "expense",
    budget: 500000,
    used: 50000,
    userId: "664da67d075",
  },
];

const HomeScreen = ({ navigation }: any) => {
  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false);
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] =
    useState(false);
  const handleAddBudget = () => {
    setIsAddBudgetModalVisible(true);
  };
  const handleAddTransaction = () => {
    setIsAddTransactionModalVisible(true);
  };
  const handleViewAllTransactions = () => {
    navigation.navigate("AllTransaction", { data: records });
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
          <BudgetDetailCard budget={sample_budgets[0]} />

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
          {records && records.length > 3 && (
            <TouchableOpacity
              style={{
                paddingTop: 15,
                paddingBottom: 30,
                alignItems: "center",
              }}
              onPress={handleViewAllTransactions}
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
          <ModalAddBudget
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
    padding: 10,
  },
});

export default HomeScreen;
