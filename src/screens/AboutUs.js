import { ScrollView, StyleSheet, View, Linking, Image } from "react-native";
import { useState } from "react";
import { width, height, totalSize } from "react-native-dimension";
import { FontAwesome5 } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Underline from "../components/Underline";
import colors from "../config/colors";

export default function AboutUs() {
  const [contributors, setContributors] = useState([
    {
      name: "Sajjan Karna",
      role: "Developer",
      image: `https://avatars.githubusercontent.com/u/49333264?v=4`,
      facebook: "https://www.facebook.com/sajjankarna",
      instagram: "https://www.instagram.com/sajjan.sh/",
    },
    {
      name: "Prabin Gautam",
      role: "Content Writer",
      image: `https://avatars.githubusercontent.com/u/29686102?v=4`,
      facebook: "https://www.facebook.com/prabin.gautam.395",
      instagram: "https://www.instagram.com/prabin_gautam_/",
    },
    {
      name: "Raman Shrestha",
      role: "Content Writer",
      image: `https://avatars.githubusercontent.com/u/29686102?v=4`,
      facebook: "https://www.facebook.com/raman.shrestha.9",
      instagram: "https://www.instagram.com/raman_shrestha_/",
    },
    {
      name: "Sajid Miya",
      role: "Content Writer",
      image: `https://avatars.githubusercontent.com/u/29686102?v=4`,
      facebook: "https://www.facebook.com/sajid.miya.5",
      instagram: "https://www.instagram.com/sajid_miya_/",
    },
  ]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppText variant="Bold" style={styles.contentTitle}>
        About Us
      </AppText>
      <Underline />

      <AppText style={styles.ourMessage}>
        We are group of students from St. Xavier's College, Maitighar. We
        understand that studying for class 12 science NEB exams can be a
        daunting task. That's why we have developed an app that is designed to
        make your life easier. Our app provides all the important topics, notes,
        and questions in one place, so you can study efficiently and
        effectively. We hope you find our app useful and wish you all the best
        🤞.
      </AppText>

      <AppText variant="Bold" style={styles.contentTitle}>
        Contributors
      </AppText>
      <Underline />

      <View style={styles.contributorsContainer}>
        {contributors.map((contributor, index) => (
          <View key={index} style={styles.contributorCard}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: contributor.image }}
                style={styles.contributorImage}
              />
            </View>
            <AppText variant="Bold" style={styles.contributorName}>
              {contributor.name}
            </AppText>
            <AppText style={styles.contributorRole}>{contributor.role}</AppText>

            <View style={styles.contributorSocial}>
              <View style={styles.socialIcon}>
                <FontAwesome5
                  name="facebook"
                  size={25}
                  color={colors.facebook}
                  onPress={() => Linking.openURL(contributor.facebook)}
                />
              </View>
              <View style={styles.socialIcon}>
                <FontAwesome5
                  name="instagram"
                  size={25}
                  color={colors.instagram}
                  onPress={() => Linking.openURL(contributor.instagram)}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: colors.cardBackground,
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
    color: colors.grey,
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
