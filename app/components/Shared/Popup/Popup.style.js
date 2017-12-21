import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  headerText: {
    paddingBottom: 5,
    fontSize: fonts.FONT_SIZE_MEDIUM,
    textAlign: 'center'
  },
  button: {
    flex: 1
  },
  cancelButtonContainer: {
    borderColor: colors.PRIMARY_ACTIONABLE,
    marginRight: 10
  },
  cancelButtonText: {
    color: colors.PRIMARY_ACTIONABLE
  }
};
