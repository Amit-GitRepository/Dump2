import {colors, fonts} from '../../../../../themes/constants.styles';

export default {
  container: {
    flexGrow: 1,
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  subContainer: {
    flexGrow: 1,
    paddingVertical: 15,
    marginHorizontal: 15
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  activeShadow: {
    shadowColor: colors.SHADOW,
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 30
    }
  },
  childContainer: {
    flexGrow: 1,
    backgroundColor: colors.SECONDARY_TCONVERGENCE_BACKGROUND,
    borderColor: colors.TRANSPARENT,
    alignItems: 'center',
    paddingTop: 10
  },
  leftTitleText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    marginBottom: -5
  },
  detailText: {
    fontSize: fonts.FONT_SIZE_SMALL
  },
  collapsedArrowStyle: {
    transform: [{rotate: '180deg'}]
  },
  arrowStyle: {
    color: colors.PRIMARY_ACTIONABLE,
    fontSize: fonts.FONT_SIZE_SMALL,
    marginTop: 5
  }
};
