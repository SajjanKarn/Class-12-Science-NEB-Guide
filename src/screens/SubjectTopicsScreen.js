import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

import AppText from "../components/AppText";
import SubjectCard from "../components/SubjectCard";
import Underline from "../components/Underline";
import FadeInView from "../components/FadeInView";
import Loader from "../components/Loader";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import colors from "../config/colors";
import ThemeContext from "../context/ThemeContext";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

export default function SubjectTopicsScreen() {
  const params = useRoute().params;
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [adNotFailed, setAdNotFailed] = useState(true);

  const QUERY_COLLECTION = gql`
  {
    subjects(id: "${params.subjectId}") {
      topicsCollection {
        items {
          chapterTitle
          chapterNumber
          chapterThumbnail {
            url
          }
          chapterContent {
            sys {
              id
            }
          }

          sys {
            id
          }
        }
      }
    }
  }
`;
  const { data, loading, refetch } = useQuery(QUERY_COLLECTION, {
    fetchPolicy: "cache-and-network",
  });

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {adNotFailed && (
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdFailedToLoad={() => setAdNotFailed(false)}
            />
          )}

          <ScrollView
            style={[
              styles.container,
              {
                backgroundColor: isDarkMode
                  ? colors.dark.background
                  : colors.light.background,
              },
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
                        // imageURL={topic.chapterThumbnail.url}
                        subHeading={`Chapter ${topic.chapterNumber}`} // will fix this later
                        onPress={() =>
                          navigation.navigate("TopicScreen", {
                            topicId: topic?.chapterContent?.sys?.id,
                            title: topic.chapterTitle,
                          })
                        }
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
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
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
