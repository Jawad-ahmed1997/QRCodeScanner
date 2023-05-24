import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity,Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { getProductByBarcode} from '../api';


function QrCodeScaner({ navigation }) {
  // const Stack = createStackNavigator();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false); // New state variable
  const [searchText,setSearchText]=useState('')
  const [resultList, setResultList] = useState([]);


  

  // const fetchProduct = async (searchText) => {
  //   const data = await  getProductByBarcode(searchText);
  //   setResultList(data);
  //   // console.log(resultList)
  // };
  //  useEffect(()=>{
  //   fetchProduct(searchText)
  // },[setSearchText])
  
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setScanned(false); // Reset scanned state when the component comes into focus
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const handleBarCodeScanned = ({data}) => {
    setScanned(false);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate('SelectedProduct',  { id: data, screen: 'scan' })
  };

  const handlePress = () => {
    setScanned(false);
    setCameraOpen(!cameraOpen); // Toggle cameraOpen state
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>    
    <View style={styles.container}>
      {cameraOpen ? ( // Check if the camera should be open
      
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
            >
          <Image style={styles.ScanerArea} source={require('../assets/Group4039.png')}/>
        </BarCodeScanner>
      
      ) : (
        <Text>Start To Scan</Text>
      )}

      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}

      <TouchableOpacity
        onPress={handlePress}
      >
        <Image
        source={require('../assets/Group4062.png')}
        />
      </TouchableOpacity>
    </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScanerArea:{
    position: 'absolute',
    top: 0,
    left: 7
    ,
    // right: 0,
    // bottom: 0,
    resizeMode: 'contain',
    height:"90%",
    width:"90%",
    margin:10

  }
});

export default QrCodeScaner;