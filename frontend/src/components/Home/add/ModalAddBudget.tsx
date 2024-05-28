import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { CheckBox, Overlay } from "react-native-elements";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import {
  Alert,
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
import { set } from "date-fns";
import { useCreateBudgetMutation } from "../../../services/budgets";
import { useDispatch } from "react-redux";

const getStringToday = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate; // Kết quả sẽ là ngày hôm nay theo định dạng dd/mm/yyyy
};

const getStringEndMonthDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // Tháng bắt đầu từ 0

  // Tạo một đối tượng Date cho ngày đầu tiên của tháng tiếp theo
  const firstDayNextMonth = new Date(year, month + 1, 1);

  // Trừ đi 1 ngày từ ngày đầu tiên của tháng tiếp theo để có ngày cuối cùng của tháng hiện tại
  const lastDayCurrentMonth = new Date(firstDayNextMonth.getTime() - 1);

  const day = String(lastDayCurrentMonth.getDate()).padStart(2, "0");
  const monthFormatted = String(lastDayCurrentMonth.getMonth() + 1).padStart(
    2,
    "0"
  ); // Tháng bắt đầu từ 0
  const yearFormatted = lastDayCurrentMonth.getFullYear();

  const formattedDate = `${day}/${monthFormatted}/${yearFormatted}`;

  return formattedDate; // Kết quả sẽ là ngày cuối cùng của tháng hiện tại theo định dạng dd/mm/yyyy
};

function formatDate(inputDate) {
  // dd/mm/yyyy -> yyyy/mm/dd
  var parts = inputDate.split("/");
  var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
  return formattedDate;
}
const ModalAddBudget = (props: any) => {
  const {
    isModalVisible,
    setIsModalVisible,
    moneySources,
    budgetCategories,
    setRefresh,
  } = props;
  const [money, setMoney] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currentSpent, setCurrentSpent] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [selected, setSelected] = useState("");
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [isSaveMonthly, setIsSaveMonthly] = useState(false);
  const [openSelectDate, setOpenSelectDate] = useState(false);
  const [openSelectEndDate, setOpenSelectEndDate] = useState(false);
  const [createBudget, { isLoading }] = useCreateBudgetMutation();
  const dispatch = useDispatch();

  const handleChangeDateStart = (date: any) => {
    date = formatDate(date);
    setDateStart(date);
  };
  const handleChangeDateEnd = (date: any) => {
    date = formatDate(date);
    setDateEnd(date);
  };
  const handlePressSelectDate = () => {
    setOpenSelectDate(!openSelectDate);
  };
  const onSubmit = async () => {
    let formData = {
      amount: amount,
      currentSpent: currentSpent,
      categoryId: categoryId,
    };

    if (categoryId === "") {
      Alert.alert("Lỗi", "Vui lòng chọn ngân sách");
      return;
    }
    if (amount <= 0) {
      Alert.alert("Lỗi", "Số tiền ngân sách phải lớn hơn 0");
      return;
    }
    if (amount < currentSpent) {
      Alert.alert(
        "Lỗi",
        "Số tiền đã sử dụng không thể lớn hơn số tiền ngân sách"
      );
      return;
    }

    console.log(formData);
    try {
      const response = await createBudget(formData).unwrap();
      console.log("Budget created successfully:", response);
      // Handle successful budget creation here
      // setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to create budget:", error);
      Alert.alert("Lỗi", "Không thể tạo ngân sách");
    }

    setTimeout(() => {
      console.log("Thành công");
    }, 1000);

    setRefresh(true);
    setIsModalVisible(false);
    setCurrentSpent(0);
    setAmount(0);
    setCategoryId("");
  };
  const handlePressSelectEndDate = () => {
    setOpenSelectEndDate(!openSelectEndDate);
  };

  const dataBudgetType = budgetCategories.map((item) => ({
    key: item._id,
    value: item.name,
    disabled: item.budgetId !== null,
  }));

  const dataAccountType = moneySources.map((source: any) => ({
    key: source._id,
    value: source.name,
  }));
  return (
    <View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => {
          console.log(111);

          setAmount(0);
          setCurrentSpent(0);
          setCategoryId("");
          setIsModalVisible(false);
        }}
        animationType="slide"
      >
        <View
          style={{
            borderColor: "#000",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: "hidden",
            height: "80%",
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
                Thêm mới ngân sách
              </Text>
              <Button
                title="X"
                color={ColorSystem.neutral[400]}
                onPress={() => {
                  setAmount(0);
                  setCurrentSpent(0);
                  setCategoryId("");
                  setIsModalVisible(false);
                }}
              />
            </View>

            <View style={styles.form}>
              <View style={styles.group}>
                <Text style={styles.label}>Chọn ngân sách</Text>

                <SelectList
                  setSelected={(val) => {
                    setCategoryId(
                      dataBudgetType.find((item) => item.value === val).key
                    );
                  }}
                  data={dataBudgetType}
                  save="value"
                />
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Mức ngân sách thiết lập</Text>
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
                  value={amount}
                  onChangeValue={setAmount}
                  suffix=" VND"
                  delimiter="."
                  separator=","
                  placeholder="0.000 VND"
                  precision={0}
                  minValue={0}
                  onChangeText={(formattedValue) => {
                    setAmount(
                      parseInt(
                        formattedValue.replace(/\./g, "").replace(" VND", "")
                      )
                    );
                  }}
                />
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Đã sử dụng {"(nếu có)"}</Text>
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
                  value={currentSpent}
                  onChangeValue={setCurrentSpent}
                  suffix=" VND"
                  delimiter="."
                  separator=","
                  placeholder="0.000 VND"
                  precision={0}
                  minValue={0}
                  // showPositiveSign
                  onChangeText={(formattedValue) => {
                    setCurrentSpent(
                      parseInt(
                        formattedValue.replace(/\./g, "").replace(" VND", "")
                      )
                    );
                  }}
                />
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Ngày bắt đầu</Text>
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

                <TouchableOpacity
                  disabled={true}
                  onPress={handlePressSelectDate}
                >
                  <View
                    style={[
                      styles.input1,
                      !dateStart
                        ? { backgroundColor: "rgba(0,0,0,0.05)" }
                        : { backgroundColor: "#fff" },
                    ]}
                  >
                    <Text>{getStringToday()}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Ngày kết thúc</Text>
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
                <TouchableOpacity
                  onPress={handlePressSelectEndDate}
                  disabled={true}
                >
                  <View
                    style={[
                      styles.input1,
                      !dateStart
                        ? { backgroundColor: "rgba(0,0,0,0.05)" }
                        : { backgroundColor: "#fff" },
                    ]}
                  >
                    <Text>{getStringEndMonthDate()}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.group1}>
                <Text style={styles.label}>Lặp lại hàng tháng</Text>

                <Switch
                  value={isSaveMonthly}
                  onValueChange={() => setIsSaveMonthly(!isSaveMonthly)}
                />
              </View>
              <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  Thêm ngân sách
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
                minimumDate={startDate}
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

export default ModalAddBudget;
