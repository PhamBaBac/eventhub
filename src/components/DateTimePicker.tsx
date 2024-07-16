import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {DateTime} from '../utils/DateTime';
import {Calendar, Clock} from 'iconsax-react-native';
import {appColors, fontFamilies} from '../constants';
import DatePicker from 'react-native-date-picker';
import {globalStyles} from '../styles/globalStyles';
interface Props {
  selected?: Date;
  type: 'date' | 'time';
  onSelected: (date: Date) => void;
  label?: string;
}
const DateTimePicker = (props: Props) => {
  const {selected, type, onSelected, label} = props;
  const [isShowDatePicker, setIsShowDatePicker] = React.useState(false);

  return (
    <View style={{flex: 1}}>
      {label && <TextComponent text={label} />}
      <RowComponent
        styles={[globalStyles.inputContainer]}
        onPress={() => setIsShowDatePicker(true)}>
        <TextComponent
          text={`${
            selected
              ? type === 'time'
                ? DateTime.GetTime(selected)
                : DateTime.GetDate(selected)
              : 'Choice'
          }`}
          flex={1}
          font={fontFamilies.medium}
          styles={{textAlign: 'center'}}
        />
        {type === 'time' ? (
          <Clock size={24} color={appColors.gray} />
        ) : (
          <Calendar size={24} color={appColors.gray} />
        )}
      </RowComponent>
      <DatePicker
        mode={type}
        open={isShowDatePicker}
        date={new Date()}
        modal
        onCancel={() => setIsShowDatePicker(false)}
        onConfirm={val => {
            setIsShowDatePicker(false);
            onSelected(val);
        }}
      />
    </View>
  );
};

export default DateTimePicker;
