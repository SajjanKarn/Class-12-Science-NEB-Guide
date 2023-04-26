import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

import AppText from "./src/components/AppText";
import AppBar from "./src/components/AppBar";
import SubjectCard from "./src/components/SubjectCard";

import colors from "./src/config/colors";
import TopicScreen from "./src/screens/TopicScreen";

export default function SujectTopicsScreen() {
  const [topics, setTopics] = useState([
    { id: 1, title: "Introduction to Database" },
    { id: 2, title: "Database Design" },
    { id: 3, title: "Database Implementation" },
    { id: 4, title: "Database Management" },
    { id: 5, title: "Database Administration" },
    { id: 6, title: "Database Security" },
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <AppText variant="Bold" style={styles.contentTitle}>
          Topics
        </AppText>

        <View style={styles.cardContainer}>
          {topics.map((topic) => (
            <SubjectCard
              key={topic.id}
              title={topic.title}
              subHeading={`Chapter ${topic.id}`}
            />
          ))}
        </View>
      </View>
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
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
