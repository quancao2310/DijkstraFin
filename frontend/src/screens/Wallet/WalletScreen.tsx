import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
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
import { useDeleteMoneySourceMutation } from "../../services/moneySources";

export default function WalletScreen() {
  const userId = useAppSelector((state: RootState) => state.LoginStatus.userId);
  const { data: moneySources, isLoading } = useGetUserMoneySourcesQuery(userId);
  const { data: records, isLoading: isLoadingRecords } =
    useGetUserRecordsQuery(userId);
  const [deleteMoneySource] = useDeleteMoneySourceMutation();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedSourceName, setSelectedSourceName] = useState<string | null>(
    null
  );
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleMorePress = (id: string, name: string) => {
    setSelectedSource(id);
    setSelectedSourceName(name);
    setIsOptionsVisible(true);
  };

  const handleDelete = async () => {
    if (selectedSource) {
      await deleteMoneySource(selectedSource);
    }
  };

  const handleCancel = () => {
    setIsOptionsVisible(false);
    setSelectedSource(null);
  };

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
                <WaitingIndicator />
              </View>
            )}
            {moneySources &&
              moneySources.map((item) => (
                <MoneySource
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  balance={item.balance}
                  used={0}
                  icon={mapNameToIcon(item.name)}
                  onMorePress={() => handleMorePress(item._id, item.name)}
                />
              ))}
          </ScrollView>
        </View>
        <AddNewSourceButton />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {(isLoadingRecords || records.length == 0) && <NoRecord />}
          <View style={{ width: "96%", justifyContent: "center" }}>
            {records !== undefined &&
              records.length > 0 &&
              records
                .filter(
                  (item) => item.type === "income" || item.type === "expense"
                )
                .map((item, index) => (
                  <TransactionCard record={item} key={index} />
                ))}
          </View>
        </View>
      </ScrollView>
      {isOptionsVisible && (
        <Modal
          transparent={true}
          visible={isOptionsVisible}
          animationType="fade"
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={handleCancel}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => setIsConfirmVisible(true)}
              >
                <Text
                  style={{ color: ColorSystem.danger[600], fontWeight: "700" }}
                >
                  Xóa {selectedSourceName}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleCancel}
              >
                <Text style={{ fontWeight: "700" }}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
      {isConfirmVisible && (
        <Modal
          transparent={true}
          visible={isConfirmVisible}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentAlert}>
              <Text
                style={{
                  color: ColorSystem.warning[700],
                  fontWeight: "bold",
                  fontSize: 16,
                  paddingBottom: 10,
                }}
              >
                Bạn có chắc là sẽ xóa {selectedSourceName} ra khỏi danh sách
                nguồn tiền?
              </Text>
              <Text
                style={{
                  color: ColorSystem.danger[900],
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                Lưu ý hành động này không thể khôi phục, vui lòng xác nhận!
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleDelete}
                >
                  <Text
                    style={{
                      color: ColorSystem.danger[400],
                      fontWeight: "500",
                    }}
                  >
                    Xóa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => setIsConfirmVisible(false)}
                >
                  <Text style={{ fontWeight: "500" }}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerScroll: {
    height: 0.4 * Dimensions.get("window").height,
    borderBottomWidth: 1,
    borderColor: ColorSystem.primary[600],
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 200,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalContentAlert: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  modalOption: {
    padding: "2%",
    marginVertical: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
