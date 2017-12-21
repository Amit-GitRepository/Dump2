import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding: 5
  },
  text: {
    color: colors.PRIMARY_DISABLED_BG_TEXT,
    fontSize: fonts.FONT_SIZE_SMALL
  },
  line: {
    height: 1,
    backgroundColor: colors.PRIMARY_DISABLED_BG_TEXT,
    alignSelf: 'center',
    flex: 1
  },
  leftLine: {
    marginRight: 10
  },
  rightLine: {
    marginLeft: 10
  }
};
