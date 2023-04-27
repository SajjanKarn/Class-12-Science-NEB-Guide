import { StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import { Modal } from "react-native";

import { width, height, totalSize } from "react-native-dimension";

export default function AboutUs() {
  return (
    <View style={styles.container}>
      <AppText variant="Bold" style={styles.contentTitle}>
        About Us
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
