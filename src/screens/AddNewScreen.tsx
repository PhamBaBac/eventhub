import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, ContainerComponent, DateTimePicker, DropDownPicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components'
import { useSelector } from 'react-redux'
import { authSelector } from '../redux/reducers/authReducer';
import ChoiceLocation from '../components/ChoiceLocation';
import userAPI from '../apis/userApi';

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
   const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);

   const [eventData, setEventData] = useState<any>({
     ...initValues,
     authorId: auth.id,
   });

    useEffect(() => {
      handleGetAllUsers();
    }, []);


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
    const api = `/getAllUsers`;

    try {
      const res: any = await userAPI.HandleUser(api);

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

  // test cac gia tri nhap vao

  const handleTest = () => {
    console.log(eventData.users);
  }


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
       <SectionComponent>
         <ButtonComponent
           text="Add New"
           onPress={handleTest}
           type="primary"
         />
       </SectionComponent>
     </ContainerComponent>
   );
}

export default AddNewScreen