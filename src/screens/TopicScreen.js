import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useNavigation, useRoute } from "@react-navigation/native";
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

import Pdf from "react-native-pdf";
import { AntDesign } from "@expo/vector-icons";

const adUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : "ca-app-pub-7778363953547866/6441631448";

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  adUnitId,
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["fashion", "clothing"],
  }
);

export default function TopicScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  const params = useRoute().params;
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);

  // set header title
  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.title,
    });
  }, []);

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
      contentPdf
      content {
        json
      }

      importantQuestions {
        pdfUrl
        content {
          json
        }
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
      ) : data?.content?.contentPdf ? (
        <View style={styles.pdfContainer}>
          <Pdf
            source={{
              uri: data?.content?.contentPdf,
              cache: true,
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              setTotalPages(numberOfPages);
              setPercentLoaded(100);
            }}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onLoadProgress={(percent) => {
              setPercentLoaded(Math.floor(percent * 100));
            }}
            style={styles.pdf}
            trustAllCerts={false}
            renderActivityIndicator={() => <Loader />}
            enablePaging={scrollMode ? false : true}
            horizontal={scrollMode ? false : true}
            maxScale={5.0}
          />
          {percentLoaded !== 100 && (
            <AppText
              variant="Bold"
              style={{
                fontSize: totalSize(2.3),
                marginTop: height(0.5),
                marginBottom: height(0.2),
                alignSelf: "center",
                color: isDarkMode
                  ? colors.dark.underLine
                  : colors.light.textColor,
              }}
            >
              Loading {percentLoaded}%
            </AppText>
          )}

          {data?.content?.importantQuestions?.pdfUrl ||
          data?.content?.importantQuestions?.content ? (
            <View style={styles.importantQuestionsContainer}>
              <TouchableOpacity
                style={styles.importantQuestionsButton}
                activeOpacity={0.7}
              >
                <AppText
                  variant="Medium"
                  style={styles.importantQuestionsText}
                  onPress={() =>
                    navigation.navigate("ImportantQuestions", {
                      importantQuestions: data?.content?.importantQuestions,
                    })
                  }
                >
                  Important Questions
                </AppText>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.scrollButtonContainer}>
            <TouchableOpacity
              style={[
                styles.scrollButton,
                {
                  backgroundColor: isDarkMode
                    ? colors.dark.background
                    : colors.light.white,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => setScrollMode(!scrollMode)}
            >
              <AntDesign
                name={scrollMode ? "swap" : "bars"}
                size={totalSize(2.5)}
                color={
                  isDarkMode ? colors.dark.textColor : colors.light.textColor
                }
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.pagination,
              {
                backgroundColor: isDarkMode
                  ? colors.dark.background
                  : colors.light.white,
              },
            ]}
          >
            <AppText
              variant="Bold"
              style={{
                fontSize: totalSize(1.8),
                color: isDarkMode
                  ? colors.dark.textColor
                  : colors.light.textColor,
              }}
            >
              {currentPage} / {totalPages}
            </AppText>
          </View>
        </View>
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

          {data?.content?.importantQuestions?.pdfUrl ||
          data?.content?.importantQuestions?.content ? (
            <TouchableOpacity
              style={styles.importantQuestions}
              onPress={() =>
                navigation.navigate("ImportantQuestions", {
                  importantQuestions: data?.content?.importantQuestions,
                })
              }
            >
              <AppText variant="Medium" style={styles.importantQuestionsText}>
                Important Questions
              </AppText>
            </TouchableOpacity>
          ) : null}

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
  importantQuestions: {
    backgroundColor: colors.dark.underLine,
    paddingVertical: height(1),
    paddingHorizontal: width(2.5),
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: height(1),
    marginBottom: height(2),
  },
  importantQuestionsText: {
    fontSize: totalSize(1.5),
    color: colors.light.white,
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
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  scrollButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: colors.light.white,
    borderRadius: 5,
    margin: 10,
  },
  scrollButton: {
    paddingVertical: height(1.5),
    paddingHorizontal: width(2.5),
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  pagination: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.light.white,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  importantQuestionsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 5,
    overflow: "hidden",
  },
  importantQuestionsButton: {
    backgroundColor: colors.dark.underLine,
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  importantQuestionsText: {
    fontSize: totalSize(1.5),
    color: colors.light.white,
  },
});
