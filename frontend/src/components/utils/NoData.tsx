import { Text, View } from "react-native";

export const NoData = () => {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text>Không có dữ liệu</Text>
      </View>
    </>
  );
};
