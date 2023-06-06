import { useContext, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useRoute } from "@react-navigation/native";
import Pdf from "react-native-pdf";

import colors from "../config/colors";
import ThemeContext from "../context/ThemeContext";
import AppText from "../components/AppText";
import Loader from "../components/Loader";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import contentfulToReactnative from "../utils/richtext";
import { AntDesign } from "@expo/vector-icons";

export default function ImporantQuestions() {
  const { isDarkMode } = useContext(ThemeContext);
  const { importantQuestions } = useRoute().params;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);

  return importantQuestions?.pdfUrl ? (
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
          setPercentLoaded(100);
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
        enablePaging={scrollMode ? false : true}
        horizontal={scrollMode ? false : true}
        maxScale={5.0}
        onLoadProgress={(percent) => {
          setPercentLoaded(Math.floor(percent * 100));
        }}
      />

      {percentLoaded !== 100 && (
        <AppText
          variant="Bold"
          style={{
            fontSize: totalSize(2.3),
            marginTop: height(0.5),
            marginBottom: height(0.2),
            alignSelf: "center",
            color: isDarkMode ? colors.dark.textColor : colors.light.underLine,
          }}
        >
          Loading {percentLoaded}%
        </AppText>
      )}

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
            color={isDarkMode ? colors.dark.textColor : colors.light.textColor}
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
            color: isDarkMode ? colors.dark.textColor : colors.light.textColor,
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
      <View style={{ marginTop: height(2) }}>
        {documentToReactComponents(
          importantQuestions?.content?.json,
          contentfulToReactnative
        )}
      </View>
    </ScrollView>
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
});
