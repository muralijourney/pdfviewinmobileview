import PDFView from 'react-native-view-pdf';
import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Alert,
  Platform
} from 'react-native';

function DocumentView (props)  {
    const sampleUrl = props.route.params.url;  
    return (
      <View style={styles.container}>
       <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={sampleUrl}
          resourceType="url"
          onLoad={() => console.log(`PDF rendered from url`)}
          onError={() => console.log('Cannot render PDF')}
        />
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