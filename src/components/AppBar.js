import { StyleSheet, View } from "react-native";
import AppText from "./AppText";

export default function AppBar({ title = "Home" }) {
  return (
    <View style={styles.appBarContainer}>
      <AppText variant="Bold" style={styles.appBarTitle}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: "#fff",
    height: 100,
    paddingTop: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
    elevation: 3,
  },
  appBarTitle: {
    fontSize: 20,
    textAlign: "left",
  },
});
