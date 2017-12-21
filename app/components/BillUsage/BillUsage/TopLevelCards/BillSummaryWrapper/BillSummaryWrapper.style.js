import {colors, fonts} from '../../../../../themes/constants.styles';

export default {
  container: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingBottom: 10
  },
  totalBillSection: {
    paddingTop: 30,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalAmount: {
    padding: 0,
    marginTop: -10
  },
  buttonText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  buttonStyle: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    alignSelf: 'center',
    borderRadius: 30
  },
  postpaidTitleText: {
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    fontSize: fonts.FONT_SIZE_NORMAL
  }
};
