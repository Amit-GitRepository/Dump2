import {colors} from '../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../themes/application.styles';

export default {
  container: {
    flex: 1
  },
  map: {
    flex: 1 // added for a bugfix. Ref https://github.com/airbnb/react-native-maps/issues/842
  },
  marker: {
    width: 30,
    height: 40
  },
  buttonList: {
    position: 'absolute',
    bottom: 35,
    right: 5
  },
  buttonWrapper: {
    backgroundColor: colors.PRIMARY_ACTIONABLE,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    margin: 5,
    ...shadowActiveStyle
  },
  button: {
    fontSize: 55,
    borderRadius: 55,
    overflow: 'hidden',
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  }
};
