import {colors, fonts} from '../../../themes/constants.styles';

export default {
  mainContainer: {
    flex: 1,
    padding: 10
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center'
  },
  amountText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  textBar: {
    backgroundColor: colors.PRIMARY_TEXT_TAB_LABEL,
    padding: 10
  },
  textBarTitle: {
    textAlign: 'center',
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  paymentOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  paymentOptionRowTitle: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  radioButton: {
    marginRight: 15
  },
  confirmButton: {
    marginHorizontal: 10,
    marginTop: 5
  },
  buttonTextStyle: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'flex-end'
  },
  fastlane: {
    paddingRight: 14,
    paddingVertical: 8,
    fontSize: fonts.FONT_SIZE_XXXL,
    color: colors.FASTLANE_COLOR
  }
};
