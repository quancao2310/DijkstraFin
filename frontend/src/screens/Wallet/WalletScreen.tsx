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
import RecordCard from "../../components/records/RecordCard";
import AddMoneySrcModal from "../../components/modals/AddMoneySourceModals";
import { useGetAllSourceQuery } from "../../services/moneySources";
import { mapNameToIcon } from "../../utils/mapIcon";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";
import { WaitingIndicator } from "../../components/utils/WaitingIndicator";
import { useGetRecordsQuery } from "../../services/records";
import TransactionCard from "../../components/Home/add/transaction/TransactionCard";

export default function WalletScreen() {
  let { data: moneySources, isLoading } = useGetAllSourceQuery();
  let { data: records, isLoading: isLoadingRecords } = useGetRecordsQuery();
  let recordsData = [];
  if (!isLoadingRecords) {
    recordsData = records.map((item) => {
      return {
        _id: item._id,
        category:
          typeof item.categoryId === "string" ? "" : item.categoryId.name,
        description: item.description,
        date: item.date,
        type: item.type,
        amount: item.amount,
        _v: 0,
      };
    });
  }
  console.log(recordsData);
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
        {(isLoadingRecords || records.length == 0) && <NoRecord></NoRecord>}
        {/* {!isLoadingRecords &&
          records.length > 0 &&
          recordsData.map((item, index) => {
            return <TransactionCard record={item} key={index} />;
          })} */}
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
