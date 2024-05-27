import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';


type ArtDetailScreenProps = {
    route: {
      params: {
        aName: string;
        aArtist: string;
        aDescription: string;
        imageUrl: string;
      };
    };
  };

export default function ArtDetailScreen(props: ArtDetailScreenProps) {
  const { aName, aArtist, aDescription, imageUrl } = props.route.params;
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (props.route.params) {
      setLoading(false);
    }
  }, []);

    return(
        <ScrollView
        style={tw`bg-white flex-1`}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle={{paddingBottom: 30}}
        >
            <StatusBar style={"light"} />

            {/* art image */}
            <View style={tw`flex-row justify-center`}>
                <CachedImage
                uri = {imageUrl}
                sharedTransitionTag={aName}
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
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#db2777" />
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => setIsFavourite(!isFavourite)} 
                                    style={tw`p-2 rounded-full mr-5 bg-white`}
                >
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color = {isFavourite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>
            {/* art description */}
            {
                loading ? (
                    <Loading size = "large" style = {tw`mt-30`} />
                ):(
                    <View style = {tw`px-4 flex justify-between mt-4 mb-4 pt-8`}>
                        {/* name and area */}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}
                        style = {tw`mt-2 mb-2`}>
                            <Text style = {[{fontSize: hp(3)}, tw`font-bold flex-1 text-neutral-700`]}>
                                {aName}
                            </Text>
                            <Text style = {[{fontSize: hp(2)}, tw`font-medium flex-1 text-neutral-500`]}>
                                Artist: {aArtist}
                            </Text>
                        </Animated.View>

                        <View>
                            {/* Desc */}
                            <Animated.View style={tw`py-4`} entering={FadeInDown.delay(300).duration(700).springify().damping(12)}>

                                <Text style={[{fontSize: hp(2.5)}, tw`font-bold flex-1 text-neutral-700`]}>
                                    Description
                                </Text>
                                <Text style={[{fontSize: hp(1.6)}, tw`text-neutral-700`]}>
                                    {
                                        aDescription
                                    }
                                </Text>
                            </Animated.View>
                           
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}