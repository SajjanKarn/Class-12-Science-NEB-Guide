import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import Loader from "../components/Loader";

export default function PrivacyPolicy() {
  const links = [
    "https://doc-hosting.flycricket.io/class-12-science-neb-guide-privacy-policy/f8eaffba-cd93-4b55-815a-71294f7b0c8e/privacy",
    "https://www.app-privacy-policy.com/live.php?token=OXz5OzxFKyEKhOL7QXDKvctk1EF4oj38",
  ];
  return (
    <WebView
      source={{
        uri: links[1],
      }}
      style={styles.container}
      renderLoading={() => <Loader />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
