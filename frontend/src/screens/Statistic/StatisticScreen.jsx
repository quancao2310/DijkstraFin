import ColorSystem from "../../color/ColorSystem";
import DateFilterButton from "../../components/utils/DateFilterButton";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import RecordStatisticByMoneySource from "../../components/Statistic/RecordStatisticByMoneySource";
import BudgetStatistic from "../../components/Statistic/BudgetStatistic";

const StatisticScreen = () => {
  return (
    <>
      <ScrollView>
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
          <DateFilterButton />
          <RecordStatisticByMoneySource></RecordStatisticByMoneySource>
          <View style={style.titleContainer}>
            <Text style={style.title}>Danh mục chi tiêu</Text>
          </View>
          <BudgetStatistic></BudgetStatistic>
        </SafeAreaView>
        <View style={{ padding: "20%" }}></View>
      </ScrollView>
    </>
  );
};
const style = StyleSheet.create({
  title: {
    color: ColorSystem.primary[600],
    fontWeight: "bold",
    fontSize: 24,
  },
  titleContainer: {
    paddingEnd: "50%",
    justifyContent: "flex-start",
  },
});
export default StatisticScreen;
