import {colors} from '../../../themes/constants.styles';

export default {
  touchableContainer: {
    zIndex: 2,
    paddingRight: 15
  },
  unCollapsedArrowStyle: {
    transform: [{rotate: '180deg'}]
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowStyleDefault: {
    color: colors.PRIMARY_ACTIONABLE,
    marginLeft: 'auto'
  }
};
