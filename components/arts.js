import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';
import RecipeDetailScreen from '../Screens/ArtDetailScreen';

export default function Artworks({categories, arts}) {
    const navigation = useNavigation();

    return (
        <View style={tw`mx-4 mt-3 mb-3`}>
            <Text style={[{fontSize: hp(3)}, tw`font-semibold text-neutral-600`]}>Artworks</Text>
            <View>
                {
                    arts.length == 0 ? (<Loading  size="large" style={tw`mt-30`}/>) : (
                        <MasonryList
                            data={arts}
                            keyExtractor={(item)=> item.createdAt}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, i}) => <ArtCard item = {item} index = {i} navigation = {navigation} />}
                            //refreshing={isLoadingNext}
                        //onRefresh={() => refetch({first: ITEM_CNT})}
                            onEndReachedThreshold={0.1}
                        //onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )
                }
            </View>
        </View>
    )
}

const ArtCard = ({item, index, navigation}) => {
    let isEven = index % 2 == 0;
    return(
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}>
            <Pressable
                style={[{width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0},
                 tw`flex justify-center mb-4 mb-1 mt-1`]}
                 onPress={() =>  navigation.navigate('ArtDetailScreen', {...item})}
                >
                    <Image 
                        source={{uri: item.imageUrl}}
                        style={[{width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35}, 
                        tw`bg-black/5`]}
                        sharedTransitionTag={item.aName}
                        />
                        {/* Cached Image component */}
                        {/* <CachedImage 
                            uri = {item.strMealThumb}
                            style={[{width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35}, 
                            tw`bg-black/5`]}
                            sharedTransitionTag={item.strMeal} 
                        /> */}
                <Text style={[{fontSize: hp(1.5)}, tw`font-semibold ml-2 text-neutral-600`]}>
                    {
                        item.aName
                    }
                </Text>
                </Pressable>
        </Animated.View>
    )
}