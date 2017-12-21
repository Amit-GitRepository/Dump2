import {colors, fonts} from '../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../themes/application.styles';

export default {
  header: {
    backgroundColor: colors.PRIMARY_TEXT_TAB_LABEL,
    padding: 10,
    marginHorizontal: -5
  },
  close: {
    padding: 13,
    position: 'absolute',
    right: 0,
    zIndex: 2,
    backgroundColor: colors.TRANSPARENT,
    color: colors.PRIMARY_DISABLED_BG_TEXT,
    fontSize: fonts.FONT_SIZE_LARGE
  },
  mainContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: -1,
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    ...shadowActiveStyle
  },
  caretHeader: {
    zIndex: 1
  }
};
