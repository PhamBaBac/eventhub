import {View, Text, Dimensions, ImageBackground} from 'react-native';
import React from 'react';
import {CardComponent, RowComponent, SpaceComponent, TextComponent} from '.';
import AvatarGroup from './AvatarGroup';
import {Bookmark, Location, LocationAdd} from 'iconsax-react-native';
import {appColors, fontFamilies} from '../constants';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  item: EventModel;
  type: 'list' | 'card';
}

const EventItem = (props: Props) => {
  const {item, type} = props;
    const navigation: any = useNavigation();
  return type === 'card' ? (
    <CardComponent
      onPress={() => navigation.navigate('EventDetail', {item})}
      styles={{width: Dimensions.get('window').width * 0.6}}>
      <ImageBackground
        style={{flex: 1, height: 176, marginBottom: 12}}
        source={{uri: item.imageUrl}}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: 12,
        }}>
        <RowComponent styles={{justifyContent: 'space-between', padding: 10}}>
          <RowComponent>
            <CardComponent styles={[globalStyles.noSpaceCard]}>
              <TextComponent
                text="10"
                size={16}
                color={appColors.danger2}
                styles={{
                  fontFamily: fontFamilies.bold,
                }}
              />
              <TextComponent
                text="JUNE"
                size={8}
                color={appColors.danger2}
                styles={{
                  fontFamily: fontFamilies.medium,
                }}
              />
            </CardComponent>
          </RowComponent>
          <RowComponent styles={{paddingBottom: 14}}>
            <CardComponent
              styles={[globalStyles.noSpaceCard, {width: 32, height: 32}]}>
              <MaterialIcons
                name="bookmark"
                color={appColors.danger2}
                size={22}
              />
            </CardComponent>
          </RowComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent
          numOfLine={1}
        title
        size={18}
        text="International Band Music Concert"
      />
      <AvatarGroup />
      <RowComponent>
        <Location size={16} color={appColors.text3} />
        <SpaceComponent width={6} />
        <TextComponent
          flex={1}
          text={item.location.address}
          color={appColors.text3}
          numOfLine={1}
        />
      </RowComponent>
    </CardComponent>
  ) : (
    <></>
  );
};

export default EventItem;
