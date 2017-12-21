import {colors, fonts} from '../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../themes/application.styles';
 
export const styles = {
  card: {
    justifyContent: 'space-between',
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    padding: 15,
    borderRadius: 8,
    ...shadowActiveStyle
  },
  container: {
    padding: 10
  },
  headerText: {
    fontSize: fonts.FONT_SIZE_NORMAL,
    marginBottom: 10
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.PRIMARY_DISABLED_BG_TEXT,
    paddingHorizontal: 5,
    flexDirection: 'row-reverse'
  },
  button: {
    alignSelf: 'center',
    marginTop: 10,
    width: 100
  }
};