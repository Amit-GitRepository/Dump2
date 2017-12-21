import {colors, fonts} from '../../../../../themes/constants.styles';

const sectionStyles = {
  flex: 1,
  justifyContent: 'flex-start'
};

export default {
  container: {
    flexGrow: 1
  },
  cardContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  titleContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 1.5,
    borderColor: colors.PRIMARY_BG_SEPARATOR,
    alignItems: 'center',
    paddingVertical: 10
  },
  leftSection: {
    ...sectionStyles
  },
  rightSection: {
    ...sectionStyles,
    alignItems: 'flex-end'
  },
  billMonthText: {
    color: colors.PRIMARY_SUBMENU,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  dueDateText: {
    fontSize: fonts.FONT_SIZE_SMALL
  },
  billDetailButton: {
    alignSelf: 'flex-end',
    paddingVertical: 0
  },
  billDetailText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    padding: 0
  },
  amountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  amountText: {
    paddingRight: 5,
    fontSize: fonts.FONT_SIZE_LARGE
  },
  paymentHistoryButton: {},
  paymentHistoryText: {},
  checkbox: {
    marginLeft: 5
  },
  noBillPlaceHolderText: {
    color: colors.PRIMARY_DISABLED_BG_TEXT,
    alignSelf: 'center'
  },
  title: {
    fontSize: fonts.FONT_SIZE_NORMAL,
    color: colors.SECONDARY_BG_TEXT_CONTRAST
  }
};
