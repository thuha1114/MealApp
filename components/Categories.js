import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import {categoryData} from '../constants/index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown} from 'react-native-reanimated';

export default function Categories({categories, activeCategory, handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
        >
           {categories.map((item, index)=>{
               let isActive = item.strCategory === activeCategory
               return(
                   <TouchableOpacity
                    key={index}
                    className="flex items-center justify-between"
                    style={{marginTop:hp(3)}}
                    onPress={()=>handleChangeCategory(item.strCategory)}
                   >
                    <View style={{paddingRight:hp(3)}} className='flex items-center justify-center'>
                        <Image 
                            source={{uri: item.strCategoryThumb}}
                            style={{width:hp(8), height:hp(8)}}
                            className={`${isActive ? 'border-orange-500' : 'border-slate-300'} border-2 rounded-full `}
                        />
                        <Text className={`${isActive ? 'text-orange-500 font-bold' : ''} `}>
                            {item.strCategory}
                        </Text>
                    </View>
                   </TouchableOpacity>
               )
           })}
        </ScrollView>
    </Animated.View>
  )
}
