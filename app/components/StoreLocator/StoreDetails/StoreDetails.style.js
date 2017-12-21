import {colors, fonts} from '../../../themes/constants.styles';
import {shadowScattered} from '../../../themes/application.styles';

export default {
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  scrollContainer: {
    paddingBottom: 20
  },
  detailsContainer: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    marginTop: -12
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  callButtonWrapper: {
    flex: 1,
    paddingLeft: 16
  },
  directionButtonWrapper: {
    flex: 1,
    paddingHorizontal: 16
  },
  buttonCall: {
    borderColor: colors.PRIMARY_ACTIONABLE
  },
  buttonText: {
    color: colors.PRIMARY_ACTIONABLE
  },
  typeHeading: {
    padding: 5,
    textAlign: 'center',
    backgroundColor: colors.PRIMARY_BG_SEPARATOR,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  containerStyles: {
    borderRadius: 8,
    borderColor: colors.TRANSPARENT
  },
  outerContainer: {
    borderRadius: 8,
    marginHorizontal: 5,
    ...shadowScattered
  }
};
