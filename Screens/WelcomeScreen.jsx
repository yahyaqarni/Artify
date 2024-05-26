import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(()=>{
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    setTimeout(()=> ring1Padding.value = withSpring(ring1Padding.value + hp(17)), 100);
    setTimeout(()=> ring2Padding.value = withSpring(ring2Padding.value + hp(13.5)), 300);

    setTimeout(()=> navigation.navigate('Home'), 2500);

  }, [])

  return (
    <Animated.View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View  style={{backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '50%',
                              height: '25%',
                              borderRadius: 9999, // rounded-full equivalent
                              margin: hp(5),
                              padding: ring2Padding,
      }}>
        <Animated.View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '90%',
                                height: '90%',
                                borderRadius: 9999,
                                padding: ring1Padding,}}>
          <Image
            source={require('../assets/artify-logo.png')}
            style={{width: hp(20),
                    height: hp(20),
                    borderRadius: 9999,}}
          />
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.punchLine}>
        <Text style={{fontWeight:'bold', color: 'white', fontSize: hp(8)}}>Artify</Text>
        <Text style={{fontWeight:'medium', color: 'white', fontSize: hp(2.5)}}>Unleash Your Inner Artist!</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed1e79', // magenta
  },

  punchLine: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  
  }
});
