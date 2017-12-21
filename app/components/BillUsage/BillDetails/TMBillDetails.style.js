import {colors, fonts} from '../../../themes/constants.styles';

export default {
  headerContainer: {
    backgroundColor: colors.SECONDARY_TMOVE,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  invoiceSection: {
    flexDirection: 'column'
  },
  iconSection: {
    flexDirection: 'row'
  },
  verticalLine: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    marginRight: 10
  },
  verticalLineFooter: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  iconStyle: {
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  headerTitle: {
    fontSize: fonts.FONT_SIZE_SMALL,
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    marginBottom: -5 // TODO: Remove when fonts updated
  },
  headerSubtitle: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    marginBottom: -5 // TODO: Remove when fonts updated
  },
  totalSection: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  usageSection: {
    paddingVertical: 5,
    backgroundColor: colors.PRIMARY_BG_SEPARATOR,
    alignSelf: 'stretch',
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    fontSize: fonts.FONT_SIZE_MEDIUM,
    textAlign: 'center'
  },
  footerSection: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  limitSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5
  },
  totalText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  footerText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    color: colors.PRIMARY_SUBTEXT,
    marginBottom: -5 // TODO: Remove when fonts updated
  },
  precisionText: {
    fontSize: fonts.FONT_SIZE_XL,
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    marginBottom: -5 // TODO: Remove when fonts updated
  }
};
