import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BarCodeScanner } from "expo-barcode-scanner";

function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [type,setType] = useState('back')

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(false);
    navigation.navigate("Product", { id: data, screen: "scan" });
  };

  const handlePress = () => {
    setScanned(false);
    setCameraOpen(!cameraOpen);
  };

  const onGoBack = () => {
    setScanned(false);
    setCameraOpen(false);

  };

  if (hasPermission === null) {
    return null;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row",justifyContent:'space-between',flexWrap:'wrap' }}>
        <View style={styles.logo}>
          <Image
            source={require("../assets/itmlogo.jpg")}
            style={{ height: 50 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.logo}>
          <Image
            source={require("../assets/gracesupermart.png")}
            style={{ height: 50 }}
            resizeMode="contain"
          />
        </View>
      </View>
      {cameraOpen ? (
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ratio="16:9"
            type={type}
            style={StyleSheet.absoluteFillObject}
          >
            <Image
              style={styles.ScanerArea}
              source={require("../assets/Group4039.png")}
            />

          </BarCodeScanner>

          <TouchableOpacity style={styles.backBtn}  onPress={onGoBack}>
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
          <TouchableOpacity style={[styles.backBtn,{top:50}]}  onPress={()=>setType(type=="front"?"back":"front")}>
              <Text style={styles.backBtnText}>Switch to {type=="front"?"Back":"Front"} Camera</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.formButtonContainer}>
            <TouchableOpacity style={styles.formButton} onPress={handlePress}>
              <Icon name="barcode" size={30} color="#900" />
              <Text style={styles.formButtonText}>Tab To Scan.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.powerdBy}>
            <Text style={styles.CmpName}>Powerd By IT MECHANIX</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 80,
    backgroundColor: "white",
  },
  powerdBy: {
    marginBottom: 20,
  },
  logo: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  formButtonContainer: {
    gap: 20,
  },
  formInput: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 10,
    paddingLeft: 10,
  },
  formButton: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  ScanerArea: {
    position: "absolute",
    top: 0,
    left: 7,
    resizeMode: "contain",
    height: "90%",
    width: "90%",
    margin: 10,
  },
  backBtn: {
    position: "absolute",
    bottom: 70,
    left: "25%",
    zIndex:200
  },
  backBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  headingQrCodeScan:{
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 40,
    position: "absolute",
    left: "20%",
  }
});

export default HomeScreen;
