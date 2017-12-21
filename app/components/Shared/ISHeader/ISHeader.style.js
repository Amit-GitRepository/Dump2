import {colors} from '../../../themes/constants.styles';
import {Platform, StatusBar} from 'react-native';
import {shadowActiveStyle} from '../../../themes/application.styles';

const isIOS = Platform.OS === 'ios';

export default {
  container: {
    elevation: 4,
    borderWidth: 0,
    ...shadowActiveStyle
  },
  header: {
    backgroundColor: colors.TRANSPARENT,
    height: isIOS ? 'auto' : 56 + StatusBar.currentHeight,
    paddingTop: isIOS ? 0 : StatusBar.currentHeight
  }
};
