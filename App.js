import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";

import AppText from "./src/components/AppText";
import AppBar from "./src/components/AppBar";
import SubjectCard from "./src/components/SubjectCard";
import Underline from "./src/components/Underline";

export default function App() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      title: "Physics",
      imageUrl:
        "https://www.vedantu.com/seo/content-images/bc692335-2c03-4559-9cf0-dff766298eef.jpg",
      totalChapter: 10,
    },
    {
      id: 2,
      title: "Chemistry",
      imageUrl:
        "https://council.science/wp-content/uploads/2017/04/IUPAC-feature-image.jpg",
      totalChapter: 15,
    },
    {
      id: 3,
      title: "Mathematics",
      imageUrl:
        "https://www.stoodnt.com/blog/wp-content/uploads/2021/10/branches_of_mathematics.jpg",
      totalChapter: 7,
    },
    {
      id: 4,
      title: "Biology",
      imageUrl:
        "https://images.shiksha.com/mediadata/images/articles/1538985491phpKctLgx.jpeg",
      totalChapter: 12,
    },
    {
      id: 5,
      title: "Computer Science",
      imageUrl:
        "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      totalChapter: 8,
    },
    {
      id: 6,
      title: "English",
      imageUrl:
        "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      totalChapter: 10,
    },
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
          Subjects
        </AppText>
        <Underline />

        <View style={styles.cardContainer}>
          {subjects.map((topic) => (
            <SubjectCard
              key={topic.id}
              title={topic.title}
              imageURL={topic.imageUrl}
              subHeading={`${topic.totalChapter} Chapters`}
            />
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
    fontSize: 25,
    marginBottom: 2,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
