import {colors} from '../../../themes/constants.styles';

const innerCircle = {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: colors.PRIMARY_BG_SEPARATOR
};

export default {
  outerCircle: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderRadius: 11,
    borderColor: colors.PRIMARY_ACTIONABLE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerCircle: innerCircle,
  innerCircleSelected: {
    ...innerCircle, ...{
      backgroundColor: colors.PRIMARY_ACTIONABLE
    }
  }
};
