import {
  HambergerMenu,
  Notification,
  SearchNormal,
  Sort
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent
} from '../../components';
import { appColors, fontFamilies } from '../../constants';
import { globalStyles } from '../../styles/globalStyles';
import TagComponent from '../../components/TagComponent';
import GeoLocation from '@react-native-community/geolocation';
import axios from 'axios';

const HomeScreen = ({navigation}: any) => {
   const [currentLocation, setCurrentLocation] = useState<AddressModel >();

   useEffect(() => {
     GeoLocation.getCurrentPosition(position => {
       if (position.coords) {
         reverseGeoCode({
           lat: position.coords.latitude,
           long: position.coords.longitude,
         });
       }
     });
   }, []);

  const reverseGeoCode = async ({lat, long}: {lat: number; long: number}) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VN&apiKey=ifJH90rxpk9Bv7UG3VydMhplRNuf-6hpT86eEJaG_rQ`;
    try {
      const res = await axios(api);

      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
   const itemEvent = {
     title: 'International Band Music Concert',
     description:
       'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
     location: {
       title: 'Gala Convention Center',
       address: '36 Guild Street London, UK',
     },
     imageUrl:
       'https://phambabac.s3.ap-southeast-1.amazonaws.com/202d0b66-4573-4bab-804b-99dd4547b858.jpg',
     users: [''],
     authorId: '',
     startAt: Date.now(),
     endAt: Date.now(),
     date: Date.now(),
   };

  return (
    <View style={[globalStyles.container]}>
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 178 + (Platform.OS === 'ios' ? 10 : 22),
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop:
            Platform.OS === 'android'
              ? StatusBar.currentHeight
                ? StatusBar.currentHeight + 12
                : 12
              : 52,
        }}>
        <StatusBar barStyle="light-content" />
        <View style={{paddingHorizontal: 16}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{flex: 1, alignItems: 'center'}]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              <TextComponent
                text={`${currentLocation?.address.city}, ${currentLocation?.address.countryCode}`}
                flex={0}
                color={appColors.white}
                font={fontFamilies.medium}
                size={13}
              />
            </View>
            <CircleComponent color="#524CE0" size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={18} />
          <RowComponent>
            <RowComponent styles={{flex: 1}}>
              <SearchNormal
                variant="TwoTone"
                size={24}
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  height: 18,
                  marginHorizontal: 12,
                  backgroundColor: '#A29EF0',
                }}
              />
              <TextComponent text="Search..." color={`#A29EF0`} flex={1} />
              <TagComponent
                bgColor={'#5D56F3'}
                onPress={() =>
                  navigation.navigate('SearchEvents', {
                    isFilter: true,
                  })
                }
                label="Filters"
                icon={
                  <CircleComponent size={20} color="#B1AEFA">
                    <Sort size={16} color="#5D56F3" />
                  </CircleComponent>
                }
              />
            </RowComponent>
          </RowComponent>
          <SpaceComponent height={24} />
        </View>
        <View>
          <CategoriesList isFill />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 18,
          },
        ]}>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <TextComponent text="Invite your friends" title />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    marginTop: 10,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  font={fontFamilies.medium}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent title="Nearby You" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
