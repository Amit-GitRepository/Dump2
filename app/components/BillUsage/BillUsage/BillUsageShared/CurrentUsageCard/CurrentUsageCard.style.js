import {colors, fonts} from '../../../../../themes/constants.styles';

export default {
  bannerImage: {
    backgroundColor: colors.TRANSPARENT
  },
  bannerContainer: {
    flex: 0,
    paddingTop: 20,
    alignSelf: 'stretch'
  },
  currentUsageContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 0
  },
  currentUsageSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15
  },
  usageContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center'
  },
  usageSubContainer: {
    flexDirection: 'row'
  },
  usageText: {
    color: colors.SECONDARY_TONLINE,
    fontSize: fonts.FONT_SIZE_XXXL,
    alignSelf: 'flex-end'
  },
  usageUnitText: {
    color: colors.SECONDARY_TONLINE,
    fontSize: fonts.FONT_SIZE_NORMAL,
    alignSelf: 'flex-end',
    paddingBottom: 10
  },
  usageTypeText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    marginTop: -10
  },
  seperator: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.PRIMARY_BG_SEPARATOR
  }
};
