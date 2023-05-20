import { useContext, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useRoute } from "@react-navigation/native";
import Pdf from "react-native-pdf";

import colors from "../config/colors";
import ThemeContext from "../context/ThemeContext";
import AppText from "../components/AppText";
import Loader from "../components/Loader";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import contentfulToReactnative from "../utils/richtext";

export default function ImporantQuestions() {
  const { isDarkMode } = useContext(ThemeContext);
  const { importantQuestions } = useRoute().params;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return importantQuestions?.content?.json ? (
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
      <View style={{ marginTop: height(2) }}>
        {documentToReactComponents(
          importantQuestions?.content?.json,
          contentfulToReactnative
        )}
      </View>
    </ScrollView>
  ) : (
    <View
      style={[
        styles.pdfContainer,
        {
          backgroundColor: isDarkMode
            ? colors.dark.background
            : colors.light.white,
        },
      ]}
    >
      <Pdf
        source={{
          uri: importantQuestions?.pdfUrl,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          setTotalPages(numberOfPages);
        }}
        onPageChanged={(page, numberOfPages) => {
          setCurrentPage(page);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
        trustAllCerts={false}
        renderActivityIndicator={() => <Loader />}
        enablePaging={true}
        horizontal
        maxScale={5.0}
      />

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
            color: isDarkMode ? colors.dark.textColor : colors.light.textColor,
          }}
        >
          {currentPage} / {totalPages}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    paddingHorizontal: width(5),
  },
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
});
