import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {appColors, fontFamilies} from '../../constants';
import {
  ButtonComponent,
  CardComponent,
  CircleComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import {globalStyles} from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AvatarGroup from '../../components/AvatarGroup';
import {LinearGradient} from 'react-native-linear-gradient';
import { Circle } from 'react-native-svg';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={{
          uri: 'https://phambabac.s3.ap-southeast-1.amazonaws.com/202d0b66-4573-4bab-804b-99dd4547b858.jpg',
        }}
        style={{height: 244}}
        imageStyle={{
          resizeMode: 'cover',
        }}>
        <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}>
          <View style={{paddingHorizontal: 16, paddingTop: 16}}>
            <RowComponent
              styles={{
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 100,
              }}>
              <RowComponent>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{width: 48, height: 48, justifyContent: 'center'}}>
                  <ArrowLeft size={28} color={appColors.white} />
                </TouchableOpacity>
                <TextComponent
                  text="Event Details"
                  color={appColors.white}
                  size={20}
                  font={fontFamilies.medium}
                />
              </RowComponent>
              <CardComponent
                styles={[globalStyles.noSpaceCard, {width: 36, height: 36}]}
                color="#ffffff4D">
                <MaterialIcons
                  name="bookmark"
                  color={appColors.white}
                  size={22}
                />
              </CardComponent>
            </RowComponent>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}>
        <RowComponent
          styles={[
            globalStyles.shadow,
            {
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              borderRadius: 100,
              width: '90%',
              marginTop: -24,
              backgroundColor: appColors.white,
            },
          ]}>
          <AvatarGroup />
          <ButtonComponent
            type="primary"
            styles={{paddingVertical: 2, width: 80, height: 30}}
            text="Invite"
            textStyles={{fontSize: 12}}
            textColor={appColors.white}
            textFont={fontFamilies.regular}
          />
        </RowComponent>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginTop: -24}}>
        <SectionComponent styles={{paddingTop: 36}}>
          <TextComponent
            title
            size={34}
            font={fontFamilies.medium}
            text={item.title}
          />
        </SectionComponent>
        <SectionComponent>
          <RowComponent styles={{justifyContent: 'flex-start'}}>
            <CardComponent
              styles={[
                globalStyles.noSpaceCard,
                {
                  backgroundColor: '#EBEDFF',
                },
              ]}>
              <Calendar variant="Bold" size={24} color={appColors.primary} />
            </CardComponent>
            <SpaceComponent width={10} />
            <View>
              <TextComponent
                text="14 Dcember 2021"
                color={appColors.text}
                size={12}
                styles={{marginBottom: 6, fontFamily: fontFamilies.medium}}
              />
              <TextComponent
                text={'10:00 AM - 12:00 PM'}
                size={10}
                color={appColors.text2}
              />
            </View>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent styles={{justifyContent: 'flex-start'}}>
            <CardComponent
              styles={[
                globalStyles.noSpaceCard,
                {
                  backgroundColor: '#EBEDFF',
                },
              ]}>
              <Location variant="Bold" size={24} color={appColors.primary} />
            </CardComponent>
            <SpaceComponent width={10} />
            <View>
              <TextComponent
                text="14 Dcember 2021"
                color={appColors.text}
                size={12}
                styles={{marginBottom: 6, fontFamily: fontFamilies.medium}}
              />
              <TextComponent
                text={'10:00 AM - 12:00 PM'}
                size={10}
                color={appColors.text2}
              />
            </View>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            styles={{
              justifyContent: 'space-between',
            }}>
            <RowComponent styles={{justifyContent: 'flex-start'}}>
              <Image
                source={{
                  uri: 'https://phambabac.s3.ap-southeast-1.amazonaws.com/202d0b66-4573-4bab-804b-99dd4547b858.jpg',
                }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 10,
                }}
              />

              <SpaceComponent width={10} />
              <View>
                <TextComponent
                  text="14 Dcember 2021"
                  color={appColors.text}
                  size={12}
                  styles={{marginBottom: 6, fontFamily: fontFamilies.medium}}
                />
                <TextComponent
                  text={'10:00 AM - 12:00 PM'}
                  size={10}
                  color={appColors.text2}
                />
              </View>
            </RowComponent>
            <ButtonComponent
              styles={[
                globalStyles.shadow,
                {
                  width: 68,
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: '#EBEDFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 2,
                },
              ]}
              type="primary"
              text="Follow"
              textColor={appColors.primary}
              textStyles={{fontSize: 12}}
              textFont={fontFamilies.regular}
            />
          </RowComponent>
        </SectionComponent>
        <TabBarComponent title="About Event" />
        <SectionComponent>
          <TextComponent
            text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis necessitatibus ratione asperiores odit exercitationem repellat aliquam at officiis, quasi natus? Consequatur, amet! Iusto velit vitae quidem autem maxime qui exercitationem.`}
          />
        </SectionComponent>
      </ScrollView>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 34,
        }}>
        <ButtonComponent
          text="BUY TICKET $120"
          type="primary"
          onPress={() => {}}
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor: '#3D56F0',
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </LinearGradient>
    </View>
  );
};

export default EventDetail;
