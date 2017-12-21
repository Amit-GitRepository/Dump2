import {colors, fonts} from '../../../themes/constants.styles';

export const caretSize = 30;
export default {
  container: {
    alignSelf: 'stretch',
    flexGrow: 1
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 2
  },
  touchWrapper: {
    flex: 1,
    marginRight: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  lastWrapper: {
    marginRight: 0
  },
  wrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 7,
    overflow: 'hidden',
    height: 42
  },
  activeTab: {
    backgroundColor: colors.PRIMARY_ACTIONABLE
  },
  inactiveTab: {
    height: 42,
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    backgroundColor: colors.TRANSPARENT
  },
  activeText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  inactiveText: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 2,
    color: colors.SECONDARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  separator: {
    marginTop: -19,
    borderWidth: 1,
    borderColor: colors.PRIMARY_ACTIONABLE,
    zIndex: 3
  },
  body: {
    alignSelf: 'stretch',
    paddingTop: 10,
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7
  }
};
