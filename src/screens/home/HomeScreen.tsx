import {
  HambergerMenu,
  Notification,
  SearchNormal,
  Sort,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {appColors, fontFamilies} from '../../constants';
import {globalStyles} from '../../styles/globalStyles';
import TagComponent from '../../components/TagComponent';
import GeoLocation from '@react-native-community/geolocation';
import axios from 'axios';
import {EventModel} from '../../models/EventModel';
import eventAPI from '../../apis/eventApi';

const HomeScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<EventModel[]>([]);
  console.log('events', events);

  useEffect(() => {
    GeoLocation.getCurrentPosition(position => {
      if (position.coords) {
        reverseGeoCode({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
    getEvents();
  }, []);

  useEffect(() => {
    currentLocation &&
      currentLocation.position &&
      getEvents(currentLocation.position.lat, currentLocation.position.lng);
  }, [currentLocation]);

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
  const getEvents = async (lat?: number, long?: number, distance?: number) => {
    const api = `${
      lat && long
        ? `/?lat=${lat}&long=${long}&distance=${distance ?? 5}&limit=5`
        : `/?limit=5`
    }&date=${new Date().toISOString()}`;
    console.log(api);

    try {
      const res = await eventAPI.HandleEvent(api);
      console.log(res);

      res && res.data && (lat && long ? setNearbyEvents(res.data) : setEvents(res.data));
    } catch (error) {
      console.log(error);
    }
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
            data={events}
            renderItem={({item}) => <EventItem item={item} type="card" />}
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
            data={nearbyEvents}
            renderItem={({item}) => <EventItem item={item} type="card" />}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
