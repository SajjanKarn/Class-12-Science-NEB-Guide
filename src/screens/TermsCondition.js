import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import Loader from "../components/Loader";

export default function TermsCondition() {
  const links = [
    "https://www.app-privacy-policy.com/live.php?token=YtcIsliPSmxqIc630sl5zsQopVA4iG6D",
  ];
  return (
    <WebView
      source={{
        uri: links[0],
      }}
      style={styles.container}
      renderLoading={() => <Loader />}
      startInLoadingState={true}
      onLoadStart={() => <Loader />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
