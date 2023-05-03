import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function SubjectCard({
  title = "Subject",
  subHeading = "",
  onPress = () => {},
  imageURL = "https://images.pexels.com/photos/583475/pexels-photo-583475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
}) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {
          backgroundColor: isDarkMode
            ? colors.dark.cardBackground
            : colors.light.cardBackground,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {imageURL && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageURL }} style={styles.image} />
        </View>
      )}
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
    backgroundColor: colors.light.cardBackground,
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
  },
});
