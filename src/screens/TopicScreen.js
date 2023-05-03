import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useRoute } from "@react-navigation/native";
import Lottie from "lottie-react-native";

import AppText from "../components/AppText";
import Underline from "../components/Underline";

import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import contentfulToReactnative from "../utils/richtext";

import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import colors from "../config/colors";
import ThemeContext from "../context/ThemeContext";

const adUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  adUnitId,
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["fashion", "clothing"],
  }
);

export default function TopicScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const params = useRoute().params;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        rewardedInterstitial.show();
      }
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const QUERY_COLLECTION = gql`
  {
    content(id: "${params.topicId}") {
      contentTitle
      contentSlug
      content {
        json
      }
    }
  }
`;
  const { data, loading } = useQuery(QUERY_COLLECTION, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
          <AppText variant="Bold" style={styles.topicTitle}>
            {params?.title}
          </AppText>

          <Underline width={0.7 * 12 * params?.title?.length} />

          <View style={{ marginTop: height(2) }}>
            {documentToReactComponents(
              data?.content?.content?.json,
              contentfulToReactnative
            )}
            {!data?.content?.content?.json && (
              <>
                <AppText variant="SemiBold" style={styles.noContent}>
                  Content not available yet!
                </AppText>

                <Lottie
                  style={styles.animation}
                  source={require("../../assets/animations/notfound.json")}
                  autoPlay
                  loop
                />
              </>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    paddingVertical: height(2),
    paddingHorizontal: width(5),
  },
  topicTitle: {
    fontSize: totalSize(2.3),
    marginTop: height(0.5),
    marginBottom: height(0.2),
  },
  noContent: {
    fontSize: totalSize(2.3),
    marginTop: height(0.5),
    marginBottom: height(0.2),
  },
  animation: {
    width: width(80),
    height: height(30),
    marginTop: height(2),
    alignSelf: "center",
  },
});
