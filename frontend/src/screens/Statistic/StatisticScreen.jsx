import ColorSystem from "../../color/ColorSystem";
import LegendComponent from "../../components/Statistic/Legends";
import MoneyFlowIndicator from "../../components/Statistic/MoneyFlowIndicator";
import DateFilterButton from "../../components/utils/DateFilterButton";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";

const StatisticScreen = () => {
  const widthAndHeight = 150;
  const series = [123, 321, 123];
  const sliceColor = ["#5A9", "#F88", "#9C6"];
  const coverRadius = 0.45;
  const coverFill = "#FFF";

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <DateFilterButton />
        <MoneyFlowIndicator
          label="Dòng tiền ra"
          amount="40000"
          percent={0.4}
          color={ColorSystem.danger[700]}
        />
        <MoneyFlowIndicator
          label="Dòng tiền vào"
          amount="60000"
          percent={0.6}
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
              series={series}
              sliceColor={sliceColor}
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
              series={series}
              sliceColor={sliceColor}
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
            labels={["Ví tiền mặt (40%)", "Momo (60%)", "Visa (0%)"]}
            colors={["#5A9", "#F88", "#9C6"]}
          ></LegendComponent>
          <LegendComponent
            labels={["Ví tiền mặt (40%)", "Momo (60%)", "Visa (0%)"]}
            colors={["#5A9", "#F88", "#9C6"]}
          ></LegendComponent>
        </View>
      </SafeAreaView>
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
    color: "#000",
  },
});

export default StatisticScreen;
