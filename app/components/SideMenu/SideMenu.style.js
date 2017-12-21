import {colors, fonts} from '../../themes/constants.styles';
import {Platform, StatusBar} from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_TEXT_TAB_LABEL,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
  },
  versionContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  versionNumberText: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_SMALL
  }
};
