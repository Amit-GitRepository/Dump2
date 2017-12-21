import {colors, fonts} from '../../../themes/constants.styles';
import {contentContainerStyle} from '../../../themes/application.styles';

export default {
  contentContainer: contentContainerStyle,
  container: {
    padding: 10
  },
  modalContainer: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.PRIMARY_BG_SEPARATOR,
    borderWidth: 1
  },
  modal: {
    margin: 15
  },
  btnText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  secondarybtnText: {
    color: colors.PRIMARY_ACTIONABLE
  },
  btnSeparator: {
    width: 10
  },
  headerText: {
    padding: 5,
    textAlign: 'center',
    fontSize: fonts.FONT_SIZE_MEDIUM,
    paddingBottom: 5
  },
  cross: {
    textAlign: 'right',
    fontSize: fonts.FONT_SIZE_MEDIUM,
    color: colors.PRIMARY_DISABLED_BG_TEXT,
    backgroundColor: colors.TRANSPARENT,
    padding: 5
  },
  textBar: {
    backgroundColor: colors.PRIMARY_TEXT_TAB_LABEL,
    padding: 10,
    marginHorizontal: -10
  },
  textBarTitle: {
    textAlign: 'center',
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  button: {
    flex: 1,
    borderColor: colors.PRIMARY_ACTIONABLE
  },
  amountText: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  buttonStyle: {
    margin: 10
  }
};
