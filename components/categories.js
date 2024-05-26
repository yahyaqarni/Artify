import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';

export default function Categories({categories, activeCategory, handleChangeCategory}) {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`mr-4 `}
            contentContainerStyle={{paddingHorizontal: 15}}
            >
               {       
                    categories.map((cat, index) => {
                        let isActive = cat.strCategory == activeCategory;
                        let activeButtonClass = isActive? tw`bg-amber-400`: tw`bg-black/10`;
                        return (
                            <TouchableOpacity
                            key={index}
                            onPress={()=>handleChangeCategory(cat.strCategory)}
                            style={tw`flex items-center mt-1 mb-1`}>
                                <View style={tw`rounded-full p-[6px]`+activeButtonClass}>
                                <Image
                                    source={{uri: cat.strCategoryThumb}}
                                    style={[{width: hp(6), height: hp(6)},
                                         tw`rounded-full mr-3 ml-3`]}
                                />
                                {/* CachedImage Component */}
                                {/* <CachedImage 
                                    uri = {cat.strCategoryThumb}
                                    style={[{width: hp(6), height: hp(6)},
                                            tw`rounded-full mr-3 ml-3`]}
                                /> */}
                                </View>
                                <Text style={[{fontSize: hp(1.6)},
                                     tw`text-neutral-600`]}>
                                     {cat.strCategory}
                                </Text>
                                </TouchableOpacity>
                        )
                    }) 
               } 
            </ScrollView>
        </Animated.View>
    )
}