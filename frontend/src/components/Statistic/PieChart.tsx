// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { PieChart } from "react-native-svg-charts";
// import { Circle, G, Line, Text as SvgText } from "react-native-svg";

// const data = [
//   { key: 1, amount: 80, svg: { fill: "#600080" }, label: "Quần áo" },
//   { key: 2, amount: 80, svg: { fill: "#9900cc" }, label: "Mua sắm" },
//   { key: 3, amount: 60, svg: { fill: "#c61aff" }, label: "Đi lại" },
//   { key: 4, amount: 20, svg: { fill: "#d966ff" }, label: "Sức khỏe" },
//   { key: 5, amount: 40, svg: { fill: "#ecb3ff" }, label: "Làm đẹp" },
// ];

// const Labels = ({ slices }) =>
//   slices.map((slice, index) => {
//     const { labelCentroid, pieCentroid, data } = slice;
//     return (
//       <G key={index}>
//         <Line
//           x1={labelCentroid[0]}
//           y1={labelCentroid[1]}
//           x2={pieCentroid[0]}
//           y2={pieCentroid[1]}
//           stroke={"black"}
//         />
//         <SvgText
//           x={labelCentroid[0]}
//           y={labelCentroid[1]}
//           fill={"black"}
//           textAnchor={"middle"}
//           alignmentBaseline={"middle"}
//           fontSize={24}
//         >
//           {data.amount}
//         </SvgText>
//       </G>
//     );
//   });

// const BudgetPieChart: React.FC = () => (
//   <View style={styles.container}>
//     <PieChart
//       style={{ height: 200 }}
//       data={data}
//       outerRadius={"70%"}
//       innerRadius={10}
//       labelRadius={80}
//     >
//       <Labels />
//     </PieChart>
//     <Text style={styles.centerText}>Ngân Sách{"\n"}1.800,000</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//   },
//   centerText: {
//     position: "absolute",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

// export default BudgetPieChart;
