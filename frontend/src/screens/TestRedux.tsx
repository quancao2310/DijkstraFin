import React from "react";
import { FlatList, Text } from "react-native";
import { useGetGoalsQuery } from "../services/goals";
import { useGetRecordsQuery } from "../services/records";
import { View } from "react-native";

function TestRedux() {
  const { data: goals } = useGetGoalsQuery();
  const { data: records } = useGetRecordsQuery();
  console.log(goals);
  console.log(records);
  return (
    <View>
      <Text>TestRedux</Text>
      <FlatList
        data={goals}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={item => item._id}
      />
      <FlatList
        data={records}
        renderItem={({ item }) => <Text>{item.description}</Text>}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

export default TestRedux;
