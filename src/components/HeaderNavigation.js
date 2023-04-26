import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../config/colors";

export default function HeaderNavigation() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back}>
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: height(1.5),
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    backgroundColor: colors.background,
    paddingHorizontal: width(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: {
    width: totalSize(5),
    height: totalSize(5),
    borderRadius: totalSize(5),
    backgroundColor: colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
  },
});
