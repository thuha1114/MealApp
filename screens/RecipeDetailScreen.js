import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ArrowUturnLeftIcon, BellIcon, ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecipeDetailScreen(props) {
    const item = props.route.params
    
    const [isFavorite, setIsFavorite] = useState(false)
    const navigation = useNavigation()
    const [info, setInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getInfor()
    },[])

    const getInfor = async () =>{
        try{
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`)
            if(response && response.data){
                setInfo(response.data.meals)
                setIsLoading(false)
            }
            else
                setIsLoading(true)
        }
        catch(err){
            console.log("An error occured!", err)
        }

    }

  return (
    <SafeAreaView style={{paddingTop:40}}>
        {isLoading ? (
            <View className='flex justify-center items-center h-full'>
                <ActivityIndicator />
                <Text className='font-bold '>Loading ...</Text>
            </View>
        ) : (
            <ScrollView className=''
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:20}}
            >
                <StatusBar style='dark' />

                {/* Image Food */}
                <View className='relative w-full'>
                    <Image 
                        source={{uri: item.strMealThumb}}
                        style={{width:wp(97), height:hp(50), borderRadius:hp(3), marginHorizontal:"auto", marginTop:hp(0.5)}}
                    />

                    <View className='absolute top-4 flex-row justify-between items-center mx-5' style={{width:wp(90)}}>
                        <View className='bg-orange-300 rounded-full flex justify-center items-center' style={{width:hp(6), height:hp(6)}} >
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ArrowUturnLeftIcon size={hp(3)} strokeWidth={3}  color="white"/>
                            </TouchableOpacity>
                        </View>

                        <View className='bg-orange-300 rounded-full flex justify-center items-center' style={{width:hp(6), height:hp(6)}}>
                            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite) } >
                                <HeartIcon size={hp(3)} strokeWidth={3}  color={`${isFavorite ? 'red' : 'white'}`} />
                            </TouchableOpacity>
                        </View>

                    </View>            
                </View>

                {/* Information about the food */}
                <View className='mx-5'>
                    <Text className='font-bold text-2xl mt-2 text-orange-500'>{item.strMeal}</Text>
                    <Text className='text-lg py-3 text-yellow-600'>{info[0].strCategory}</Text>

                    <View className='flex-row justify-evenly items-center w-full'>
                        {/* Time for prepare */}
                        <View className='bg-yellow-400 justify-between items-center rounded-full' style={{width:hp(10), height:hp(22), paddingVertical:hp(1)}} >
                            <View className='bg-white rounded-full flex justify-center items-center' style={{width:hp(8), height:hp(8)}}>
                                <HeartIcon size={hp(5)} strokeWidth={2}  color="gray" />
                            </View>
                            <View className='flex items-center justify-center -translate-y-4'>
                                <Text className='font-bold text-3xl'>40</Text>
                                <Text className='font-semibold text-base'>Mins</Text>
                            </View>
                        </View>

                        {/* Servings */}
                        <View className='bg-yellow-400 justify-between items-center rounded-full ' style={{width:hp(10), height:hp(22), paddingVertical:hp(1)}} >
                            <View className='bg-white rounded-full flex justify-center items-center' style={{width:hp(8), height:hp(8)}}>
                                <UsersIcon size={hp(5)} strokeWidth={2}  color="gray" />
                            </View>
                            <View className='flex items-center justify-center -translate-y-4'>
                                <Text className='font-bold text-3xl'>3</Text>
                                <Text className='font-semibold text-base'>Servings</Text>
                            </View>
                        </View>

                        {/* Calory */}
                        <View className='bg-yellow-400 justify-between items-center rounded-full' style={{width:hp(10), height:hp(22), paddingVertical:hp(1)}} >
                            <View className='bg-white rounded-full flex justify-center items-center' style={{width:hp(8), height:hp(8)}}>
                                <FireIcon size={hp(5)} strokeWidth={2}  color="gray" />
                            </View>
                            <View className='flex items-center justify-center -translate-y-4'>
                                <Text className='font-bold text-3xl'>103</Text>
                                <Text className='font-semibold text-base'>Cal</Text>
                            </View>
                        </View>

                        {/* Time for prepare */}
                        <View className='bg-yellow-400 justify-between items-center rounded-full' style={{width:hp(10), height:hp(22), paddingVertical:hp(1)}} >
                            <View className='bg-white rounded-full flex justify-center items-center' style={{width:hp(8), height:hp(8)}}>
                                <Square3Stack3DIcon size={hp(5)} strokeWidth={2}  color="gray" />
                            </View>
                            <View className='flex items-center justify-center -translate-y-4'>
                                <Text className='font-bold text-3xl'></Text>
                                <Text className='font-semibold text-base'>Easy</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Ingredients */}
                <View className='m-5'>
                    <Text className='font-bold text-2xl text-orange-500 mb-5'>Ingredients</Text>
                    <View>
                        {
                            Object.keys(info[0])
                            .filter(key => key.startsWith('strIngredient') && info[0][key])
                            .map((key, index) => (
                                <View key={index} className='flex flex-row items-center '>
                                    <View style={{width:hp(1.5), height:hp(1.5)}} className='rounded-full bg-red-500'></View>
                                    <Text className='text-lg capitalize pl-2'>{info[0][key]}</Text>
                                </View>
                        ))}
                    </View>
                </View>

                {/* Instructions */}
                <View className='mx-5'>
                    <Text className='font-bold text-2xl text-orange-500 mb-5'>Instructions</Text>
                    <Text className='text-base text-justify text-lg' >{info[0].strInstructions}</Text>
                </View>

            </ScrollView>
        )}
    </SafeAreaView>
  )
}
