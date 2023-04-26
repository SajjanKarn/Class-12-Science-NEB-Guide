import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AppText from "../components/AppText";
import SubjectCard from "../components/SubjectCard";
import Underline from "../components/Underline";
import FadeInView from "../components/FadeInView";

export default function SubjectTopicsScreen() {
  const navigation = useNavigation();
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
        <Underline />

        <View style={styles.cardContainer}>
          {topics.map((topic) => (
            <FadeInView key={topic.id} style={styles.fadeStyle}>
              <SubjectCard
                key={topic.id}
                title={topic.title}
                subHeading={`Chapter ${topic.id}`}
                onPress={() => navigation.navigate("TopicScreen")}
              />
            </FadeInView>
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
    paddingBottom: 30,
  },
  contentTitle: {
    fontSize: 25,
    marginBottom: 2,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  fadeStyle: {
    width: "100%",
  },
});
