import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    flex: 1,
    paddingBottom: 10
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY_BG_SEPARATOR,
    marginBottom: 10
  },
  titleContainer: {
    flexDirection: 'column',
    width: '80%',
    paddingBottom: 5
  },
  contentContainer: {
    flexDirection: 'column'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  packageRowLeft: {
    width: '65%',
    paddingBottom: 5
  },
  packageRowRight: {
    width: '35%',
    paddingBottom: 5
  },
  itemTitle: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  itemSubtitle: {
    color: colors.PRIMARY_SUBTEXT,
    fontSize: fonts.FONT_SIZE_SMALL
  },
  itemDisplayName: {
    color: colors.PRIMARY_SUBTEXT
  },
  itemRowTitle: {
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  itemRowValue: {
    fontSize: fonts.FONT_SIZE_NORMAL,
    color: colors.PRIMARY_SUBTEXT
  },
  consumedValue: {
    fontSize: fonts.FONT_SIZE_LARGE,
    marginBottom: -6
  },
  consumedValueUnit: {
    fontSize: fonts.FONT_SIZE_SMALL
  },
  totalValue: {
    color: colors.PRIMARY_SUBTEXT,
    marginBottom: -5,
    alignSelf: 'flex-end'
  },
  validityText: {
    color: colors.PRIMARY_SUBTEXT,
    fontSize: fonts.FONT_SIZE_SMALL
  }
};
