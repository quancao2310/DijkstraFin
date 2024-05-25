import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { CheckBox, Overlay } from "react-native-elements";
import IconPicker from "react-native-icon-picker";
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
import IconGoalSystem from "../../../icon/IconGoalSystem";

function formatDate(inputDate) {
  // dd/mm/yyyy -> yyyy/mm/dd
  var parts = inputDate.split("/");
  var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
  return formattedDate;
}
const today = new Date();
const startDate = getFormatedDate(
  today.setDate(today.getDate() + 1),
  "YYYY/MM/DD"
);
const ModalAddGoal = (props: any) => {
  const { isModalVisible, setIsModalVisible } = props;

  const [name, setName] = useState("");
  const [icon, setIcon] = useState({
    color: ColorSystem.neutral[300],
    family: "MaterialIcons",
    icon: "category",
  });
  const [money, setMoney] = useState(0);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [isSaveMonthly, setIsSaveMonthly] = useState(false);

  const [openSelectDate, setOpenSelectDate] = useState(false);
  const [openSelectEndDate, setOpenSelectEndDate] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selected, setSelected] = useState("");

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
    { key: "1", value: "Chọn kế hoạch", disabled: true },
    { key: "2", value: "Du lịch" },
    { key: "3", value: "Mua nhà" },
    { key: "4", value: "Học tập" },
    { key: "5", value: "Mua sắm" },
    { key: "6", value: "Mua ô tô" },
    { key: "7", value: "Sửa chữa" },
    { key: "8", value: "Nội thất" },
    { key: "9", value: "Đầu tư" },
    { key: "10", value: "Du thuyền" },
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
            height: "90%",
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
                Lập kế hoạch mới
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
                <Text style={styles.label}>Tên kế hoạch</Text>

                <MaterialIcons
                  style={{
                    position: "absolute",
                    zIndex: 5,
                    top: "50%",
                    left: "3%",
                  }}
                  name="savings"
                  size={22}
                  color={ColorSystem.neutral[400]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mô tả"
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Chọn biểu tượng</Text>
                <View
                  style={{
                    paddingLeft: 35,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "gray",
                    backgroundColor: "#fff",
                  }}
                >
                  <IconPicker
                    headerTitle="Chọn biểu tượng cho kế hoạch"
                    showIconPicker={showIconPicker}
                    toggleIconPicker={() => setShowIconPicker(!showIconPicker)}
                    iconDetails={Object.values(IconGoalSystem).map((icon) => ({
                      family: "MaterialIcons",
                      icons: [icon.name],
                      color: icon.color,
                    }))}
                    onSelect={(icon) => {
                      console.log(icon);
                      setIcon(icon);
                      setShowIconPicker(!showIconPicker);
                    }}
                    content={
                      <MaterialIcons
                        name={icon.icon as keyof typeof MaterialIcons.glyphMap}
                        size={32}
                      />
                    }
                  />
                </View>
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

                <TouchableOpacity onPress={handlePressSelectDate}>
                  <View style={[styles.input1]}>
                    <Text>{dateStart ? dateStart : "Chọn ngày"}</Text>
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
                  disabled={dateStart == ""}
                >
                  <View
                    style={[
                      styles.input1,
                      !dateStart
                        ? { backgroundColor: "rgba(0,0,0,0.05)" }
                        : { backgroundColor: "#fff" },
                    ]}
                  >
                    <Text>{dateEnd ? dateEnd : "Chọn ngày"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Tài khoản</Text>

                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={dataAccountType}
                  save="value"
                />
              </View>
              <View style={styles.group1}>
                <Text style={styles.label}>Nhắc tôi?</Text>

                <Switch
                  value={isSaveMonthly}
                  onValueChange={() => setIsSaveMonthly(!isSaveMonthly)}
                />
              </View>
              <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  Thêm kế hoạch
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

export default ModalAddGoal;
