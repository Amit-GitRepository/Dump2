import {colors, fonts} from '../../../../../themes/constants.styles';

const textBase = {
  color: colors.PRIMARY_BG_TEXT_CONTRAST,
  fontSize: fonts.FONT_SIZE_SMALL,
  marginBottom: -5
};

export default {
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  endDate: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_LARGE,
    paddingRight: 2,
    bottom: -1
  },
  enDueContainer: {
    flexDirection: 'row'
  },
  dueContainer: {
    marginBottom: -5,
    alignItems: 'center'
  },
  thDueContainer: {
    flexDirection: 'row-reverse'
  },
  headerWrapperCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alignCenter: {
    alignItems: 'center'
  },
  textWhite: textBase,
  textWhiteLarge: {
    ...textBase,
    fontSize: fonts.FONT_SIZE_LARGE,
    marginBottom: -5
  },
  rightContainer: {
    borderLeftWidth: 1,
    paddingHorizontal: 10,
    paddingLeft: 17, // to make it same as zeplin, Package Detail TOL
    alignItems: 'flex-end',
    height: '100%',
    borderLeftColor: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  textMonth: {
    ...textBase,
    paddingRight: 2
  },
  textDate: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_XL
  }
};
