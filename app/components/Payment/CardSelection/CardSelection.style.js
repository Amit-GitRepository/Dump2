import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  cardType: {
    flex: 0,
    marginLeft: 10
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardName: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    paddingHorizontal: 5,
    marginLeft: 10,
    maxWidth: 130
  },
  deleteButton: {
    alignSelf: 'center',
    color: colors.PRIMARY_ACTIONABLE,
    marginRight: 10
  },
  cardNumber: {
    fontSize: fonts.FONT_SIZE_NORMAL,
    color: colors.PRIMARY_ACTIONABLE
  },
  hideBorder: {
    borderBottomWidth: 0
  }
};
