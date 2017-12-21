import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    elevation: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.INFOBAR_WITH_ALPHA
  },
  cardContainer: {
    flex: 0
  },
  content: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10
  },
  otpText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  incorrectText: {
    color: colors.PRIMARY_ACTIONABLE,
    fontSize: fonts.FONT_SIZE_SMALL,
    paddingBottom: 10
  },
  bottomText: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingVertical: 15
  },
  button: {
    alignSelf: 'stretch',
    paddingVertical: 5
  },
  cancelButtonContainer: {
    borderColor: colors.PRIMARY_ACTIONABLE
  },
  cancelButtonText: {
    fontFamily: fonts.FONT_FAMILY_BOLD,
    color: colors.PRIMARY_ACTIONABLE,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  loginButtonText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  }
};
