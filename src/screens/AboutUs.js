import { ScrollView, StyleSheet, View, Linking, Image } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { FontAwesome5 } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";

import AppText from "../components/AppText";
import Underline from "../components/Underline";
import colors from "../config/colors";
import Loader from "../components/Loader";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const QUERY_COLLECTION = gql`
  {
    aboutPage(id: "2r68EIEPDDzFQNHRBskGHh") {
      aboutUs
      contributors
    }
  }
`;

export default function AboutUs() {
  const { isDarkMode } = useContext(ThemeContext);

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
          <AppText variant="Bold" style={styles.contentTitle}>
            About Us
          </AppText>
          <Underline />

          <AppText style={styles.ourMessage}>
            {data?.aboutPage?.aboutUs}
          </AppText>

          <AppText variant="Bold" style={styles.contentTitle}>
            Contributors
          </AppText>
          <Underline />

          <View style={styles.contributorsContainer}>
            {data?.aboutPage?.contributors?.map((contributor, index) => (
              <View
                key={index}
                style={[
                  styles.contributorCard,
                  {
                    backgroundColor: isDarkMode
                      ? colors.dark.cardBackground
                      : colors.light.cardBackground,
                  },
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: contributor.image }}
                    style={styles.contributorImage}
                  />
                </View>
                <AppText variant="Bold" style={styles.contributorName}>
                  {contributor.name}
                </AppText>
                <AppText style={styles.contributorRole}>
                  {contributor.role}
                </AppText>

                <View style={styles.contributorSocial}>
                  <View style={styles.socialIcon}>
                    <FontAwesome5
                      name="facebook"
                      size={20}
                      color={
                        isDarkMode
                          ? colors.dark.underLine
                          : colors.light.facebook
                      }
                      onPress={() => Linking.openURL(contributor.facebook)}
                    />
                  </View>
                  <View style={styles.socialIcon}>
                    <FontAwesome5
                      name="instagram"
                      size={20}
                      color={
                        isDarkMode
                          ? colors.dark.underLine
                          : colors.light.instagram
                      }
                      onPress={() => Linking.openURL(contributor.instagram)}
                    />
                  </View>
                </View>
              </View>
            ))}
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
    paddingHorizontal: width(3),
    paddingVertical: height(2),
  },
  contentTitle: {
    fontSize: totalSize(2.3),
    marginTop: height(0.5),
    marginBottom: height(0.2),
  },
  ourMessage: {
    fontSize: totalSize(1.8),
    lineHeight: totalSize(3),
  },
  contributorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: height(3),
  },
  contributorCard: {
    width: width(45),
    height: height(28),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: totalSize(1),
    backgroundColor: colors.light.cardBackground,
    marginBottom: height(1),
  },
  imageContainer: {
    width: totalSize(10),
    height: totalSize(10),
    borderRadius: totalSize(5),
    overflow: "hidden",
    marginBottom: height(1),
  },
  contributorImage: {
    width: "100%",
    height: "100%",
  },
  contributorName: {
    fontSize: totalSize(1.8),
    marginRight: width(2),
    textAlign: "center",
  },
  contributorRole: {
    fontSize: totalSize(1.3),
    textAlign: "center",
  },
  contributorSocial: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height(1),
  },
  socialIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width(10),
  },
});
