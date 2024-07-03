import {View, Text} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {ArrowRight2} from 'iconsax-react-native';
import { appColors } from '../constants';
interface Props {
  title: string;
  onPress: () => void;
}

const TagBarComponent = (props: Props) => {
  const {title, onPress} = props;
  return (
    <RowComponent styles={{paddingHorizontal: 16, marginBottom: 12}} onPress={onPress}>
      <TextComponent
        text={title}
        size={14}
        flex={1}
      />
      <RowComponent>
        <TextComponent color={appColors.gray} text="See all" size={14} />
        <ArrowRight2 size={16} color={appColors.gray} variant="Bold" />
      </RowComponent>
    </RowComponent>
  );
};

export default TagBarComponent;
