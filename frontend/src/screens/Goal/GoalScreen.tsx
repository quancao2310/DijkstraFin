import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import {
  useGetUserGoalsQuery,
  useGetUserMoneySourcesQuery,
  useGetUserRecordsQuery,
} from "../../services/users";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GoalCardDetail from "../../components/Goal/goal/GoalCardDetail";
import TransactionCard from "../../components/Home/add/transaction/TransactionCard";
import { useAppDispatch } from "../../hooks/redux";
import { stateToggle } from "../../store/reducers/addMoneySrcModal.reducer";
import CircleGraphGoal from "../../components/Goal/graph/CircleGraphGoal";

const GoalScreen = ({ navigation }: any) => {
  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false);
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] =
    useState(false);
  const userId = useSelector((state: RootState) => state.LoginStatus.userId);
  let { data: moneySources } = useGetUserMoneySourcesQuery(userId);
  let { data: records, isLoading: isLoadingRecords } =
    useGetUserRecordsQuery(userId);
  const handleViewAllTransactions = () => {
    navigation.navigate("AllTransaction", { data: records });
  };
  const dispatch = useAppDispatch();
  const handleAddBudget = () => {
    if (moneySources && moneySources.length == 0) {
      Alert.alert(
        "Chưa tạo nguồn tiền",
        "Vui lòng tạo nguồn tiền trước để liên kết",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Tạo nguồn tiền",
            onPress: () => {
              console.log("Tạo nguồn tiền");
              dispatch(stateToggle());
              navigation.navigate("Ví của bạn");
            },
          },
        ]
      );
      return;
    }
    setIsAddBudgetModalVisible(true);
  };
  const handleAddTransaction = () => {
    setIsAddTransactionModalVisible(true);
  };
  const handleViewAllGoals = () => {
    navigation.navigate("All Goals", { data: goals });
  };

  let { data: goals, isLoading: isLoadingGoals } = useGetUserGoalsQuery(userId);

  useEffect(() => {
    console.log(goals);
  }, [goals, moneySources, records]);
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
          <CircleGraphGoal goals={goals} />
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
            {goals && goals.length > 0 && <ListCardGoal goals={goals} />}
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
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Giao dịch tiết kiệm
            </Text>
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
          <View style={{ marginBottom: 15 }}>
            {(!records ||
              records.filter((item) => item.type === "saving").length ===
                0) && <NoInfo name="giao dịch" />}
            {records &&
              records.length > 0 &&
              records
                .filter((item) => item.type === "saving")
                .slice(0, 3)
                .map((item, index) => {
                  return <TransactionCard record={item} key={index} />;
                })}
            {records &&
              records.filter((item) => item.type === "saving").length > 3 && (
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
          </View>

          <ModalAddGoal
            isModalVisible={isAddBudgetModalVisible}
            setIsModalVisible={setIsAddBudgetModalVisible}
            moneySources={moneySources}
          />
          <ModalAddTransaction
            isModalVisible={isAddTransactionModalVisible}
            setIsModalVisible={setIsAddTransactionModalVisible}
            navigation={navigation}
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
