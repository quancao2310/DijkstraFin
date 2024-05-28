import React from "react";
import { FlatList, View } from "react-native";
import CardGoal from "./CardGoal";
import IconGoalSystem from "../../../icon/IconGoalSystem";

interface props {
  goals: any;
}

const ListCardGoal = (data: props) => {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data.goals}
        renderItem={({ item, index }) => (
          <>
            <View style={{ width: 90 }}>
              <CardGoal
                icon={IconGoalSystem[item.icon]}
                name={item.name}
                balance={item.total}
              />
            </View>
          </>
        )}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      ></FlatList>
    </View>
  );
};

export default ListCardGoal;
