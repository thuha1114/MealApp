import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({meals, categories}) {

  const navigation = useNavigation(); 

  return (
    <View style={{paddingHorizontal: wp(5)}}>
        <Text className='font-bold text-2xl text-orange-600' style={{paddingVertical: hp(3)}}>Recipes</Text>
        <View>
          {categories.length === 0 || meals.length === 0 ? (
            <View className='flex justify-center items-center w-full' style={{paddingTop:hp(20)}}>
              <ActivityIndicator size="large" />
              <Text style={{fontSize: hp(2)}}>Loading</Text>
            </View>
          ): (
            <FlatList
              data={meals}
              keyExtractor={item => item.idMeal}
              renderItem={({ item,index }) => <RecipeCard item={item} index={index} navigation={navigation} />}
              numColumns={2}
            />
          )}
        </View>
    </View>
  )
}

const RecipeCard = ({item,index, navigation}) => {

  const isEven = index % 2 === 0

  return(
    <Animated.View entering={FadeInDown.delay(index*100).duration(1000).springify().damping(15)}>
      <Pressable
        className='mb-2'
        onPress={() => navigation.navigate("RecipeDetail",{...item})}
        className={`${isEven ? 'ml-0 mr-1' : 'ml-2 mr-1'}`}     
            
      >
        <Image 
          source={{uri: item.strMealThumb}}
          style={{width:wp(43), height: index %3 == 0 ? hp(25) : hp(35), borderRadius:40}}
           
        />
        <Text className='font-bold text-slate-500 pl-3 py-2' style={{fontSize:hp(2.3)}}>
          {/* {item.strMeal} */}
          {`${item.strMeal.length > 13 ? `${item.strMeal.slice(0, 13)} ...` : item.strMeal}`}
        </Text>
      </Pressable>
    </Animated.View>
  )
}
