import {colors, fonts} from '../../../../../themes/constants.styles';

export default {
  currentUsageContainer: {
    flexGrow: 1,
    paddingTop: 5
  },
  currentUsageWrapper: {
    paddingTop: 5,
    paddingHorizontal: 10
  },
  currentUsageSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 5
  },
  separator: {
    width: 10
  },
  circularProgress: {
    tintColor: colors.SECONDARY_TMOVE,
    width: 8,
    size: 120,
    backgroundColor: colors.PRIMARY_BG_SEPARATOR
  },
  circularProgressFillStyle: {
    fontSize: fonts.FONT_SIZE_XL,
    color: colors.SECONDARY_TMOVE
  },
  otherButtonText: {
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  sharedNumbersContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  sharedNumbersDescription: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  sharedNumber: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    paddingRight: 10
  },
  sharedNumberIcon: {
    transform: [{rotate: '-90deg'}],
    color: colors.PRIMARY_ACTIONABLE,
    backgroundColor: colors.TRANSPARENT
  },
  sharedTouchableWrapper: {
    alignSelf: 'stretch'
  },
  sharedNoIconWrap: {
    flexDirection: 'row'
  },
  multiSimContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: colors.PRIMARY_BG_SEPARATOR,
    marginBottom: 10
  },
  multiSimText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  modalContainer: {
    flex: 0,
    paddingBottom: 10,
    marginBottom: 5
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  infoBottomText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    marginBottom: -5, // TODO: Remove after fonts update
    paddingTop: 2
  },
  infoTopText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    marginBottom: -5, // TODO: Remove after fonts update
    marginTop: -10 // TODO: Remove after fonts update
  },
  infoSubText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    color: colors.PRIMARY_TEXT_TAB_LABEL
  },
  valueText: {
    fontSize: fonts.FONT_SIZE_XL,
    marginBottom: -10, // TODO: Remove after fonts update
    marginTop: -5 // TODO: Remove after fonts update
  },
  prepaidContainer: {
    paddingTop: 10
  }
};
