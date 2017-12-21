import {colors} from '../../../themes/constants.styles';

export default {
  container: {
    height: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  switchView: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    width: 60
  },
  buttonView: {
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    width: 30,
    zIndex: 3,
    position: 'absolute'
  }
};
