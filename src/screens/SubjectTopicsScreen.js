import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import AppText from "../components/AppText";
import SubjectCard from "../components/SubjectCard";
import Underline from "../components/Underline";
import FadeInView from "../components/FadeInView";
import Loader from "../components/Loader";

import { gql, useQuery } from "@apollo/client";

export default function SubjectTopicsScreen() {
  const params = useRoute().params;
  const navigation = useNavigation();

  const QUERY_COLLECTION = gql`
  {
    subjects(id: "${params.subjectId}") {
      topicsCollection {
        items {
          chapterTitle
          chaptperNumber

          sys {
            id
          }
        }
      }
    }
  }
`;
  const { data, loading } = useQuery(QUERY_COLLECTION);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <AppText variant="Bold" style={styles.contentTitle}>
              Topics
            </AppText>
            <Underline />

            <View style={styles.cardContainer}>
              {data?.subjects?.topicsCollection?.items &&
                data?.subjects?.topicsCollection?.items.map((topic) => (
                  <FadeInView key={topic.sys.id} style={styles.fadeStyle}>
                    <SubjectCard
                      key={topic.sys.id}
                      title={topic.chapterTitle}
                      subHeading={`Chapter ${topic.chaptperNumber}`}
                      onPress={() => navigation.navigate("TopicScreen")}
                    />
                  </FadeInView>
                ))}
              {data?.subjects?.topicsCollection?.items.length === 0 && (
                <AppText variant="Bold" style={styles.contentTitle}>
                  No topics found!
                </AppText>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </>
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
