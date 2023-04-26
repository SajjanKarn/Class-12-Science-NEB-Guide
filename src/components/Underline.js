import { StyleSheet, View } from "react-native";

export default function Underline({ width = 80 }) {
  return <View style={[styles.underline, { width }]} />;
}

const styles = StyleSheet.create({
  underline: {
    width: 80,
    height: 5,
    backgroundColor: colors.underLine,
    marginBottom: 20,
    borderRadius: 5,
  },
});
