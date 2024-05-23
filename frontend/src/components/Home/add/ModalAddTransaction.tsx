import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { CheckBox, Overlay } from "react-native-elements";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CurrencyInput from "react-native-currency-input";
import { MaterialIcons } from "@expo/vector-icons";
import ColorSystem from "../../../color/ColorSystem";
function formatDate(inputDate) {
  // dd/mm/yyyy -> yyyy/mm/dd
  var parts = inputDate.split("/");
  var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
  return formattedDate;
}
const ModalAddTransaction = (props: any) => {
  const [money, setMoney] = useState(0);
  const { isModalVisible, setIsModalVisible } = props;
  const [selected, setSelected] = useState("");
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const selectedStartDate = getFormatedDate(
    today.setDate(today.getDate() - 10),
    "YYYY/MM/DD"
  );
  const [dateStart, setDateStart] = useState(String(formatDate(startDate)));
  const [dateEnd, setDateEnd] = useState("");
  const [type, setType] = useState("expense");
  const [openSelectDate, setOpenSelectDate] = useState(false);
  const [openSelectEndDate, setOpenSelectEndDate] = useState(false);

  const handleChangeDateStart = (date: any) => {
    date = formatDate(date);
    console.log(date);
    console.log(formatDate(date));

    setDateStart(date);
  };
  const handleChangeDateEnd = (date: any) => {
    date = formatDate(date);
    console.log(date);

    setDateEnd(date);
  };
  const handlePressSelectDate = () => {
    setOpenSelectDate(!openSelectDate);
  };
  const onSubmit = () => {
    setIsModalVisible(false);
  };
  const handlePressSelectEndDate = () => {
    setOpenSelectEndDate(!openSelectEndDate);
  };

  const dataBudgetType = [
    { key: "1", value: "Loại ngân sách", disabled: true },
    { key: "2", value: "Đi lại" },
    { key: "3", value: "Ăn uống" },
    { key: "4", value: "Quần áo" },
    { key: "5", value: "Mua sắm" },
    { key: "6", value: "Sức khỏe" },
    { key: "7", value: "Hóa đơn" },
    { key: "8", value: "Làm đẹp" },
    { key: "9", value: "Giải trí" },
  ];
  const dataIncomeType = [
    { key: "0", value: "Chọn phân loại khoản thu", disabled: true },
    { key: "1", value: "Tiền lương" },
    { key: "2", value: "Tiền thưởng" },
    { key: "3", value: "Tiền đầu tư" },
    { key: "4", value: "Quà tặng" },
    { key: "5", value: "Học bổng" },
  ];
  const dataAccountType = [
    { key: "1", value: "Loại tài khoản", disabled: true },
    { key: "2", value: "Ví điện tử MOMO" },
    { key: "3", value: "Thẻ ngân hàng" },
    { key: "4", value: "Thẻ tín dụng" },
  ];

  return (
    <View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
      >
        <View
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: "hidden",
            height: "70%",
            marginTop: "auto",
            backgroundColor: "#fff",
            padding: 30,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#0C0C0C",
                  paddingLeft: "25%",
                  fontSize: 20,
                  fontWeight: "400",
                }}
              >
                Thêm giao dịch mới
              </Text>
              <Button
                title="X"
                color={ColorSystem.neutral[400]}
                onPress={() => {
                  setDateStart("");
                  setDateEnd("");
                  setMoney(0);
                  setIsModalVisible(false);
                }}
              />
            </View>

            <View style={styles.form}>
              <View style={styles.group}>
                <View style={styles.group1}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                  >
                    <CheckBox
                      title="Khoản thu"
                      checked={type === "income"}
                      onPress={() => setType("income")}
                    />
                    <CheckBox
                      title="Khoản chi"
                      checked={type === "expense"}
                      onPress={() => setType("expense")}
                    />
                    <CheckBox
                      title="Tiết kiệm"
                      checked={type === "saving"}
                      onPress={() => setType("saving")}
                    />
                  </ScrollView>
                </View>
              </View>
              {type !== "saving" && (
                <View style={styles.group}>
                  <Text style={styles.label}>Tên giao dịch</Text>
                  <MaterialIcons
                    style={{
                      position: "absolute",
                      zIndex: 5,
                      top: "50%",
                      left: "3%",
                    }}
                    name="payment"
                    size={22}
                    color={ColorSystem.neutral[400]}
                  />
                  <TextInput style={styles.input} placeholder="Mô tả" />
                </View>
              )}
              <View style={styles.group}>
                <Text style={styles.label}>
                  Chọn phân loại{" "}
                  {type === "expense"
                    ? "chi"
                    : type === "income"
                    ? "thu"
                    : "tiết kiệm"}
                </Text>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={type === "income" ? dataIncomeType : dataBudgetType}
                  save="value"
                />
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Số tiền</Text>
                <MaterialIcons
                  style={{
                    position: "absolute",
                    zIndex: 5,
                    top: "50%",
                    left: "3%",
                  }}
                  name="attach-money"
                  size={22}
                  color={ColorSystem.neutral[400]}
                />
                <CurrencyInput
                  style={styles.input}
                  value={money}
                  onChangeValue={setMoney}
                  suffix=" VND"
                  delimiter="."
                  separator=","
                  placeholder="0.000 VND"
                  precision={0}
                  minValue={0}
                  // showPositiveSign
                  onChangeText={(formattedValue) => {
                    console.log(
                      parseInt(
                        formattedValue.replace(/\./g, "").replace(" VND", "")
                      )
                    ); // 100.000 VND
                  }}
                />
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Ngày giao dịch</Text>
                <MaterialIcons
                  style={{
                    position: "absolute",
                    zIndex: 5,
                    top: "50%",
                    left: "90%",
                  }}
                  name="calendar-month"
                  size={22}
                  color={ColorSystem.neutral[400]}
                />

                <TouchableOpacity onPress={handlePressSelectDate}>
                  <View style={[styles.input1]}>
                    <Text>{dateStart}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  Thêm giao dịch
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <Overlay
          isVisible={openSelectDate}
          onBackdropPress={handlePressSelectDate}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalDateView}>
              <DatePicker
                mode="calendar"
                selected={dateStart}
                onDateChange={handleChangeDateStart}
                minimumDate={selectedStartDate}
              />
              <TouchableOpacity onPress={handlePressSelectDate}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
        <Overlay
          isVisible={openSelectEndDate}
          onBackdropPress={handlePressSelectEndDate}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalDateView}>
              <DatePicker
                mode="calendar"
                selected={dateEnd}
                onDateChange={handleChangeDateEnd}
                minimumDate={formatDate(dateStart)}
              />
              <TouchableOpacity onPress={handlePressSelectEndDate}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { flexDirection: "column", justifyContent: "space-between" },
  group: { marginTop: 15 },
  input: {
    paddingLeft: 35,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "#fff",
  },
  input1: {
    paddingLeft: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "#fff",
  },
  label: { fontSize: 16, paddingBottom: 5 },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "21%",
  },
  modalDateView: {
    // margin: 10,
    backgroundColor: "white",
    borderRadius: 20,

    width: "180%",
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  group1: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    marginTop: 30,
    backgroundColor: ColorSystem.primary[700],
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
});

export default ModalAddTransaction;
