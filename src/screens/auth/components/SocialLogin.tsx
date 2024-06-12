import { Facebook, Google } from "../../../assets/svgs";
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from "../../../components";
import { appColors, fontFamilies } from "../../../constants";
import LoadingModal from "../../../modal/LoadingModal";
import { useState } from "react";

const SocialLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
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
        onPress={() => {}}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />

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
