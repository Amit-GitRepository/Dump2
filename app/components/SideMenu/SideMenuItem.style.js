import {colors, fonts} from '../../themes/constants.styles';

export default {
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  menuTitle: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_NORMAL,
    paddingHorizontal: 15
  },
  separator: {
    borderWidth: 0.5,
    borderColor: colors.SECONDARY_BG_TEXT_CONTRAST,
    marginHorizontal: 15,
    alignSelf: 'stretch'
  },
  subMenuItem: {
    backgroundColor: colors.PRIMARY_SUBMENU
  },
  subMenuTitle: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_NORMAL,
    paddingVertical: 10,
    marginLeft: 10
  },
  subMenuContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listMarker: {
    backgroundColor: colors.PRIMARY_ACTIONABLE,
    borderRadius: 8,
    padding: 4,
    marginLeft: 55
  },
  disabledMenuItem: {
    opacity: 0.6
  }
};
