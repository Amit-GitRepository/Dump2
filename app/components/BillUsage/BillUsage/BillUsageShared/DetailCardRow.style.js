import {colors, fonts} from '../../../../themes/constants.styles';

export default {
  parentContainer: {
    paddingHorizontal: 5
  },
  wrapper: {
    height: 57, // As given in zeplin
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between'
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconStyle: {
    color: colors.PRIMARY_SUBTEXT,
    paddingRight: 10
  },
  titleText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    marginBottom: -4
  },
  rightContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  topRightContainer: {
    textAlign: 'right'
  },
  consumedValueDefault: {
    fontSize: fonts.FONT_SIZE_LARGE
  },
  unlimitedTextStyle: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    color: colors.PRIMARY_SUBTEXT
  },
  unitDefault: {
    fontSize: fonts.FONT_SIZE_SMALL,
    color: colors.PRIMARY_SUBTEXT
  },
  bottomBorderLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY_BG_SEPARATOR
  },
  subtextDefault: {
    fontSize: fonts.FONT_SIZE_SMALL,
    color: colors.PRIMARY_SUBTEXT,
    textAlign: 'right',
    marginTop: -10
  }
};
