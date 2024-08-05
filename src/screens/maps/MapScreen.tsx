import {View, Text, StatusBar, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import GeoLocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {appColors, appInfo} from '../../constants';
import {
  CardComponent,
  CategoriesList,
  EventItem,
  InputComponent,
  MakerCustom,
  RowComponent,
  SpaceComponent,
} from '../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {globalStyles} from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import eventAPI from '../../apis/eventApi';
import {EventModel} from '../../models/EventModel';

const MapScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();
  const [events, setEvents] = useState<EventModel[]>([]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      position => {
        if (position.coords) {
          setCurrentLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        }
      },
      error => {
        console.log(error);
      },
      {},
    );
  }, []);

  useEffect(() => {
    currentLocation && getNearbyEvents();
  }, [currentLocation]);

  const getNearbyEvents = async () => {
    const api = `/?lat=${currentLocation?.lat}&long=${currentLocation?.long}&distance=${5}&limit=5&date=${new Date().toISOString()}`
    try {
      const res = await eventAPI.HandleEvent(api);
      console.log('res', res.data);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  const moveToCurrentLocation = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.lat,
          longitude: currentLocation.long,
          latitudeDelta: 0.001,
          longitudeDelta: 0.015,
        },
        1000,
      ); // thời gian di chuyển (ms)
    }
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      {currentLocation ? (
        <MapView
          ref={mapRef}
          style={{
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
          showsMyLocationButton
          showsUserLocation
          initialRegion={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.001,
            longitudeDelta: 0.015,
          }}
          mapType="mutedStandard">
          {events.length > 0 &&
            events.map((event, index) => (
              <Marker
                key={`event${index}`}
                title={event.title}
                description=""
                onPress={() => console.log('')}
                coordinate={{
                  longitude: event.position.long,
                  latitude: event.position.lat,
                }}>
                <MakerCustom type={event.category} />
              </Marker>
            ))}
        </MapView>
      ) : (
        <></>
      )}

      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: 48,
        }}>
        <RowComponent>
          <View style={{flex: 1}}>
            <InputComponent
              styles={{marginBottom: 0}}
              affix={
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Explore', {
                      screen: 'HomeScreen',
                    })
                  }>
                  <ArrowLeft2 size={24} color={appColors.text} />
                </TouchableOpacity>
              }
              placeholder="Search"
              value=""
              onChange={val => console.log(val)}
            />
          </View>
          <SpaceComponent width={12} />
          <CardComponent
            onPress={moveToCurrentLocation}
            styles={[globalStyles.noSpaceCard, {width: 56, height: 56}]}
            color={appColors.white}>
            <MaterialIcons
              name="my-location"
              size={28}
              color={appColors.primary}
            />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={20} />
        <CategoriesList />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 0,
          left: 0,
        }}>
        <FlatList
          initialScrollIndex={0}
          data={events}
          renderItem={({item}) => <EventItem item={item} type="list" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MapScreen;
