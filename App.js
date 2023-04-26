import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";

import AppText from "./src/components/AppText";
import AppBar from "./src/components/AppBar";
import SubjectCard from "./src/components/SubjectCard";

import colors from "./src/config/colors";

export default function App() {
  const [topics, setTopics] = useState([
    { id: 1, title: "Introduction to Database" },
    { id: 2, title: "Database Design" },
    { id: 3, title: "Database Implementation" },
    { id: 4, title: "Database Management" },
    { id: 5, title: "Database Administration" },
    { id: 6, title: "Database Security" },
  ]);
  const [fontsLoaded] = useFonts({
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppBar />

      <View style={styles.contentContainer}>
        <AppText variant="Bold" style={styles.contentTitle}>
          Topics
        </AppText>
        <View style={styles.underline} />

        <View style={styles.cardContainer}>
          {topics.map((topic) => (
            <SubjectCard key={topic.id} title={topic.title} />
          ))}
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  underline: {
    width: 80,
    height: 5,
    backgroundColor: colors.underLine,
    marginBottom: 20,
    borderRadius: 5,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
