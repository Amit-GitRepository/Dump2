import {colors, fonts} from '../../../themes/constants.styles';
import {shadowScattered} from '../../../themes/application.styles';

const logo = {
  width: 80,
  height: 80,
  borderRadius: 40,
  alignItems: 'center',
  justifyContent: 'center'
};
export default {
  mainContainer: {
    flex: 1,
    padding: 15
  },
  card: {
    flex: 0
  },
  successLogo: {
    ...logo, ...{
      backgroundColor: colors.SUCCESS_COLOR
    }
  },
  failureLogo: {
    ...logo, ...{
      backgroundColor: colors.PRIMARY_ACTIONABLE
    }
  },
  statusDetails: {
    alignItems: 'center',
    padding: 15
  },
  icon: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: 40
  },
  okButtonStyle: {
    marginHorizontal: 40
  },
  paymentFailInfo: {
    paddingVertical: 15,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  viewDetailText: {
    color: colors.PRIMARY_ACTIONABLE
  },
  viewDetailButton: {
    borderColor: colors.PRIMARY_ACTIONABLE,
    marginHorizontal: 30
  },
  amount: {
    padding: 20
  },
  shadowContainer: {
    borderRadius: 8,
    ...shadowScattered
  }
};
