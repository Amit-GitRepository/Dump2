import {colors, fonts} from '../../../../../themes/constants.styles';

export default {
  container: {
    flexDirection: 'row',
    paddingRight: 28,
    paddingLeft: 25
  },
  textArea: {
    alignItems: 'center'
  },
  text: {
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  subtext: {
    color: colors.PRIMARY_ACTIONABLE,
    fontSize: fonts.FONT_SIZE_SMALL
  },
  prepaidSubText: {
    color: colors.PRIMARY_TEXT_TAB_LABEL
  },
  icon: {
    marginLeft: 5,
    alignSelf: 'flex-start',
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    padding: 3,
    fontSize: fonts.FONT_SIZE_NORMAL,
    backgroundColor: colors.PRIMARY_ACTIONABLE,
    borderWidth: 1,
    borderColor: colors.PRIMARY_ACTIONABLE,
    borderRadius: 12,
    overflow: 'hidden'
  }
};
