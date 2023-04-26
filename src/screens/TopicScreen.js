import { ScrollView, StyleSheet, StatusBar, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import AppText from "../components/AppText";
import Underline from "../components/Underline";
import HeaderNavigation from "../components/HeaderNavigation";

export default function TopicScreen({ title = "Rotational Dynamics" }) {
  return (
    <View style={styles.container}>
      {/* <HeaderNavigation /> */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="Bold" style={styles.topicTitle}>
          {title}
        </AppText>

        <Underline width={0.7 * 12 * title.length} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width(5),
  },
  scrollView: {
    flex: 1,
    marginTop: height(2),
  },
  topicTitle: {
    fontSize: totalSize(2.3),
    marginTop: height(0.5),
    marginBottom: height(0.2),
  },
});
