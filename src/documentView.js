import PDFView from 'react-native-view-pdf';
import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';

function DocumentView (props)  {
    const sampleUrl = props.route.params.url;  
    return (
      <View style={styles.container}>
         {!sampleUrl.includes(".pdf") && (Platform.OS == "android")? 
         <WebView
          source={{
            uri : "http://drive.google.com/viewerng/viewer?embedded=true&url="+sampleUrl
          }}
          cacheEnabled={false}
          javaScriptEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}      
         />
         :<PDFView
         fadeInDuration={250.0}
         style={{ flex: 1 }}
         resource={sampleUrl}
         resourceType="url"
         onScrolled={(number) => console.log('PDF rendered from onScrolled'+number)}
         onLoad={(event) => console.log(`PDF rendered from url`+ event)}
         onError={(error) => console.log('Cannot render PDF'+JSON.stringify(error))}
         />  }
   </View>
    );
}
const styles = StyleSheet.create({
  container: {
    marginTop:10,
    width:"100%",
    height:"100%"
  },

});

export default DocumentView;