import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    flex: 1
  },
  touchableContainer: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderColor: colors.PRIMARY_ACTIONABLE,
    borderWidth: 1
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listContainer: {
    marginTop: -15,
    borderRadius: 10,
    paddingBottom: 75
  },
  cancelButton: {
    marginTop: 10
  },
  title: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  downArrow: {
    marginTop: 3
  }
};
