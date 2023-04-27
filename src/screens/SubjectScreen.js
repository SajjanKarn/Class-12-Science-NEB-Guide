import { StyleSheet, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

import AppText from "../components/AppText";
import SubjectCard from "../components/SubjectCard";
import Underline from "../components/Underline";
import FadeInView from "../components/FadeInView";
import Loader from "../components/Loader";

const QUERY_COLLECTION = gql`
  {
    subjectsCollection(order: sys_firstPublishedAt_ASC) {
      items {
        sys {
          id
        }

        title
        totalChapters
        subjectThumbnail {
          url
        }
      }
    }
  }
`;

export default function SubjectScreen() {
  const navigation = useNavigation();
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
              Subjects
            </AppText>
            <Underline />

            <View style={styles.cardContainer}>
              {data?.subjectsCollection?.items &&
                data?.subjectsCollection?.items.map((subject) => (
                  <FadeInView key={subject.sys.id} style={styles.fadeStyle}>
                    <SubjectCard
                      key={subject.sys.id}
                      title={subject.title}
                      imageURL={subject.subjectThumbnail.url}
                      subHeading={`${subject.totalChapters} Chapters`}
                      onPress={() =>
                        navigation.navigate("SubjectTopicsScreen", {
                          subjectId: subject.sys.id,
                        })
                      }
                    />
                  </FadeInView>
                ))}
              {data?.subjectsCollection?.items.length === 0 && (
                <AppText
                  variant="Bold"
                  style={{ textAlign: "center", marginTop: 20 }}
                >
                  No Subjects Found
                </AppText>
              )}
            </View>
          </View>

          <StatusBar style="auto" />
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
