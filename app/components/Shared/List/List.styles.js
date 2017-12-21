import {colors, fonts} from '../../../themes/constants.styles.js';

export default {
  listItemWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lightBackground: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  darkBackground: {
    backgroundColor: colors.PRIMARY_BG_SEPARATOR
  },
  arrowStyle: {
    position: 'absolute',
    right: 10,
    color: colors.PRIMARY_ACTIONABLE,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  contentWrapper: {
    paddingRight: 25
  },
  heading: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    marginBottom: -4
  },
  subHeading: {
    fontSize: fonts.FONT_SIZE_SMALL
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  textAlignCenter: {
    textAlign: 'center'
  }
};
