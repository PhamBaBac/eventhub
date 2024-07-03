import {View, Text, Dimensions, ImageBackground} from 'react-native';
import React from 'react';
import {CardComponent, RowComponent, SpaceComponent, TextComponent} from '.';
import AvatarGroup from './AvatarGroup';
import {Location, LocationAdd} from 'iconsax-react-native';
import {appColors} from '../constants';

interface Props {
  item: EventModel;
  type: 'list' | 'card';
  onPress?: () => void;
}

const EventItem = (props: Props) => {
  const {item, type, onPress} = props;
  return type === 'card' ? (
    <CardComponent styles={{width: Dimensions.get('window').width * 0.6}}>
      <ImageBackground
        style={{flex: 1, height: 176, marginBottom: 12}}
        source={{uri: item.imageUrl}}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: 12,
        }}>
        <TextComponent text="faafdaf" />
      </ImageBackground>
      <TextComponent
        numberOfLine={1}
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
          numberOfLine={1}
          color={appColors.text3}
        />
      </RowComponent>
    </CardComponent>
  ) : (
    <></>
  );
};

export default EventItem;
