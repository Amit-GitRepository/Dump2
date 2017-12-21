import {colors, fonts} from '../../../themes/constants.styles';

export default {
  scrollContainer: {
    marginTop: -10
  },
  scrollContentContainer: {
    paddingTop: 10
  },
  cardHeaderText: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    textAlign: 'center',
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  cardContent: {
    paddingHorizontal: 15
  },
  activeContainer: {
    marginTop: 10,
    marginHorizontal: 16
  },
  inactiveContainer: {
    marginVertical: 16,
    marginHorizontal: 16
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY_BG_SEPARATOR,
    paddingBottom: 5,
    marginBottom: 5
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  titleText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  }
};
