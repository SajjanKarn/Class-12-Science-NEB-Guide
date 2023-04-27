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

export default function TopicScreen() {
  const params = useRoute().params;

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
        <View style={styles.container}>
          {/* <HeaderNavigation /> */}
          <ScrollView
            style={styles.scrollView}
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
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width(5),
  },
  scrollView: {
    flex: 1,
    marginTop: height(2),
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
