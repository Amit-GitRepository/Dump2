import {colors, fonts} from '../../../../../themes/constants.styles';

export default {
  container: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingBottom: 10
  },
  buttonText: {},
  buttonStyle: {
    flex: 0,
    paddingHorizontal: 20,
    borderRadius: 22,
    paddingVertical: 10,
    marginLeft: 5
  },
  prepaidTitleText: {
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    fontSize: fonts.FONT_SIZE_NORMAL,
    textAlign: 'center',
    paddingTop: 15,
    marginBottom: -5,
    marginTop: 23
  },
  radioGroupStyles: {
    flex: 1
  },
  radioGroupSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10
  }
};
