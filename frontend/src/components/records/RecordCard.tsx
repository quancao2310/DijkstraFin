import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import ColorSystem from "../../color/ColorSystem";
interface props {
  title: string;
  amount: number;
  date: string;
  source: string;
}
const RecordCard = (data: props) => {
  return (
    // <TouchableOpacity>
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        {/* <Image source={{ uri: data.iconUri }} style={styles.icon} /> */}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>{data.date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.source}>{data.source}</Text>
        <Text style={styles.amount}>{data.amount}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: 15,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorSystem.secondary[600],
  },
  date: {
    fontSize: 14,
    color: ColorSystem.neutral[400],
  },
  amountContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorSystem.danger[600],
  },
  source: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorSystem.secondary[600],
  },
});
export default RecordCard;
