import React from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import DateFilterButton from "../../components/utils/DateFilterButton";
import MoneySource from "../../components/wallet/MoneySource";
import ColorSystem from "../../color/ColorSystem";
import AddNewSourceButton from "../../components/wallet/AddNewSourceButton";
import NoRecord from "../../components/records/NoRecord";
import RecordCard from "../../components/records/RecordCard";
import AddMoneySrcModal from "../../components/modals/AddMoneySourceModals";
import { useGetAllSourceQuery } from "../../services/moneySources";
import { mapNameToIcon } from "../../utils/mapIcon";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";

export default function WalletScreen() {
  let { data: moneySources, isLoading, refetch } = useGetAllSourceQuery();

  if (isLoading) {
  }
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <AddMoneySrcModal />
      <ScrollView nestedScrollEnabled={true}>
        <DateFilterButton />
        <View style={styles.innerScroll}>
          <ScrollView nestedScrollEnabled={true}>
            {isLoading && <Text>Loading...</Text>}
            {moneySources &&
              moneySources.map((item) => (
                <MoneySource
                  key={item._id}
                  name={item.name}
                  balance={item.balance}
                  used={0}
                  icon={mapNameToIcon(item.name)}
                />
              ))}
          </ScrollView>
        </View>
        <AddNewSourceButton />
        <NoRecord />
        <RecordCard
          source="tiền mặt"
          title="mua quà"
          amount={10000}
          date="14/2/2024"
        />
        <RecordCard
          source="tiền mặt"
          title="mua quà"
          amount={10000}
          date="14/2/2024"
        />
        <RecordCard
          source="tiền mặt"
          title="mua quà"
          amount={10000}
          date="14/2/2024"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerScroll: {
    height: 0.4 * Dimensions.get("window").height,
    borderBottomWidth: 1,
    borderColor: ColorSystem.primary[600],
  },
});
