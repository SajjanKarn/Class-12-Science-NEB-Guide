import { ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import AppText from "../components/AppText";

export default function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
      <AppText>Privacy Policy</AppText>
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
