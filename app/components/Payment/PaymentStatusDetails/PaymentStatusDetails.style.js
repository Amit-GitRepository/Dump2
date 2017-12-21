import {colors, fonts} from '../../../themes/constants.styles';

export default {
  scrollContainer: {
    marginTop: -10
  },
  scrollContentContainer: {
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 15
  },
  detailsCard: {
    flex: 0
  },
  statusHeading: {
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  statusBar: {
    padding: 10,
    backgroundColor: colors.SECONDARY_TCONVERGENCE_BACKGROUND
  },
  statusBarTitle: {
    textAlign: 'center',
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  infoRowTitleText: {
    flex: 0,
    fontSize: fonts.FONT_SIZE_MEDIUM,
    marginRight: 10
  },
  infoRowValueText: {
    flex: 1,
    fontSize: fonts.FONT_SIZE_MEDIUM,
    overflow: 'hidden',
    textAlign: 'right'
  },
  infoMessage: {
    textAlign: 'center',
    padding: 20
  },
  amountUnitStyle: {
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  amountValueStyle: {
    fontSize: fonts.FONT_SIZE_LARGE
  },
  amountPrecisionStyle: {
    fontSize: fonts.FONT_SIZE_NORMAL
  }
};
