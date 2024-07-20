import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ContainerComponent, DateTimePicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components'
import { useSelector } from 'react-redux'
import { authSelector } from '../redux/reducers/authReducer';
import ChoiceLocation from '../components/ChoiceLocation';

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photoUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: '',
};
const AddNewScreen = () => {
   const auth = useSelector(authSelector);

   const [eventData, setEventData] = useState<any>({
     ...initValues,
     authorId: auth.id,
   });
  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = {...eventData};
    items[`${key}`] = value;

    setEventData(items);
  };
  const handleLocation = (val: any) => {
    const items = {...eventData};
    items.position = val.postion;
    items.locationAddress = val.address;

    setEventData(items);
  };
  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder="Title"
          value={eventData.title}
          allowClear
          onChange={val => handleChangeValue('title', val)}
        />
        <InputComponent
          placeholder="Description"
          multiline
          numberOfLine={3}
          allowClear
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />
        <ChoiceLocation onSelect={val => handleLocation(val)} />
        <RowComponent>
          <DateTimePicker
            label="Start at:"
            type="date"
            onSelected={val => handleChangeValue('date', val)}
            selected={eventData.date}
          />
          <SpaceComponent width={10} />
          <DateTimePicker
            label="End at:"
            type="time"
            onSelected={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
        </RowComponent>
        <DateTimePicker
          label="Date:"
          type="date"
          onSelected={val => handleChangeValue('startAt', val)}
          selected={eventData.startAt}
        />
      </SectionComponent>
    </ContainerComponent>
  );
}

export default AddNewScreen