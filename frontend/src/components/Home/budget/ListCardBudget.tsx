import React from "react";
import { FlatList, View } from "react-native";
import CardBudget from "./CardBudget";
import IconBudgetSystem from "../../../icon/IconBugetSystem";

interface props {
  budgets: any;
}
// budget.name: String, budget.balance: Number
const ListCardBudget = (data: props) => {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data.budgets}
        renderItem={({ item, index }) => (
          <>
            <View style={{ width: 90 }}>
              <CardBudget
                icon={IconBudgetSystem[String(item.name)]}
                balance={item?.hasOwnProperty("balance") ? item.balance : 0}
              />
            </View>
          </>
        )}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      ></FlatList>
    </View>
  );
};

export default ListCardBudget;
