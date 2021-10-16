import React, { useState } from 'react';
import { View,Button,StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import { getDeviceId,getUniqueId } from 'react-native-device-info';

 
const App = ()=> {
  id = getUniqueId();
  const [showWebView,setShowWebView] = useState(false)
  const runFirst = `
    setData('${this.id}');
    true; // note: this is required, or you'll sometimes get silent failures
  `;
  return (
    <View style={styles.container}>
      {showWebView ? <WebView
        source={require('./index.html')}
        onMessage={(event) => {}}
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