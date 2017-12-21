import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  semiCircle: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    paddingHorizontal: 10,
    paddingBottom: 4,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  text: {
    color: colors.LANDING_TITLE_BG,
    fontSize: fonts.FONT_SIZE_SMALL,
    backgroundColor: colors.TRANSPARENT
  },
  topHalf: {
    flex: 1,
    padding: 10,
    elevation: 1
  },
  bottomHalf: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.PRIMARY_BG_SEPARATOR
  }
};
