import { StatusBar } from 'expo-status-bar'
import { ScrollView, Text, View, Image, TextInput, ActivityIndicator, SafeAreaView } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Recipes from '../components/Recipes';

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [input, setInput] = useState('')

  useEffect(()=>{
    getCategories()
    getMeals()
    // getMealsByName(input)
  },[])

  useEffect(()=>{
    getMealsByName()
  },[input])

  const handleChangeCategory = category => {
    getMeals(category)
    setActiveCategory(category)
    setMeals([])

  }

  const getCategories = async () => {
    try{
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      if(response && response.data)
        setCategories(response.data.categories)
    }
    catch(err){
      console.log("An error occured: ", err.message)
    }
  }

  const getMeals = async (category='Seafood') => {
    try{
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if(response && response.data)
        setMeals(response.data.meals)
    }
    catch(err){
      console.log("An error occured: ", err.message)
    }
  }

  const getMealsByName = async () => {
    try{
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      if(response && response.data)
        setMeals(response.data.meals)
    }
    catch(err){
      console.log("An error occured: ", err.message)
    }
  }

  return (
  <SafeAreaView style={{paddingTop:40}}>
    <StatusBar style='dark' />
    <ScrollView
      // showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:0}}
    >

      {/* Avatar and bell icon */}
      <View className="flex-row justify-between items-center" style={{marginHorizontal: hp(3)}}>
        <Image 
          source={require("../assets/avatar.png")}
          style={{width:hp(8), height:hp(8)}}
        />
        <BellIcon color="red" size={hp(4)} strokeWidth={2} />
      </View>

      {/* Greetings and punchline */}
      <View style={{marginHorizontal: hp(3), marginTop: hp(2)}}>
        <Text className="text-slate-500 font-semibold" style={{fontSize:hp(2.5)}}>Hello, Thu Ha!</Text>
        <Text className="text-slate-700 font-bold" style={{fontSize:hp(3.5)}}>Make your own food, stay at <Text className="text-amber-500">home</Text></Text>
      </View>

      {/* Search bar */}
      <View className='flex-row justify-between items-center rounded-full bg-slate-300' style={{padding:hp(1), marginHorizontal:hp(2), marginTop:hp(2)}}>
        <TextInput
          placeholder='Enter any recipe ...'
          style={{fontSize:hp(2.5), paddingLeft: hp(3)}}
          value={input}
          onChangeText={(e)=>setInput(e)}
        />
        <View  className="bg-white rounded-full" style={{padding:hp(2)}}>
          <MagnifyingGlassIcon color="gray" strokeWidth={3} />
        </View>
      </View>

      {/* Categories */}
      {categories.length > 0 ? (
        <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
      ) : (
        <View className='flex justify-center items-center'>
          <ActivityIndicator />
          <Text className='font-bold'>Loading...</Text>
        </View>
      )}

      {/* Recipes */}
      {meals === null ? (
        <View className='mx-5'>
          <Text className='font-bold text-2xl text-orange-600' style={{paddingVertical: hp(3)}}>Recipes</Text>
          <Text className='text-lg font-semibold text-slate-400'>No recipes found!</Text>
        </View>
      ) : (

        <Recipes meals={meals} categories={categories} />
      )}
    </ScrollView>
  </SafeAreaView>
  )
}
