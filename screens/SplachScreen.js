import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';



const AnimatedSplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, []);
  
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/gracesuperMart.png')}
          style={[styles.image, { opacity: fadeAnim }]}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height:"100%",
      width:"100%"
    },
    // image: {
    //   width: 100,
    //   height: 100,
    // },
  });
  export default AnimatedSplashScreen;

  