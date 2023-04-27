import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import { Modal } from "react-native";

import { width, height, totalSize } from "react-native-dimension";

export default function AboutUs() {
  return (
    <ScrollView style={styles.container}>
      <AppText variant="Bold" style={styles.contentTitle}>
        About Us
      </AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width(5),
    paddingVertical: height(2),
  },
});
