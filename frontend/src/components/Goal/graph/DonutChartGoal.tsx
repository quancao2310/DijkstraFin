import { StyleSheet, View } from "react-native";
import React from "react";
import {
  SharedValue,
  useDerivedValue,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import { Canvas, Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import DonutPathGoal from "./DonutPathGoal";

type Props = {
  n: number;
  gap: number;
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  decimals: SharedValue<number[]>;
  colors: string[];
  totalValue: SharedValue<number>;
  font: SkFont;
  smallFont: SkFont;
};
const formatNumber = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

const DonutChartGoal = ({
  n,
  gap,
  decimals,
  colors,
  totalValue,
  strokeWidth,
  outerStrokeWidth,
  radius,
  font,
  smallFont,
}: Props) => {
  const array = Array.from({ length: n });
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () =>
      Math.round(totalValue.value) >= 1000000000
        ? `${(Math.round(totalValue.value) / 1000000000).toFixed(2)} tỷ`
        : Math.round(totalValue.value) >= 10000000
        ? `${(Math.round(totalValue.value) / 10000000).toFixed(2)} triệu`
        : `${Math.round(totalValue.value)}₫`,
    []
  );

  const fontSize = font.measureText("$00");
  const smallFontSize = smallFont.measureText("Total Spent");

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="#f4f7fc"
          style="stroke"
          strokeJoin="round"
          strokeWidth={outerStrokeWidth}
          strokeCap="round"
          start={0}
          end={1}
        />
        {array.map((_, index) => {
          return (
            <DonutPathGoal
              key={index}
              radius={radius}
              strokeWidth={strokeWidth}
              outerStrokeWidth={outerStrokeWidth}
              color={colors[index]}
              decimals={decimals}
              index={index}
              gap={gap}
            />
          );
        })}
        <Text
          x={radius - smallFontSize.width / 2}
          y={radius + smallFontSize.height / 2 - fontSize.height / 1.2}
          text={" Kế hoạch "}
          font={smallFont}
          color="black"
        />
        <Text
          x={textX}
          y={radius + fontSize.height / 2}
          text={targetText}
          font={font}
          color="black"
        />
      </Canvas>
    </View>
  );
};

export default DonutChartGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
