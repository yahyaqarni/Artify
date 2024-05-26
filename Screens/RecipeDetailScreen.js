import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, UsersIcon, FireIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import { WebView } from 'react-native-webview';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';


export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal);
    }, [])

    const getMealData = async (id)=>{
        try{
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          //console.log('got recipes: ', response.data);
          if(response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
          }
        }catch(err){
          console.log('error: ', err.message);
        }
      }

      const ingredientsIndexes = (meal) => {
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i <= 20; i++){
            if(meal['strIngredient' + 1]){
                indexes.push(i);
            }
        }
        return indexes;
      }

    //   const getYoutubeVideoId = url =>{
    //     const regex = /[?&]v=([^&]+)/;
    //     const match = url.match(regex);
    //     if (match && match[1]){
    //         return match[1];
    //     }
    //     return null;

    //   }

    return(
        <ScrollView
        style={tw`bg-white flex-1`}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle={{paddingBottom: 30}}
        >
            <StatusBar style={"light"} />

            {/* recipe image */}
            <View style={tw`flex-row justify-center`}>
                <CachedImage
                uri = {item.strMealThumb}
                sharedTransitionTag={item.strMeal}
                style={{width:wp(98), height: hp(50), 
                    borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}} 
            />
            </View>
            {/* Back button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)}
            style={tw`w-full absolute flex-row justify-between items-center pt-14`}>
                <TouchableOpacity 
                    onPress={ () => navigation.goBack()}
                    style={tw`p-2 rounded-full ml-5 bg-white`}
                >
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => setIsFavourite(!isFavourite)} 
                                    style={tw`p-2 rounded-full mr-5 bg-white`}
                >
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color = {isFavourite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>
            {/* Meal description */}
            {
                loading ? (
                    <Loading size = "large" style = {tw`mt-30`} />
                ):(
                    <View style = {tw`px-4 flex justify-between mt-4 mb-4 pt-8`}>
                        {/* name and area */}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}
                        stlye = {tw`mt-2 mb-2`}>
                            <Text style = {[{fontSize: hp(3)}, tw`font-bold flex-1 text-neutral-700`]}>
                                {meal?.strMeal}
                            </Text>
                            <Text style = {[{fontSize: hp(2)}, tw`font-medium flex-1 text-neutral-500`]}>
                                {meal?.strArea}
                            </Text>
                        </Animated.View>
                        {/* Misc */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} 
                        style={tw`flex-row justify-around`}>
                            <View style = {tw`flex rounded-full bg-amber-300 p-2`}>
                                <View
                                    style={[{height: hp(6.5), width: hp(6.5)}, 
                                    tw`bg-white rounded-full flex items-center justify-center`]}
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={tw`flex items-center py-3`}>
                                        <Text style={[{fontSize: hp(2)}, tw`font-bold text-neutral-700`]}> 
                                            35
                                        </Text>
                                        <Text style={[{fontSize: hp(1.3)}, tw`font-bold text-neutral-700`]}> 
                                            Minutes
                                        </Text>
                                </View>
                            </View>
                            <View style = {tw`flex rounded-full bg-amber-300 p-2`}>
                                <View
                                    style={[{height: hp(6.5), width: hp(6.5)}, 
                                    tw`bg-white rounded-full flex items-center justify-center`]}
                                >
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={tw`flex items-center py-3`}>
                                        <Text style={[{fontSize: hp(2)}, tw`font-bold text-neutral-700`]}> 
                                            03
                                        </Text>
                                        <Text style={[{fontSize: hp(1.3)}, tw`font-bold text-neutral-700`]}> 
                                            Servings
                                        </Text>
                                </View>
                            </View>
                            <View style = {tw`flex rounded-full bg-amber-300 p-2`}>
                                <View
                                    style={[{height: hp(6.5), width: hp(6.5)}, 
                                    tw`bg-white rounded-full flex items-center justify-center`]}
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={tw`flex items-center py-3`}>
                                        <Text style={[{fontSize: hp(2)}, tw`font-bold text-neutral-700`]}> 
                                           103
                                        </Text>
                                        <Text style={[{fontSize: hp(1.3)}, tw`font-bold text-neutral-700`]}> 
                                            Calories
                                        </Text>
                                </View>
                            </View>
                            <View style = {tw`flex rounded-full bg-amber-300 p-2`}>
                                <View
                                    style={[{height: hp(6.5), width: hp(6.5)}, 
                                    tw`bg-white rounded-full flex items-center justify-center`]}
                                >
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={tw`flex items-center py-3`}>
                                        <Text style={[{fontSize: hp(2)}, tw`font-bold text-neutral-700`]}> 
                                           103
                                        </Text>
                                        <Text style={[{fontSize: hp(1.3)}, tw`font-bold text-neutral-700`]}> 
                                            Easy
                                        </Text>
                                </View>
                            </View>
                        </Animated.View>

                        {/* Ingredients */}
                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
                        style={tw`py-4`}>
                            <Text style={[{fontSize: hp(2.5)}, tw`font-bold flex-1 text-neutral-700`]}>
                                Ingredients
                            </Text>
                             <View style={tw`my-2 ml-3`}>
                            {
                                ingredientsIndexes(meal).map((i, index) => {
                                return (
                                    <View
                                        key={i}
                                        style={[
                                            tw`flex-row px-4`,
                                            index !== 0 && tw`mt-3` // Add margin-top to all elements except the first one
                                        ]}
                                    >
                                        <View style={[{ height: hp(1.5), width: hp(1.5) }, tw`bg-amber-300 rounded-full`]} />
                                        <View style={[tw`flex-row px-4`, index !== 0 && tw`mt--1.0`]}>
                                            <Text style={[{fontSize: hp(1.7)}, tw`font-extrabold text-neutral-700`]}>{meal ['strMeasure' + i]}</Text>
                                            <Text style={[{fontSize: hp(1.7)}, tw`font-medium text-neutral-600`]}> {meal ['strIngredient' + i]}</Text>                                                                                 
                                        </View>
                                    </View>
                                );
                                })
                            }
                            </View>
                        </Animated.View>
                        <View>
                            {/* Instructions */}
                            <Animated.View style={tw`py-4`} entering={FadeInDown.delay(300).duration(700).springify().damping(12)}>

                                <Text style={[{fontSize: hp(2.5)}, tw`font-bold flex-1 text-neutral-700`]}>
                                    Instructions
                                </Text>
                                <Text style={[{fontSize: hp(1.6)}, tw`text-neutral-700`]}>
                                    {
                                        meal?.strInstructions
                                    }
                                </Text>
                            </Animated.View>
                            {/* Recipe video */}
                            {/* {
                                meal.strYoutube && (
                                    <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
                                    style={tw`flex-row px-4`}>
                                        <Text style={[{fontSize: hp(2.5)}, tw`font-bold flex-1 text-neutral-700`]}>
                                          Recipe Video
                                        </Text>
                                        <View>
                                            <YoutubeIframe
                                                videoId={getYoutubeVideoId(meal.strYoutube)}
                                                height={hp(30)}
                                            />
                                        </View>
                                    </Animated.View>
                                )
                            } */}
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}