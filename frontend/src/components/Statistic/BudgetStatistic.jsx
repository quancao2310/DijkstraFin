import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";
import { getRandomColor } from "../../utils/getRandomColor";
import LegendComponent from "../../components/Statistic/Legends";
import { useGetBudgetsQuery } from "../../services/budgets";
import { WaitingIndicator } from "../utils/WaitingIndicator";
import { useGetCategoriesQuery } from "../../services/categories";
import ColorSystem from "../../color/ColorSystem";
import { formatNumberWithPeriods } from "../../utils/numberUtils";
import { calculatePercentagesLabel } from "../../utils/calculatePercentageLebel";

const BudgetStatistic = () => {
  const { data: budgets, isLoading: isLoadingBudgets } = useGetBudgetsQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  let joinData = [];

  if (budgets == undefined || categories == undefined) {
    return (
      <View style={{ height: "100%", padding: "50%" }}>
        <WaitingIndicator />
      </View>
    );
  } else {
    joinData = budgets.map((budget) => {
      const category = categories.find((cat) => cat.budgetId === budget._id);
      return {
        currentSpent: budget.currentSpent,
        categoryName: category ? category.name : "Unknown",
        categoryType: category ? category.type : "Unknown",
      };
    });
  }
  const aggregatedData = joinData.reduce((acc, item) => {
    if (acc[item.categoryName]) {
      acc[item.categoryName] += item.currentSpent;
    } else {
      acc[item.categoryName] = item.currentSpent;
    }
    return acc;
  }, {});

  const result = Object.keys(aggregatedData)
    .map((categoryName) => ({
      categoryName,
      currentSpent: aggregatedData[categoryName],
    }))
    .filter((item) => item.categoryName != "Unknown");

  const series = result.map((item) => item.currentSpent);
  const colorList = result.map((item) => getRandomColor());
  const labelList = result.map((item) => item.categoryName);
  const widthAndHeight = 200;
  const coverRadius = 0.65;
  const coverFill = ColorSystem.neutral[100];

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            position: "relative",
            width: widthAndHeight,
            height: widthAndHeight,
            justifyContent: "center",
            alignItems: "center",
            marginEnd: 12,
            marginStart: 12,
            paddingTop: 50,
          }}
        >
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={colorList}
            coverRadius={coverRadius}
            coverFill={coverFill}
          />
          <View style={styles.textView}>
            <Text
              style={[
                styles.text,
                { color: ColorSystem.danger[700], fontWeight: "bold" },
              ]}
            >
              {formatNumberWithPeriods(
                series.reduce((sum, item) => sum + item, 0)
              )}{" "}
              VNĐ
            </Text>
          </View>
        </View>
        <LegendComponent
          labels={calculatePercentagesLabel(labelList, series)}
          colors={colorList}
        ></LegendComponent>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  text: {
    fontSize: 16,
    color: ColorSystem.neutral[900],
  },
});

export default BudgetStatistic;
