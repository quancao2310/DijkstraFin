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

interface props {
  record: any;
}
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

const TransactionCard = (data: props) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftItem}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={IconBudgetSystem[data.record.category].name}
              size={32}
              color={IconBudgetSystem[data.record.category].color}
            />
          </View>
          <View style={{ paddingLeft: 15 }}>
            <Text style={{ fontSize: 18 }}>{data.record.description}</Text>
            <Text
              style={{
                paddingTop: 5,
                fontSize: 15,
                color: ColorSystem.neutral[400],
              }}
            >
              {formatDate(data.record.date)}
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
            {data.record.type == "expense" ? "- " : "+ "}
            {formatCurrency(data.record.amount)}
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
