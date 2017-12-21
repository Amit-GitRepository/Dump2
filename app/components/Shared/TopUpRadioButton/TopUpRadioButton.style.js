import {colors, fonts} from '../../../themes/constants.styles';

export default {
  clickableBox: {
    flex: 1,
    borderRadius: 5
  },
  container: {
    flex: 0,
    borderWidth: 2,
    borderColor: colors.PRIMARY_ACTIONABLE,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  active: {
    backgroundColor: colors.PRIMARY_ACTIONABLE
  },
  inactive: {
    backgroundColor: colors.TRANSPARENT
  },
  text: {
    fontSize: fonts.FONT_SIZE_NORMAL,
    alignSelf: 'center'
  },
  activeText: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  inactiveText: {
    color: colors.PRIMARY_TEXT_TAB_LABEL
  },
  androidText: {
    paddingVertical: 1
  }
};
