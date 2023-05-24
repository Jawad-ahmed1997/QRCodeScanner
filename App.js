import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimatedSplashScreen from './screens/SplachScreen';
import HomeScreen from './screens/HomeScreen';
import QrCodeScaner from './screens/QrCodeScaner';
import MySearchBar from './screens/SearchByProduct'; 
import SelectedProduct from './screens/SelectedProduct'; 
// import { StatusBar } from 'expo-status-bar';
import { View,StatusBar} from 'react-native';

export default function App() {

  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (


   <View style={{ flex: 1,height:'100%' }}>
      {isLoading ? <AnimatedSplashScreen />
       :
       <> 
      <StatusBar/>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="QrCodeScaner" component={QrCodeScaner} />
        <Stack.Screen  options={{headerShown:false}}name="MySearchBar" component={MySearchBar} />
        <Stack.Screen options={{headerShown:false}}name="SelectedProduct" component={SelectedProduct} />
        {/* Add more Stack.Screen components for other screens */}
      </Stack.Navigator>
    </NavigationContainer></> 
     } 
    </View>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ScanerArea:{
//     position: 'absolute',
//     top: 0,
//     left: 7
//     ,
//     // right: 0,
//     // bottom: 0,
//     resizeMode: 'contain',
//     height:"90%",
//     width:"90%",
//     margin:10

//   }
// });
