import PDFView from 'react-native-view-pdf';
import React,{ useRef,useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Alert,
  Platform,
  AppState
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const sampleUrl = "https://filesamples.com/samples/document/doc/sample2.doc";

// const sampleUrl = "https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf";
let pdfRed;

const onPressHold = (props) => {
  Alert.alert("Testing .....................");
  console.log(JSON.stringify(props));
}

const onPressHold1 = (props) => {
// Alert.alert("Testing 11111..................");
 reloadPDF();
}

const onView = (props) =>{
  props.navigation.navigate("DocumentView",{url:sampleUrl});
}
const onDownload = (props) =>{
// Alert.alert("onDownload 11111.................");
}
const reloadPDF = async () => {
  //Alert.alert("onDownload 11111.................");

  if (!pdfRed) {
    return;
  }

  try {
    await pdfRed.reload();
  } catch (err) {
    console.err(err.message);
  }
}


function HomeScreen (props) {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      reloadPDF();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );


  return  (
    <View style={styles.container}>
       
      <View>
      <Pressable style={styles.buttontext} onPress={()=> onPressHold(props)}>
         <Text style={styles.text}>1</Text>
       </Pressable>
       <Pressable style={styles.button1} onPress={()=> onPressHold1(props)}>
         <Text style={styles.text}>2</Text>
       </Pressable>
       </View>

       <View style={styles.pdfView}>
       <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={ sampleUrl }
          resourceType="url"
          onPageChanged={(page,numberOfPages)=>console.log(`PDF rendered from url`+page)}
          onLoad={(event) => console.log(`PDF rendered from url`+event)}
          ref={(ref) => pdfRed = ref} 
          onError={(error) => console.log('Cannot render PDF'+JSON.stringify(error))}
        />
       </View>

       <View style={styles.bottomcontainer} >
        <Pressable style={styles.button} onPress={()=> onView(props)}>
         <Text style={styles.text}> View </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => onDownload(props)}>
         <Text style={styles.text}> 3  </Text>
        </Pressable>
       </View>
     </View>
  )
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 16,
    marginTop:20,
  },
  buttontext: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop:10,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign:'center'
  },
  
  bottomcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width:"100%",
    bottom:30,
  },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40,
    textAlign:'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
  },
  pdfView:{
    flex:0.8,
    width:"100%",
    marginTop:15
  }
});

export default HomeScreen;