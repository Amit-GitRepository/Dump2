import {colors, fonts} from '../../themes/constants.styles';

export default {
  container: {
    backgroundColor: colors.SECONDARY_BG_TEXT_CONTRAST,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navButton: {
    paddingVertical: 3,
    paddingHorizontal: 20
  },
  navButtonText: {
    fontSize: fonts.FONT_SIZE_SMALL
  },
  languageChangeText: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_SMALL
  },
  languageSelection: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_SMALL
  },
  activeLanguage: {
    color: colors.PRIMARY_ACTIONABLE
  },
  languageSwitch: {
    flexDirection: 'row'
  },
  separator: {
    borderWidth: 1,
    borderColor: colors.PRIMARY_TEXT_TAB_LABEL,
    marginHorizontal: 10,
    marginVertical: 4
  }
};
