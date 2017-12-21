import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flex: 1
  },
  cardContainer: {
    marginTop: 7,
    marginBottom: 12,
    flex: 0
  },
  infoContainer: {
    backgroundColor: colors.PRIMARY_BG_SEPARATOR,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginTop: -15
  },
  info: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  ebillOptionContainer: {
    marginTop: 5,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY_BG_SEPARATOR
  },
  ebillOptionInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ebillOption: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    marginRight: 30
  },
  ebillOptionValue: {
    fontFamily: fonts.FONT_FAMILY_LIGHT,
    fontSize: fonts.FONT_SIZE_MEDIUM,
    marginRight: 25,
    flex: 1
  },
  error: {
    color: colors.PRIMARY_ACTIONABLE
  },
  buttonContainer: {
    paddingHorizontal: 10
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15
  },
  terms: {
    fontSize: fonts.FONT_SIZE_SMALL,
    textAlign: 'center'
  }
};
