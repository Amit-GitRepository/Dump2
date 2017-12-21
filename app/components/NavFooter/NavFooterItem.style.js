import {colors, fonts} from '../../themes/constants.styles';

export default {
  wrapper: {
    flex: 1 // Requirement: Item size equal in large device
  },
  wrapperSmallDevice: {
    flexGrow: 1
  },
  container: {
    alignItems: 'center',
    padding: 4
  },
  separator: {
    borderRightWidth: 2,
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  activeTab: {
    backgroundColor: colors.PRIMARY_ACTIONABLE
  },
  tabTitle: {
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    fontSize: fonts.FONT_SIZE_SMALL
  },
  activeTabTitle: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  }
};
