import { useContext, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
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
  const { isDarkMode } = useContext(ThemeContext);
  const { data, loading } = useQuery(QUERY_COLLECTION);
  const [adNotFailed, setAdNotFailed] = useState(true);
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
                  : colors.light.white,
              },
            ]}
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
