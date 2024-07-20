import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GeoLocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import { appColors, appInfo } from '../../constants';
import { CardComponent, CategoriesList, InputComponent, RowComponent, SpaceComponent } from '../../components';
import { ArrowLeft2 } from 'iconsax-react-native';
import { globalStyles } from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const MapScreen = ({navigation}:any) => {
   const [currentLocation, setCurrentLocation] = useState<{
     lat: number;
     long: number;
   }>();
   const [events, setEvents] = useState<EventModel[]>([]);


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
     currentLocation 
   }, [currentLocation]);
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      {currentLocation ? (
        <MapView
          style={{
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
          showsMyLocationButton
          // showsUserLocation
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
          mapType="standard"></MapView>
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
    </View>
  );
}

export default MapScreen