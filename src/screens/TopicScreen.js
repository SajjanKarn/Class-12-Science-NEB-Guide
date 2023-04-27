import { ScrollView, StyleSheet, StatusBar, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useNavigation, useRoute } from "@react-navigation/native";

import AppText from "../components/AppText";
import Underline from "../components/Underline";

import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import contentfulToReactnative from "../utils/richtext";

export default function TopicScreen({ title = "Rotational Dynamics" }) {
  const params = useRoute().params;
  const navigation = useNavigation();

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
  const { data, loading, refetch } = useQuery(QUERY_COLLECTION, {
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
              {title}
            </AppText>

            <Underline width={0.7 * 12 * title.length} />

            <View style={{ marginTop: height(2) }}>
              {documentToReactComponents(
                data?.content?.content?.json,
                contentfulToReactnative
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
});
