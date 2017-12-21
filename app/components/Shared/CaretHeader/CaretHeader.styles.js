import {colors, fonts} from '../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../themes/application.styles';

export default {
  titleContainer: {
    paddingHorizontal: 5,
    borderBottomColor: colors.PRIMARY_ACTIONABLE
  },
  caretShadow: {
    elevation: 3,
    borderWidth: 0, // Without borderWidth: 0 shadow is not rendering in Android
    ...shadowActiveStyle
  },
  activeStyle: {
    backgroundColor: colors.PRIMARY_ACTIONABLE
  },
  titleContent: {
    backgroundColor: colors.PRIMARY_BG_SEPARATOR,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    color: colors.SECONDARY_BG_TEXT_CONTRAST
  },
  activeTitle: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  }
};
