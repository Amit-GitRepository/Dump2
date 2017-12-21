import {colors, fonts} from '../../../themes/constants.styles';

const bannerText = {
  color: colors.PRIMARY_BG_TEXT_CONTRAST,
  backgroundColor: colors.TRANSPARENT
};

export default {
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: colors.GRAY_NURSE,
    marginBottom: 20
  },
  bannerContainer: {
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: colors.TRANSPARENT
  },
  productContainer: {
    marginTop: -50
  },
  welcomeText: {
    ...bannerText, ...{
      fontSize: fonts.FONT_SIZE_SMALL,
      marginBottom: -5 // TODO: Remove after font integration
    }
  },
  usernameText: {
    ...bannerText, ...{
      fontSize: fonts.FONT_SIZE_XL,
      marginBottom: -10 // TODO: Remove after font integration
    }
  },
  separatorPadding: {
    marginTop: 30
  }
};
