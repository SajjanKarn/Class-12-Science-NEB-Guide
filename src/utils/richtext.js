import { Image, StyleSheet } from "react-native";
import { View } from "react-native";
import { MARKS, INLINES, BLOCKS } from "@contentful/rich-text-types";
import { height, totalSize, width } from "react-native-dimension";
import AppText from "../components/AppText";

import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";

export default contentfulToReactnative = {
  renderMark: {
    [MARKS.UNDERLINE]: (text) => {
      return <AppText style={styles.underline}>{text}</AppText>;
    },
    [MARKS.BOLD]: (text) => {
      return <AppText variant="Bold">{text}</AppText>;
    },
    [MARKS.ITALIC]: (text) => {
      return <AppText style={styles.italic}>{text}</AppText>;
    },
    [MARKS.SUBSCRIPT]: (text) => {
      return (
        <View style={styles.subscriptContainer}>
          <AppText style={styles.subscript}>{text}</AppText>
        </View>
      );
    },
    [MARKS.SUPERSCRIPT]: (text) => {
      return (
        <View style={styles.superscriptContainer}>
          <AppText style={styles.superscript}>{text}</AppText>
        </View>
      );
    },
    [MARKS.CODE]: (text) => {
      return (
        <SyntaxHighlighter
          language="javascript"
          style={atomOneDark}
          // custom style
          customStyle={styles.customCodeStyle}
        >
          {text}
        </SyntaxHighlighter>
      );
    },
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node) => {
      return null;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      return null;
    },
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      return (
        <AppText style={styles.paragraph}>
          {children.map((child, i) => {
            return child;
          })}
        </AppText>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return null;
    },
    [BLOCKS.DOCUMENT]: (_node, children) => {
      return (
        <View>
          {children.map((child) => {
            return child;
          })}
        </View>
      );
    },
    [BLOCKS.HEADING_1]: (_node, children) => (
      <AppText variant="Bold" style={styles.heading1}>
        {children}
      </AppText>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <AppText variant="Bold" style={styles.heading2}>
        {children}
      </AppText>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <AppText variant="Bold" style={styles.heading3}>
        {children}
      </AppText>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <AppText variant="Bold" style={styles.heading4}>
        {children}
      </AppText>
    ),
    [BLOCKS.HEADING_5]: (_node, children) => (
      <AppText variant="Bold" style={styles.heading5}>
        {children}
      </AppText>
    ),
    [BLOCKS.HEADING_6]: (_node, children) => (
      <AppText variant="Bold" style={styles.heading6}>
        {children}
      </AppText>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => {
      return (
        <View>
          {children.map((child, i) => {
            return child;
          })}
        </View>
      );
    },
    [BLOCKS.OL_LIST]: (_node, children) => {
      return children.map((child, i) => {
        return child;
      });
    },
    [BLOCKS.LIST_ITEM]: (_node, child) => {
      return <AppText>{child}</AppText>;
    },
    [BLOCKS.QUOTE]: (_node, child) => {
      return <AppText style={styles.quote}>{child}</AppText>;
    },
    [BLOCKS.HR]: (_node, child) => {
      return <AppText style={styles.hr}>{child}</AppText>;
    },
    // extract image and display it
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      console.log(node);
      const { file } = node.data.target.fields;
      const mimeType = file.contentType;
      const mimeGroup = mimeType.split("/")[0];
      switch (mimeGroup) {
        case "image":
          return <Image style={styles.image} source={{ uri: file.url }} />;
        default:
          return (
            <span style={{ backgroundColor: "red" }}>
              {mimeType} embedded asset
            </span>
          );
      }
    },
  },
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: height(30),
    resizeMode: "contain",
    marginBottom: height(2),
  },
  underline: {
    textDecorationLine: "underline",
  },
  italic: {
    fontStyle: "italic",
  },
  subscriptContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  subscript: {
    fontSize: totalSize(1.3),
    lineHeight: totalSize(2),
    transform: [{ translateY: height(1.1) }],
  },
  superscriptContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  superscript: {
    fontSize: totalSize(1.3),
    lineHeight: totalSize(2),
  },
  paragraph: {
    fontSize: totalSize(1.8),
    lineHeight: totalSize(2.5),
    marginBottom: height(2),
  },
  heading1: {
    fontSize: totalSize(3.5),
    lineHeight: totalSize(4.5),
    marginBottom: height(2),
  },
  heading2: {
    fontSize: totalSize(3),
    lineHeight: totalSize(4),
    marginBottom: height(2),
  },
  heading3: {
    fontSize: totalSize(2.5),
    lineHeight: totalSize(3.5),
    marginBottom: height(2),
  },
  heading4: {
    fontSize: totalSize(2),
    lineHeight: totalSize(3),
    marginBottom: height(2),
  },
  heading5: {
    fontSize: totalSize(1.5),
    lineHeight: totalSize(2.5),
    marginBottom: height(2),
  },
  heading6: {
    fontSize: totalSize(1.2),
    lineHeight: totalSize(2.2),
    marginBottom: height(2),
  },
  quote: {
    fontSize: totalSize(1.8),
    lineHeight: totalSize(2.5),
    marginBottom: height(2),
  },
  hr: {
    fontSize: totalSize(1.8),
    lineHeight: totalSize(2.5),
    marginBottom: height(2),
  },
  italic: {
    fontSize: totalSize(1.8),
    lineHeight: totalSize(2.5),
    marginBottom: height(2),
  },
  code: {
    fontSize: totalSize(1.8),
    lineHeight: totalSize(2.5),
    marginBottom: height(2),
  },
  customCodeStyle: {
    borderRadius: totalSize(0.8),
    fontSize: totalSize(1.8),
    overflow: "hidden",
  },
});
