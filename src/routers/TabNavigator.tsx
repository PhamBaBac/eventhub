import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AddSquare, Calendar, Location, User} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {Platform, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextComponent} from '../components';
import {appColors} from '../constants';
import AddNewScreen from '../screens/AddNewScreen';
import EventNavigator from './EventNavigator';
import ExploreNavigator from './ExploreNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';
import { globalStyles } from '../styles/globalStyles';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 78 : 88,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray5;
          size = 23;
          switch (route.name) {
            case 'Explore':
              icon = <MaterialIcons name="explore" size={size} color={color} />;
              break;
            case 'Events':
              icon = <Calendar variant="Bold" size={size} color={color} />;
              break;
            case 'Map':
              icon = <Location variant="Bold" color={color} size={size} />;
              break;
            case 'Profile':
              icon = <User variant="Bold" color={color} size={size} />;
              break;
            case 'Add':
              icon = (
                <View
                  style={[{
                    width: 62,
                    height: 62,
                    borderRadius: 100,
                    backgroundColor: appColors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Platform.OS === 'ios' ? -60 : -90,
                  }, globalStyles.shadow]}>
                  <AddSquare size={30} color={appColors.white} />
                </View>
              );
              break;
            default:
              break;
          }
          return icon;
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'android' ? 12 : 8,
        },
        tabBarLabel: ({focused}) => {
          return route.name === 'Add' ? null : (
            <TextComponent
              text={route.name}
              size={14}
              color={focused ? appColors.primary : appColors.gray5}
              styles={{marginBottom: Platform.OS === 'android' ? 16 : 0}}
            />
          );
        },
      })}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
