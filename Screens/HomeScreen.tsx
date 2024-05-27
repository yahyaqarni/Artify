import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import { ref as dbRef, onValue } from 'firebase/database';
import { db, storage } from '../lib/firebase';
import Artworks from '../components/arts';

interface HomeScreenState {
  activeCategory: string;
  categories: { name: string }[];
  artworks: any[];
}

export default class HomeScreen extends Component<{}, HomeScreenState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeCategory: 'Arts',
      categories: [],
      artworks: []

    };
  }

  componentDidMount() {
    this.fetchArtworks();
    this.getCategories();
  }

  fetchArtworks = () => {
    try {
      const artsRef = dbRef(db, 'arts');
      onValue(artsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const artList = Object.keys(data).map((key) => data[key]);
          console.log(artList);
          this.setState({ artworks: artList });
        } else {
          this.setState({ artworks: [] });
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  handleChangeCategory = (category: string) => {
    this.getArtwork(category);
    this.setState({ activeCategory: category });
  };

  getCategories = async () => {
    try {
      const { artworks } = this.state;
      const categorieData = Array.from(new Set(artworks.map((art) => art.aCategory))).map((value) => ({ name: value }));
      console.log(categorieData);
      this.setState({ categories: categorieData });
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  getArtwork = (category: string) => {
    //todo

  };

  render() {
    const { activeCategory, categories, artworks } = this.state;

    return (
      <View style={tw`flex-1 bg-white`}>
        <StatusBar style="dark" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }} // Tailwind equivalent of paddingBottom: 50
          style={tw`mb-6 pt-14`} // Tailwind equivalent of marginTop: 6, paddingTop: 14
        >
          <View style={tw`mx-4 flex-row justify-between items-center mb-2`}>
            <Image
              source={require('../assets/artify-logo.png')}
              style={{ height: hp(5), width: hp(5.5), marginTop: 6 }}
            />
            <BellIcon size={hp(4)} color="gray" />
          </View>

          <View style={{ paddingLeft: 15 }}>
            <Text style={[{ fontSize: hp(3.8) }, tw`font-semibold text-neutral-600`]}>
              Discover and showcase
            </Text>
            <Text style={[{ fontSize: hp(3.8) }, tw`font-semibold text-neutral-600 text-pink-600`]}> the art you love</Text>
            <Text style={[{ fontSize: hp(3.8) }, tw`font-semibold text-neutral-600`]}>
              -all at one place
            </Text>
          </View>

          {/*Search Bar */}
          <View style={tw`mt-4 mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`}>
            <TextInput
              placeholder='Search any art'
              placeholderTextColor={'gray'}
              style={[{ fontSize: hp(1.7) }, tw`flex-1 text-base mb-1 pl-3 tracking-wider`]}
            />
            <View style={tw`bg-white rounded-full p-3`}>
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </View>

          {/*Categories */}
          <View>
            {categories.length > 0 && (
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                handleChangeCategory={this.handleChangeCategory}
              />
            )}
          </View>

          {/*Artworks */}
          <View>
            <Artworks arts={artworks} categories={categories} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
