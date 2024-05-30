import React from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import DateFilterButton from "../../components/utils/DateFilterButton";
import MoneySource from "../../components/wallet/MoneySource";
import ColorSystem from "../../color/ColorSystem";
import AddNewSourceButton from "../../components/wallet/AddNewSourceButton";
import NoRecord from "../../components/records/NoRecord";
import AddMoneySrcModal from "../../components/modals/AddMoneySourceModals";
import { mapNameToIcon } from "../../utils/mapIcon";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";
import { WaitingIndicator } from "../../components/utils/WaitingIndicator";
import TransactionCard from "../../components/Home/add/transaction/TransactionCard";
import {
  useGetUserMoneySourcesQuery,
  useGetUserRecordsQuery,
} from "../../services/users";

export default function WalletScreen() {
  const userId = useAppSelector((state: RootState) => state.LoginStatus.userId);
  let { data: moneySources, isLoading } = useGetUserMoneySourcesQuery(userId);
  let { data: records, isLoading: isLoadingRecords } =
    useGetUserRecordsQuery(userId);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <AddMoneySrcModal />
      <ScrollView nestedScrollEnabled={true}>
        <DateFilterButton />
        <View style={styles.innerScroll}>
          <ScrollView nestedScrollEnabled={true}>
            {isLoading && (
              <View style={{ height: "100%", padding: "50%" }}>
                <WaitingIndicator></WaitingIndicator>
              </View>
            )}
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {(isLoadingRecords || records.length == 0) && <NoRecord></NoRecord>}
          <View style={{ width: "96%", justifyContent: "center" }}>
            {records !== undefined &&
              records.length > 0 &&
              records
                .filter(
                  (item) => item.type === "income" || item.type === "expense"
                )
                .map((item, index) => {
                  return <TransactionCard record={item} key={index} />;
                })}
          </View>
        </View>
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
