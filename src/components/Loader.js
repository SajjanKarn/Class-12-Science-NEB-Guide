import { View, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.light.underLine} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
