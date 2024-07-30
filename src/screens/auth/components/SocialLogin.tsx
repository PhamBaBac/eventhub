import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Facebook, Google} from '../../../assets/svgs';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors, fontFamilies} from '../../../constants';
import LoadingModal from '../../../modal/LoadingModal';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../../apis/authApi';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
GoogleSignin.configure({
  webClientId:
    '725319707297-shgsb3d9gmnt8sc3du8apap637ml2g1i.apps.googleusercontent.com',
  iosClientId:
    '725319707297-9mtlaokoocj6vocer6i7h3dl0toefj4e.apps.googleusercontent.com',
});
const SocialLogin = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const api = `/google-signin`;

  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      console.log("user", user);

      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );

      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SectionComponent>
      <TextComponent
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
      />
      <SpaceComponent height={16} />

      <ButtonComponent
        type="primary"
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />
      <SpaceComponent height={16} />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        textFont={fontFamilies.regular}
        onPress={() => {}}
        iconFlex="left"
        icon={<Facebook />}
      />
      <LoadingModal visible={isLoading} />
    </SectionComponent>
  );
};

export default SocialLogin;
