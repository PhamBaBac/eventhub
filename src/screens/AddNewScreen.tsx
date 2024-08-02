import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ButtonImagePicker,
  ContainerComponent,
  DateTimePicker,
  DropDownPicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import ChoiceLocation from '../components/ChoiceLocation';
import userAPI from '../apis/userApi';
import DropdownPicker from '../components/DropDownPicker';
import storage from '@react-native-firebase/storage';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import eventAPI from '../apis/eventApi';
import { Validate } from '../utils/validate';
import { appColors } from '../constants';

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
const AddNewScreen = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });
  const [fileSelected, setFileSelected] = useState<any>();
  useEffect(() => {
    handleGetAllUsers();
  }, []);
  const [errorsMess, setErrorsMess] = useState<string[]>([]);



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

  const handleGetAllUsers = async () => {
    try {
      const res: any = await userAPI.HandleUser('/');

      if (res && res.data) {
        const items: SelectModel[] = [];

        res.data.forEach(
          (item: any) =>
            item.email &&
            items.push({
              label: item.email,
              value: item._id,
            }),
        );

        setUsersSelects(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  };

  const handleAddEvent = async () => {
    if (fileSelected) {
      const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${
        fileSelected.filename.split('.')[1]
      }`;
      console.log(filename);

      const path = `images/${filename}`;

      const res = storage().ref(path).putFile(fileSelected.path);
      res.on(
        'state_changed',
        snap => {
          console.log(snap.bytesTransferred);
        },
        error => {
          console.log(error);
        },
        () => {
          storage()
            .ref(path)
            .getDownloadURL()
            .then(url => {
              eventData.photoUrl = url;
              handlePustEvent(eventData);
            });
        },
      );
    } else {
      handlePustEvent(eventData);
    }
  };

  const handlePustEvent = async (event: EventModel) => {
    const api = `/add-new-event`;
    try {
      const res = await eventAPI.HandleEvent(api, event, 'post');
      navigation.navigate('Explore', {
        screen: 'HomeScreen',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const mess = Validate.EventValidation(eventData);

    setErrorsMess(mess);
  }, [eventData]);

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
        {eventData.photoUrl || fileSelected ? (
          <Image
            source={{
              uri: eventData.photoUrl ? eventData.photoUrl : fileSelected.uri,
            }}
            style={{width: '100%', height: 250, marginBottom: 12}}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
        <ButtonImagePicker
          onSelect={(val: any) =>
            val.type === 'url'
              ? handleChangeValue('photoUrl', val.value as string)
              : handleFileSelected(val.value)
          }
        />
        <SpaceComponent height={16} />
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
        <DropdownPicker
          selected={eventData.category}
          values={[
            {
              label: 'Sport',
              value: 'sport',
            },
            {
              label: 'Food',
              value: 'food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
          ]}
          onSelect={val => handleChangeValue('category', val)}
        />

        <RowComponent>
          <DateTimePicker
            label="Start at:"
            type="time"
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

        <DropDownPicker
          values={usersSelects}
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          multible
          selected={eventData.users}
        />
        <InputComponent
          placeholder="Title Address"
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />
        <ChoiceLocation onSelect={val => handleLocation(val)} />
        <InputComponent
          placeholder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>
      {errorsMess.length > 0 && (
        <SectionComponent>
          {errorsMess.map(mess => (
            <TextComponent
              text={mess}
              key={mess}
              color={appColors.danger}
              styles={{marginBottom: 12}}
            />
          ))}
        </SectionComponent>
      )}
      <SectionComponent>
        <ButtonComponent
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
