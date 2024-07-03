import React from 'react';
import {Image} from 'react-native';
import {RowComponent, SpaceComponent, TextComponent} from '.';
import {fontFamilies} from '../constants/fontFamilies';
import { appColors } from '../constants';

interface Props {
  size?: number;
}

const AvatarGroup = (props: Props) => {
  const {size} = props;
  const photoUrl =
    'https://phambabac.s3.ap-southeast-1.amazonaws.com/202d0b66-4573-4bab-804b-99dd4547b858.jpg';

  return (
    <RowComponent justify="flex-start" styles={{marginVertical: 12}}>
      {Array.from({length: 3}).map((item, index) => (
        <Image
          key={`img${index}`}
          source={{uri: photoUrl}}
          style={{
            width: size ?? 24,
            height: size ?? 24,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: appColors.white,
            marginLeft: index > 0 ? -8 : 0,
          }}
        />
      ))}
      <SpaceComponent width={12} />
      <TextComponent
        text="+20 Going"
        size={12 + (size ? (size - 24) / 5 : 0)}
        color={appColors.primary}
        font={fontFamilies.semiBold}
      />
    </RowComponent>
  );
};

export default AvatarGroup;
