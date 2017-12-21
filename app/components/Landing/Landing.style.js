import {colors, fonts} from '../../themes/constants.styles';
import {contentContainerStyle, errorTextStyle, shadowScattered} from '../../themes/application.styles';

export default {
  contentContainer: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    ...contentContainerStyle
  },
  errorText: [errorTextStyle, {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }],
  hideErrorText: [errorTextStyle, {
    paddingBottom: 5,
    paddingVertical: 0,
    height: 16,
    color: colors.TRANSPARENT
  }],
  upperBody: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 0,
    flexGrow: 1,
    justifyContent: 'space-around'
  },
  lowerBody: {
    paddingTop: 5,
    paddingBottom: 9,
    paddingHorizontal: 7,
    alignSelf: 'stretch',
    backgroundColor: colors.PRIMARY_BG_SEPARATOR,
    flexGrow: 1,
    justifyContent: 'space-around'
  },
  boxButtonContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  footer: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.PRIMARY_BG_SEPARATOR
  },
  dontHaveTrueId: {
    color: colors.LANDING_TITLE_BG
  },
  title: {
    padding: 7,
    fontSize: fonts.FONT_SIZE_MEDIUM,
    textAlign: 'center',
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    backgroundColor: colors.LANDING_TITLE_BG
  },
  numberInputContainer: {
    borderRadius: 8
  },
  numberInput: {
    textAlign: 'center'
  },
  payButtonText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    paddingVertical: 4
  },
  payButton: {
    paddingVertical: 3
  },
  loginButton: {
    paddingVertical: 5,
    marginHorizontal: 30,
    marginBottom: 16,
    borderColor: colors.PRIMARY_ACTIONABLE,
    borderWidth: 1
  },
  loginButtonText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    color: colors.PRIMARY_ACTIONABLE
  },
  registerBtnText: {
    fontSize: fonts.FONT_SIZE_SMALL
  },
  cardContainer: {
    marginHorizontal: 10,
    marginTop: -45,
    borderRadius: 8,
    ...shadowScattered
  },
  cardBody: {
    paddingTop: 21,
    marginTop: -15,
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: colors.FRENCH_GREY
  },
  fullAccessText: {
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 10
  },
  cardHeaderStyles: {
    padding: 8
  },
  paddingIOS: {
    paddingVertical: 10
  },
  paddingAndroid: {
    paddingVertical: 5
  }
};
