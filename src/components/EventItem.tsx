import {Bookmark, Bookmark2, Location} from 'iconsax-react-native';
import React from 'react';
import {
  CardComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {appInfo} from '../constants/appInfos';
import {EventModel} from '../models/EventModel';
import {Image, ImageBackground, View} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {DateTime} from '../utils/DateTime';
import { appColors } from '../constants';
import AvatarGroup from './AvatarGroup';

interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;

  const navigation: any = useNavigation();

  return (
    <CardComponent
      isShadow
      styles={{width: appInfo.sizes.WIDTH * 0.86}}
      onPress={() => navigation.navigate('EventDetail', {item})}>
      {type === 'card' ? (
        <>
          <ImageBackground
            style={{flex: 1, marginBottom: 12, height: 131, padding: 10}}
            source={{uri: item.photoUrl}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <RowComponent justify="space-between">
              <CardComponent
                styles={[globalStyles.noSpaceCard]}
                color="#ffffffB3">
                <TextComponent
                  color={appColors.danger2}
                  font={fontFamilies.bold}
                  size={18}
                  text="10"
                />
                <TextComponent
                  color={appColors.danger2}
                  font={fontFamilies.semiBold}
                  size={10}
                  text="JUNE"
                />
              </CardComponent>
              <CardComponent
                styles={[globalStyles.noSpaceCard]}
                color="#ffffffB3">
                <MaterialIcons
                  name="bookmark"
                  color={appColors.danger2}
                  size={22}
                />
              </CardComponent>
            </RowComponent>
          </ImageBackground>
          <TextComponent numOfLine={1} text={item.title} title size={18} />
          <AvatarGroup />
          <RowComponent>
            <Location size={18} color={appColors.text3} variant="Bold" />
            <SpaceComponent width={8} />
            <TextComponent
              flex={1}
              numOfLine={1}
              text={item.locationAddress}
              size={12}
              color={appColors.text2}
            />
          </RowComponent>
        </>
      ) : (
        <>
          <RowComponent>
            <Image
              source={{uri: item.photoUrl}}
              style={{
                width: 79,
                height: 92,
                borderRadius: 12,
                resizeMode: 'cover',
              }}
            />
            <SpaceComponent width={10} />
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <TextComponent
                color={appColors.primary}
                text={`${DateTime.GetDayString(item.date)} • ${DateTime.GetTime(
                  new Date(item.startAt),
                )}`}
              />
              <TextComponent
                styles={{marginVertical: 12}}
                text={item.title}
                title
                size={19}
                numOfLine={2}
              />
              <RowComponent>
                <Location size={18} color={appColors.text3} variant="Bold" />
                <SpaceComponent width={8} />
                <TextComponent
                  flex={1}
                  numOfLine={1}
                  text={item.locationAddress}
                  size={12}
                  color={appColors.text2}
                />
              </RowComponent>
            </View>
          </RowComponent>
        </>
      )}
    </CardComponent>
  );
};

export default EventItem;
