import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import IconBudgetSystem from "../../../../icon/IconBugetSystem";
import ColorSystem from "../../../../color/ColorSystem";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  FlatList,
  View,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import IconTransactionSystem from "../../../../icon/IconTransactionSystem";
import IconGoalSystem from "../../../../icon/IconGoalSystem";

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

const TransactionCard = ({ record }) => {
  let iconName = "";
  const iconColor = "";

  if (record.type == "expense" || record.type == "income") {
    iconName = IconTransactionSystem[record.categoryId.name].name;
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftItem}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={
                record.type == "expense" || record.type == "income"
                  ? IconTransactionSystem[record.categoryId.name].name
                  : IconGoalSystem[record.goalId.icon].name
              }
              size={32}
              color={
                record.type == "expense" || record.type == "income"
                  ? IconTransactionSystem[record.categoryId.name].color
                  : IconGoalSystem[record.goalId.icon].color
              }
            />
          </View>
          <View style={{ paddingLeft: 15 }}>
            <Text style={{ fontSize: 18 }}>
              {record.description.length + record.amount.toString().length <= 25
                ? record.description
                : record.description.slice(
                    0,
                    15 + record.amount.toString().length - 9
                  ) + "..."}
            </Text>
            <Text
              style={{
                paddingTop: 5,
                fontSize: 15,
                color: ColorSystem.neutral[400],
              }}
            >
              {formatDate(record.date)}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <MaterialIcons
            color={ColorSystem.neutral[400]}
            name="more-vert"
            size={20}
          />
          <Text style={{ fontSize: 18, paddingTop: 5 }}>
            {record.type == "expense" ? "- " : "+ "}
            {formatCurrency(record.amount)}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: ColorSystem.neutral[400],
    borderRadius: 8,
    marginVertical: 5,
    // aspectRatio: 1,
  },
  leftItem: { flexDirection: "row", alignItems: "center" },
  title: {
    color: ColorSystem.neutral[900],
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5,
  },
  balance: { color: ColorSystem.neutral[400] },
  iconContainer: {
    backgroundColor: ColorSystem.neutral[200],
    padding: 10,
    borderRadius: 100,
  },
});

export default TransactionCard;
