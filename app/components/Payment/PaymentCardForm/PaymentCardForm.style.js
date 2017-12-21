import {colors, fonts} from '../../../themes/constants.styles';

export default {
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: fonts.FONT_SIZE_NORMAL,
    paddingVertical: 10
  },
  fullFlex: {
    flex: 1
  },
  expiryContainer: {
    flex: 1,
    paddingRight: 10
  },
  subtext: {
    color: colors.PRIMARY_SUBTEXT,
    fontSize: fonts.FONT_SIZE_SMALL,
    paddingLeft: 10
  },
  saveCardContainer: {
    flexDirection: 'row',
    flexGrow: 0,
    alignItems: 'center'
  },
  checkbox: {
    paddingRight: 10
  },
  omiseIcon: {
    flex: 0,
    width: 60
  },
  omiseMessageText: {
    marginRight: 10,
    fontSize: fonts.FONT_SIZE_SMALL,
    color: colors.PRIMARY_DISABLED_BG_TEXT,
    fontWeight: '600'
  },
  omiseBottomContainer: {
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
