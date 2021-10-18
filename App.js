import React, { useRef } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { getUniqueId } from "react-native-device-info";
import LoremIpsum from "./LoremIpsum";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  chatIcon: {
    width: 75,
    height: 75,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 60,
    right: 10,
    borderRadius: 37.5,
    zIndex: 1,
  },
});

const App = () => {
  const webViewRef = useRef(null);
  const sampleUserID = "test@amanco.com";
  const sampleOrderID = "12345";

  const handleChatButtonClick = () => {
    const uniqueId = getUniqueId();

    // Refe showFreshbotsWidget in freshbots-delayed.html
    webViewRef.current?.injectJavaScript(`
      window.Freshbots &&
        window.showFreshbotsWidget && 
        window.showFreshbotsWidget(${sampleUserID}, ${sampleOrderID}, ${uniqueId});
    `);
  };

  /*
   * for android we recommend hosting it and using the static HTML
   * https://github.com/react-native-webview/react-native-webview/issues/746
   * https://stackoverflow.com/questions/30061363/access-denied-using-local-storage-in-android-webview/47832246
   *
   */

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={handleChatButtonClick}
        style={styles.chatIcon}
      >
        <Text>Chat</Text>
      </TouchableHighlight>
      <ScrollView>
        <LoremIpsum />
      </ScrollView>
      <WebView
        ref={webViewRef}
        source={
          Platform.OS === "android"
            ? {
                uri: "file:///android_asset/freshbots-delayed.html"
                // We put freshworks.html in "android/app/src/main/assets" using cp command. Refer: package.json -> scripts -> android
              }
            : require("./freshbots-delayed.html")
        }
      />
    </View>
  );
};

export default App;
