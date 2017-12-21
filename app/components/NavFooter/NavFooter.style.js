import {colors} from '../../themes/constants.styles';

export default {
  container: {
    backgroundColor: colors.TRANSPARENT,
    height: 65,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%'
  },
  androidShadowComponent: {
    width: '100%',
    height: 10,
    position: 'absolute',
    top: -3,
    backgroundColor: colors.TRANSPARENT
  },
  navRowContainer: {
    marginTop: 5,
    height: 60,
    flexDirection: 'row',
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    shadowColor: colors.SHADOW,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: -2
    },
    zIndex: 2
  }
};
