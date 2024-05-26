import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'; 
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import axios from 'axios';

export default function HomeScreen() {
    
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipes();
  }, [])

  const handleChangeCategory = category =>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }
  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ', err.message);
    }
  }
  const getRecipes = async (category = "Beef")=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      //console.log('got recipes: ', response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ', err.message);
    }
  }
  return (
        <View style={tw`flex-1 bg-white`}>
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}} // Tailwind equivalent of paddingBottom: 50
                style={tw`mb-6 pt-14`} // Tailwind equivalent of marginTop: 6, paddingTop: 14
            >
                <View style={tw`mx-4 flex-row justify-between items-center mb-2`}> 
                    <Image
                        source={require('../assets/favicon.png')}
                        style={{ height: hp(5), width: hp(5.5), marginTop: 6 }}
                    />
                    <BellIcon size={hp(4)} color="gray" />
                </View>
                <View style={tw`mx-4 mb-2 mt-2`}>
                  <Text style={[{ fontSize: hp(1.7) }, tw`text-neutral-600`]}>
                    Hello, ABC
                  </Text>
                </View>
                  <View>
                    <Text style={[{ fontSize: hp(3.8) }, tw`font-semibold text-neutral-600`]}>
                      Make your own food,
                    </Text>
                  </View>
                  <Text style={[{ fontSize: hp(3.8) }, tw`font-semibold text-neutral-600`]}>stay at
                  <Text style={tw`text-amber-400`}> home</Text> 
                  </Text>

                  {/*Search Bar */}
                  <View style={tw`mt-4 mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`}>
                    <TextInput placeholder='Search any recipe'
                                placeholderTextColor={'gray'}
                                style={[{fontSize: hp(1.7)}, tw`flex-1 text-base mb-1 pl-3 tracking-wider`]}
                    />
                    <View style={tw`bg-white rounded-full p-3`}>
                      <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
                    </View>
                  </View>

                  {/*Categories */}
                  <View>
                    {categories.length > 0 && <Categories 
                                                categories={categories} 
                                                activeCategory={activeCategory} 
                                                handleChangeCategory={handleChangeCategory}/>
                    }
                  </View>
                  
                  {/*Recipes */}
                  <View>
                    <Recipes meals = {meals} categories={categories}/>
                  </View>
            </ScrollView>
        </View>
    );
}
