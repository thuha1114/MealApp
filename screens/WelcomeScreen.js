import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)

  const navigation = useNavigation()

  useEffect(()=>{
    setTimeout(()=>{
      ring1padding.value = withSpring(ring1padding.value + hp(6))
    }, 100)

    setTimeout(()=>{
      ring2padding.value = withSpring(ring2padding.value + hp(5))
    }, 300)

    setTimeout(()=>{
      navigation.navigate("Home")
    }, 2500)
  },[])

  return (
    <View className="flex-1 justify-center items-center bg-orange-500">
        <StatusBar style='light' />
        
        {/* Logo */}
        <Animated.View className='bg-white/20 rounded-full' style={{padding: ring1padding}}>
          <Animated.View className='bg-white/30 rounded-full' style={{padding: ring2padding}}>
            <Image 
              source={require("../assets/meal.png")}
              style={{width:hp(45), height:hp(45)}}
            />
          </Animated.View>
        </Animated.View>

        {/* Title */}
        <View className='flex justify-center items-center' style={{marginTop:hp(3)}}>
          <Text className='text-white font-bold' style={{fontSize:hp(6)}}>Foody</Text>
          <Text className='text-white font-medium' style={{fontSize:hp(3)}}>Food is always right</Text>
        </View>
    </View>
  )
}
