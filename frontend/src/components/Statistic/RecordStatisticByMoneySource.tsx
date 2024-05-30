import ColorSystem from "../../color/ColorSystem";
import LegendComponent from "../../components/Statistic/Legends";
import MoneyFlowIndicator from "../../components/Statistic/MoneyFlowIndicator";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useGetRecordsQuery } from "../../services/records";
import { getRandomColor } from "../../utils/getRandomColor";
import { calculatePercentagesLabel } from "../../utils/calculatePercentageLebel";
import { WaitingIndicator } from "../utils/WaitingIndicator";
import PieChart from "react-native-pie-chart";

const RecordStatisticByMoneySource = () => {
  let { data: allRecords, isLoading } = useGetRecordsQuery();
  let incomeData = [];
  let outcomeData = [];
  let incomeSeries = [];
  let outcomeSeries = [];
  let colorList = [];
  let allNamesArray = [];
  if (!isLoading) {
    incomeData = allRecords.filter((x) =>
      ["isCompleted", "income"].includes(x.type)
    );
    outcomeData = allRecords.filter((x) =>
      ["goal", "expense"].includes(x.type)
    );
  }
  const totalIncome = incomeData.reduce(
    (sum, record) => sum + record.amount,
    0
  );
  const totalOutcome = outcomeData.reduce(
    (sum, record) => sum + record.amount,
    0
  );

  const incomeByMoneySource = incomeData.map((item) => ({
    moneySource: item.moneySourceId.name,
    amount: item.amount,
  }));

  const outcomeByMoneySource = outcomeData.map((item) => ({
    moneySource: item.moneySourceId.name,
    amount: item.amount,
  }));

  const incomeTotalByMoneySource =
    !isLoading &&
    incomeByMoneySource.reduce((map, item) => {
      if (map.has(item.moneySource)) {
        map.set(item.moneySource, map.get(item.moneySource) + item.amount);
      } else {
        map.set(item.moneySource, item.amount);
      }
      return map;
    }, new Map());

  const outcomeTotalByMoneySource =
    !isLoading &&
    outcomeByMoneySource.reduce((map, item) => {
      if (map.has(item.moneySource)) {
        map.set(item.moneySource, map.get(item.moneySource) + item.amount);
      } else {
        map.set(item.moneySource, item.amount);
      }
      return map;
    }, new Map());

  if (!isLoading) {
    const allNamesSet = new Set([
      ...incomeTotalByMoneySource.keys(),
      ...outcomeTotalByMoneySource.keys(),
    ]);
    allNamesArray = Array.from(allNamesSet);
    const nameToColorMap = new Map();
    allNamesArray.forEach((name) => {
      nameToColorMap.set(name, getRandomColor());
    });
    incomeSeries = allNamesArray.map(
      (name) => incomeTotalByMoneySource.get(name) || 0
    );
    outcomeSeries = allNamesArray.map(
      (name) => outcomeTotalByMoneySource.get(name) || 0
    );
    colorList = allNamesArray.map((name) => nameToColorMap.get(name));
  }
  const widthAndHeight = 150;
  const coverRadius = 0.45;
  const coverFill = ColorSystem.neutral[100];
  if (isLoading) {
    return (
      <View style={{ height: "100%", padding: "50%" }}>
        <WaitingIndicator></WaitingIndicator>
      </View>
    );
  }

  return (
    <>
      <MoneyFlowIndicator
        label="Dòng tiền ra"
        amount={totalOutcome}
        percent={totalOutcome / (totalIncome + totalOutcome)}
        color={ColorSystem.danger[700]}
      />
      <MoneyFlowIndicator
        label="Dòng tiền vào"
        amount={totalIncome}
        percent={totalIncome / (totalIncome + totalOutcome)}
        color={ColorSystem.success[700]}
      />
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
          }}
        >
          <PieChart
            widthAndHeight={widthAndHeight}
            series={incomeSeries}
            sliceColor={colorList}
            coverRadius={coverRadius}
            coverFill={coverFill}
          />
          <View style={styles.textView}>
            <Text
              style={[
                styles.text,
                { color: ColorSystem.success[700], fontWeight: "bold" },
              ]}
            >
              Tiền thu
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "relative",
            width: widthAndHeight,
            height: widthAndHeight,
            justifyContent: "center",
            alignItems: "center",
            marginEnd: 12,
            marginStart: 12,
          }}
        >
          <PieChart
            widthAndHeight={widthAndHeight}
            series={outcomeSeries}
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
              Tiền chi
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <LegendComponent
          labels={calculatePercentagesLabel(allNamesArray, incomeSeries)}
          colors={colorList}
        ></LegendComponent>
        <LegendComponent
          labels={calculatePercentagesLabel(allNamesArray, outcomeSeries)}
          colors={colorList}
        ></LegendComponent>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: ColorSystem.neutral[900],
  },
});

export default RecordStatisticByMoneySource;
