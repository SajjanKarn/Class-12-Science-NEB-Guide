import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

export default function Underline({ width = 80 }) {
  return <View style={[styles.underline, { width }]} />;
}

const styles = StyleSheet.create({
  underline: {
    width: 80,
    height: 5,
    backgroundColor: colors.light.underLine,
    marginBottom: 20,
    borderRadius: 5,
  },
});
