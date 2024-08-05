import {ArrowLeft} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import eventAPI from '../../apis/eventApi';
import {
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors, fontFamilies} from '../../constants';
import {EventModel} from '../../models/EventModel';
import {globalStyles} from '../../styles/globalStyles';

const EventScreen = ({navigation}: any) => {
  const [eventsUpComming, setEventsUpComming] = useState<EventModel[]>([]);
  const [eventsPast, setEventsPast] = useState<EventModel[]>([]);
  const [selectedTab, setSelectedTab] = useState(true); // true for Upcoming, false for Past Events

  useEffect(() => {
    selectedTab ? getEventsUpComming() : getEventsPast();

  }, [selectedTab]); 

 const getEventsUpComming = async () => {
  const api = `?/limit=15&date=${new Date().toISOString()}`;

  try {
    const res = await eventAPI.HandleEvent(api);
    res && setEventsUpComming(res.data);
  } catch (error) {
    console.log(error);
  }
};


  const getEventsPast = async () => {
    setEventsPast([]);
  };

  const eventsToShow = selectedTab ? eventsUpComming : eventsPast; 
  return (
    <View style={[globalStyles.container]}>
      <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <RowComponent
          styles={{
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 80,
            marginTop: 16,
          }}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={28} color={appColors.black} />
            </TouchableOpacity>
            <SpaceComponent width={16} />
            <TextComponent
              text="Events"
              size={20}
              color={appColors.black}
              font={fontFamilies.medium}
            />
          </RowComponent>
          <RowComponent>
            <TouchableOpacity>
              <Feather name="more-vertical" size={20} color={appColors.black} />
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>
        <SectionComponent
          styles={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: appColors.gray3,
              paddingVertical: 4,
              width: '90%',
              borderRadius: 26,
            }}>
            <RowComponent
              styles={{
                paddingHorizontal: 4,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedTab(true)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  backgroundColor: selectedTab
                    ? appColors.white
                    : appColors.gray3,
                  borderRadius: 26,
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                }}>
                <TextComponent
                  text="UPCOMING"
                  color={selectedTab ? appColors.primary : appColors.gray4}
                  font={fontFamilies.regular}
                />
              </TouchableOpacity>
              <SpaceComponent width={16} />
              <TouchableOpacity
                onPress={() => setSelectedTab(false)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  backgroundColor: !selectedTab
                    ? appColors.white
                    : appColors.gray3,
                  borderRadius: 26,
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                }}>
                <TextComponent
                  text="PAST EVENTS"
                  color={!selectedTab ? appColors.primary : appColors.gray4}
                  font={fontFamilies.regular}
                />
              </TouchableOpacity>
            </RowComponent>
          </View>
        </SectionComponent>
        {eventsToShow.length === 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ImageBackground
              source={require('../../assets/images/mask-group.png')}
              style={{height: 202, width: 202}}
              imageStyle={{
                resizeMode: 'cover',
              }}
            />
            <SpaceComponent height={16} />
            <TextComponent
              text={selectedTab ? 'No Upcoming Event' : 'No Past Event'}
              size={20}
              font={fontFamilies.medium}
            />
            <SpaceComponent height={16} />
            <TextComponent
              text="Create an event and invite your friends"
              color={appColors.gray}
            />
          </View>
        ) : (
          <FlatList
            // initialScrollIndex={0}
            data={eventsToShow}
            renderItem={({item}) => <EventItem item={item} type="list" />}
          />
        )}
      </View>
    </View>
  );
};

export default EventScreen;
