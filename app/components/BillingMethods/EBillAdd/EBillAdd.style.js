import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    padding: 5,
    flex: 1
  },
  cardContainer: {
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingTop: 5
  },
  scrollContainer: {
    paddingBottom: 20
  },
  ebillFormatContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5
  },
  ebillFormatItem: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  ebillFormat: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  radioButton: {
    paddingHorizontal: 10
  },
  serviceListHeaderContainer: {
    backgroundColor: colors.PRIMARY_BG_SEPARATOR,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5
  },
  serviceListHeader: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  buttonContainer: {
    paddingHorizontal: 10
  }
};
