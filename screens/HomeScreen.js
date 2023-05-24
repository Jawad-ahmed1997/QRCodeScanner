import React from 'react';
import { Button, Image,View ,TouchableOpacity,Text,StyleSheet} from 'react-native';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
       <View style={styles.logo}>
      <Image  source={require('../assets/gracesuperMart.png')}
        />
      </View> 
    
      <TouchableOpacity style={styles.formButton}  
        onPress={() => navigation.navigate('QrCodeScaner')}
      >
         <Icon name="barcode" size={30} color="#900"  />
      <Text style={styles.formButtonText}>Scan Product</Text>
      </TouchableOpacity>

        <TouchableOpacity style={styles.formButton}
        onPress={() => navigation.navigate('MySearchBar')}
      >
       <Icon name="search" size={30} color="#900" />
      <Text style={styles.formButtonText}>Serach Product</Text>
      </TouchableOpacity>
      <View style={styles.powerdBy}>
        <Text style={styles.CmpName} >Powerd By IT MECHANIX</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

    container: {
      position:'relative',
        height: "100%",
        width:"100%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      },  powerdBy:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:"center", 
        // width:"100%",
        // height:"20%",
        position: 'absolute',
        
        left: 0,
        right: 0,
        bottom:40,
        marginBottom:20
      },
      logo:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:"center", 
        // width:"100%",
        // height:"20%",
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0,
        marginBottom:20
      },
    formInput: {
      height: 40,
       width: '80%', 
      borderColor: 'gray', borderWidth: 1, marginTop: 8, borderRadius: 10, paddingLeft: 10
    },
    formButton: {
      alignItems: 'center', 
      justifyContent: 'flex-start',
      display:'flex',
      flexDirection:'row',
       height: 60,
       paddingLeft:10, 
      width: '55%',
       borderColor: 'gray',
       borderWidth: 1,
       marginTop: 8, 
      borderRadius: 10,
      backgroundColor: '#DDDDDD',
    },
    formButtonText: { color: '#000000',fontSize:18, fontWeight: 'bold' ,marginLeft:20}
  });
  

export default HomeScreen;