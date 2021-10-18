import React, { useState,useRef } from 'react';
import { View,Button,StyleSheet, Platform} from 'react-native';
import { WebView } from 'react-native-webview';
import { getUniqueId } from 'react-native-device-info';


const App = ()=> {
  let id = getUniqueId();
  const webViewRef = useRef(null);
  const [showWebView,setShowWebView] = useState(false);
  const runFirst = `
    setData('${id}');
    true; // note: this is required, or you'll sometimes get silent failures
  `;
  return (
    <View style={styles.container}>
      {/*
        * for android we recommend hosting it and using the static HTML
        * https://github.com/react-native-webview/react-native-webview/issues/746
        * https://stackoverflow.com/questions/30061363/access-denied-using-local-storage-in-android-webview/47832246
        * 
        * */
      }
      {showWebView ? <WebView
        source={{uri: "https://616d90d5864d5.htmlsave.net"}}
        ref={webViewRef}
        onMessage={(event)=>{}}
        injectedJavaScript={runFirst}
      /> : null}
      <Button onPress={()=>{setShowWebView(true)}} title='Open Widget'></Button>
      <Button onPress={()=>{setShowWebView(false)}} title='Close'></Button>
    </View>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });
export default App;