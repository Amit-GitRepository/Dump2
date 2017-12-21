import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: colors.LANDING_TITLE_BG,
    flexDirection: 'row',
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  secondary: {
    borderColor: colors.PRIMARY_DISABLED_BG_TEXT,
    borderWidth: 1
  },
  icon: {
    alignSelf: 'center',
    color: colors.PRIMARY_DISABLED_BG_TEXT,
    padding: 5,
    backgroundColor: colors.TRANSPARENT
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 4,
    fontSize: fonts.FONT_SIZE_NORMAL
  }
};
