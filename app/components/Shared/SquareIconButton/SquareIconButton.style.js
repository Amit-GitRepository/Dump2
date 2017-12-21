import {colors, fonts} from '../../../themes/constants.styles';
import {shadowScattered} from '../../../themes/application.styles';

export default {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    borderRadius: 15
  },
  wrapper: {
    alignItems: 'center',
    paddingBottom: 2,
    paddingTop: 6,
    borderRadius: 8.5,
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    elevation: 3,
    marginBottom: 4,
    ...shadowScattered
  },
  title: {
    color: colors.SECONDARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  subtextContainer: {
    marginTop: -5,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end'
  },
  subtitle: {
    color: colors.SECONDARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_SMALL
  },
  subIcon: {
    color: colors.PRIMARY_ACTIONABLE,
    paddingBottom: 5
  },
  icon: {
    fontSize: 30,
    padding: 1,
    color: colors.PRIMARY_ACTIONABLE
  }
};
