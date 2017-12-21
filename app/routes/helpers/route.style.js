import {colors, fonts} from '../../themes/constants.styles';
import {Platform} from '../../utils/reactNative.util.js';

const headerTitle = {
  alignSelf: 'center',
  color: colors.SHADOW,
  fontSize: fonts.FONT_SIZE_MEDIUM,
  fontFamily: fonts.FONT_FAMILY_BOLD,
  fontWeight: 'bold'
};

export default {
  stackHeaderTitle: {
    ...headerTitle,
    marginLeft: Platform.OS === 'ios' ? 0 : -30 // to remove the shifting of center aligned text by Hamburger icon in Android
  },
  paymentHeaderTitleWithoutBack: {
    ...headerTitle,
    marginHorizontal: 0,
    marginLeft: Platform.OS === 'ios' ? 0 : 56 // react navigation gives right: 56 on android if we use headerRight
  },
  paymentHeaderTitleWithBack: {
    ...headerTitle,
    margin: 0
  },
  headerLeft: {
    paddingRight: 10
  },
  headerIconstyle: {
    ios: {width: '60%', alignSelf: 'center'},
    android: {width: '50%', alignSelf: 'center', marginLeft: -35}
  },
  headerCloseButton: {
    color: colors.PRIMARY_ACTIONABLE,
    fontFamily: fonts.FONT_FAMILY_BOLD,
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  headerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,
    elevation: 0,
    paddingHorizontal: 10
  }
};
