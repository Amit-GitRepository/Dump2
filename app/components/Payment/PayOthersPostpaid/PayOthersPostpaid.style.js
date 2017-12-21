import {colors, fonts} from '../../../themes/constants.styles';

export const styles = {
  scrollContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: colors.GRAY_NURSE,
    marginBottom: 20
  },
  container: {
    padding: 10
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
  wrapperCard: {
    flex: 0
  },
  totalAmount: {
    padding: 0,
    marginTop: -10
  },
  postpaidTitleText: {
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  totalBillSection: {
    paddingTop: 20,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};