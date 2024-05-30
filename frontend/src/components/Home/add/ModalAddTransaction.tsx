import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  useGetUserCategoriesQuery,
  useGetUserGoalsQuery,
  useGetUserMoneySourcesQuery,
} from "../../../services/users";
import { set } from "date-fns";
import { useCreateRecordMutation } from "../../../services/records";
import { RecordType } from "../../../types";
function formatDate(inputDate) {
  // dd/mm/yyyy -> yyyy/mm/dd
  var parts = inputDate.split("/");
  var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
  return formattedDate;
}
function getLastDayOfMonth(date) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return getFormattedDate(lastDay, "YYYY/MM/DD");
}

function getFormattedDate(date, format) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  if (format === "YYYY/MM/DD") {
    return `${year}/${month}/${day}`;
  }
  // You can add more formats if needed
  return date.toString();
}
function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}
const ModalAddTransaction = (props: any) => {
  const { isModalVisible, setIsModalVisible } = props;
  const userId = useSelector((state: RootState) => state.LoginStatus.userId);
  let { data: moneySources, isLoading: isLoadingMoneySources } =
    useGetUserMoneySourcesQuery(userId);
  let { data: categories, isLoading: isLoadingCategpries } =
    useGetUserCategoriesQuery(userId);
  let { data: goals, isLoading: isLoadingGoals } = useGetUserGoalsQuery(userId);

  const [createRecord, { isLoading }] = useCreateRecordMutation();
  const [money, setMoney] = useState(0);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSaving, setSelectedSaving] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );
  const [dateStart, setDateStart] = useState(String(formatDate(startDate)));
  const [dateEnd, setDateEnd] = useState("");
  const [type, setType] = useState(RecordType.EXPENSE);
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
  const onSubmit = async () => {
    const savingCategoryID = categories.find(
      (item) => item.type === RecordType.SAVING
    )._id;
    const formData = {
      description: name,
      type: type,
      amount: money,
      categoryId:
        type === RecordType.SAVING ? savingCategoryID : selectedCategory,
      moneySourceId: selectedAccount,
      date: dateStart.split("/").reverse().join("-"),
      goalId: type === RecordType.SAVING ? selectedSaving : null,
    };

    if (formData.description === "") {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập mô tả giao dịch");
      return;
    }

    if (
      formData.type === RecordType.EXPENSE ||
      formData.type === RecordType.INCOME
    ) {
      if (formData.categoryId === "") {
        Alert.alert("Thiếu thông tin", "Vui lòng chọn phân loại giao dịch");
        return;
      }
    } else {
      if (formData.goalId === "") {
        Alert.alert("Thiếu thông tin", "Vui lòng chọn mục tiết kiệm");
        return;
      }
    }
    if (formData.amount === 0) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập số tiền");
      return;
    }
    if (formData.moneySourceId === "") {
      Alert.alert("Thiếu thông tin", "Vui lòng chọn tài khoản liên kết");
      return;
    }
    console.log(formData);

    try {
      const response = await createRecord(formData).unwrap();
      console.log("Record created successfully:", response);
      setIsModalVisible(false);
    } catch (error) {
      console.log("Failed to create budget:", error);
      Alert.alert("Không thể tạo giao dịch mới", `Lỗi: ${error.data.message}`);
      return;
    }

    setDateStart(String(formatDate(startDate)));
    setMoney(0);
    setName("");
    setSelectedSaving("");
    setSelectedCategory("");
    setSelectedAccount("");
    setIsModalVisible(false);
  };
  const handlePressSelectEndDate = () => {
    setOpenSelectEndDate(!openSelectEndDate);
  };

  const [dataAccountType, setDataAccountType] = useState([]);
  const [dataIncomeType, setDataIncomeType] = useState([]);
  const [dataBudgetType, setDataBudgetType] = useState([]);
  const [dataSavingType, setDataSavingType] = useState([]);
  useEffect(() => {
    if (moneySources && moneySources.length > 0) {
      const data = moneySources.map((item) => {
        return {
          key: item._id,
          value: item.name + " - Số dư: " + formatCurrency(item.balance),
        };
      });
      setDataAccountType(data);
    }
    if (goals && goals.length > 0) {
      const data = goals.map((item) => {
        return {
          key: item._id,
          value:
            item.name +
            " - Còn lại: " +
            formatCurrency(item.total - item.balance),
        };
      });
      setDataSavingType(data);
    }
    if (categories && categories.length > 0) {
      const data = categories
        .filter((item: any) => item.type === RecordType.INCOME) // Lọc các phần tử có type là 'income'
        .map((item: any) => {
          return {
            key: item._id,
            value: item.name,
          };
        });
      setDataIncomeType(data);

      const dataBudget = categories
        .filter(
          (item: any) =>
            item.type === RecordType.EXPENSE && item.budgetId !== null
        ) // Lọc các phần tử có type là 'income'
        .map((item: any) => {
          return {
            key: item._id,
            value: item.name,
          };
        });
      setDataBudgetType(dataBudget);
    }
  }, [categories, moneySources, goals]);
  return (
    <View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => {
          setDateStart(String(formatDate(startDate)));
          setMoney(0);
          setName("");
          setSelectedSaving("");
          setSelectedCategory("");
          setSelectedAccount("");
          setIsModalVisible(false);
        }}
        animationType="slide"
      >
        <View
          style={{
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
                Thêm giao dịch mới
              </Text>
              <Button
                title="X"
                color={ColorSystem.neutral[400]}
                onPress={() => {
                  setDateStart(String(formatDate(startDate)));
                  setMoney(0);
                  setName("");
                  setSelectedSaving("");
                  setSelectedCategory("");
                  setSelectedAccount("");
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
                      checked={type === RecordType.INCOME}
                      onPress={() => {
                        setType(RecordType.INCOME);
                        setDateStart(String(formatDate(startDate)));
                        setMoney(0);
                        setName("");
                        setSelectedSaving("");
                        setSelectedCategory("");
                        setSelectedAccount("");
                      }}
                    />
                    <CheckBox
                      title="Khoản chi"
                      checked={type === RecordType.EXPENSE}
                      onPress={() => {
                        setType(RecordType.EXPENSE);
                        setDateStart(String(formatDate(startDate)));
                        setMoney(0);
                        setName("");
                        setSelectedSaving("");
                        setSelectedCategory("");
                        setSelectedAccount("");
                      }}
                    />
                    <CheckBox
                      title="Tiết kiệm"
                      checked={type === RecordType.SAVING}
                      onPress={() => {
                        setType(RecordType.SAVING);
                        setDateStart(String(formatDate(startDate)));
                        setMoney(0);
                        setName("");
                        setSelectedSaving("");
                        setSelectedCategory("");
                        setSelectedAccount("");
                      }}
                    />
                  </ScrollView>
                </View>
              </View>
              {type !== RecordType.SAVING && (
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
                  <TextInput
                    onChangeText={(val) => {
                      setName(val);
                    }}
                    style={styles.input}
                    placeholder="Mô tả"
                  />
                </View>
              )}
              <View style={styles.group}>
                <Text style={styles.label}>
                  Chọn phân loại{" "}
                  {type === RecordType.EXPENSE
                    ? "chi"
                    : type === RecordType.INCOME
                    ? "thu"
                    : "tiết kiệm"}
                </Text>
                <SelectList
                  setSelected={(val) => {
                    let dataSelectList = [];
                    if (type === RecordType.EXPENSE) {
                      dataSelectList = dataBudgetType;
                      setSelectedCategory(
                        dataSelectList.find((item) => item.value === val).key
                      );
                    } else if (type === RecordType.INCOME) {
                      dataSelectList = dataIncomeType;
                      setSelectedCategory(
                        dataSelectList.find((item) => item.value === val).key
                      );
                    } else {
                      dataSelectList = dataSavingType;
                      setSelectedSaving(
                        dataSelectList.find((item) => item.value === val).key
                      );
                      setName(val.substring(0, val.indexOf(" - Còn lại:")));
                    }
                  }}
                  data={
                    type === RecordType.INCOME
                      ? dataIncomeType
                      : type === RecordType.EXPENSE
                      ? dataBudgetType
                      : dataSavingType
                  }
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
              <View style={styles.group}>
                <Text style={styles.label}>Tài khoản</Text>

                <SelectList
                  setSelected={(val) =>
                    setSelectedAccount(
                      dataAccountType.find((item) => item.value === val).key
                    )
                  }
                  data={dataAccountType}
                  save="value"
                />
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
                disabled={true}
                mode="calendar"
                selected={dateStart}
                onDateChange={handleChangeDateStart}
                minimumDate={startDate}
                maximumDate={getLastDayOfMonth(new Date())}
                placeholder="Chọn ngày"
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
                maximumDate={getToday("YYYY/MM/DD")}
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
