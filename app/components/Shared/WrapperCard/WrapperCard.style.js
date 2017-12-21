import {colors, fonts} from '../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../themes/application.styles';

export const styles = {
  wrapper: {
    marginHorizontal: 8
  },
  container: {
    borderRadius: 10,
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    borderWidth: 1,
    borderColor: colors.PRIMARY_DISABLED_BG_TEXT,
    ...shadowActiveStyle
  },
  header: {
    position: 'absolute',
    backgroundColor: colors.PRIMARY_TEXT_TAB_LABEL,
    paddingVertical: 2,
    paddingHorizontal: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 2
  },
  headerText: {
    fontSize: fonts.FONT_SIZE_NORMAL,
    height: 25,
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  }
};
