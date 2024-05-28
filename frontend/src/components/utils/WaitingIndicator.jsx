import { ActivityIndicator, View } from "react-native";

export const WaitingIndicator = () => {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    </>
  );
};
