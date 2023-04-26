import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

export default function SubjectCard({
  title = "Subject",
  subHeading = "",
  imageURL = "https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1272404/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png",
}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => console.log("Pressed")}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageURL }} style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        {subHeading && (
          <AppText variant="Regular" style={styles.cardSubHeading}>
            {subHeading}
          </AppText>
        )}

        <AppText variant="SemiBold" style={styles.cardTitle}>
          {title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.cardBackground,
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    flex: 2,
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    // alignItems: "center",
  },
  cardSubHeading: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
