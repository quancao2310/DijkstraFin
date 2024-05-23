import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
const AllTransaction = ({ navigation, route }) => {
  const [records, setRecord] = useState([]);

  useEffect(() => {
    setRecord(route.params.data);
  });

  return (
    <View>
      <Text>{}</Text>
    </View>
  );
};

export default AllTransaction;
