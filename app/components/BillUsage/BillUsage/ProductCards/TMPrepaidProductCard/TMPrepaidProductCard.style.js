import {colors, fonts} from '../../../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../../../themes/application.styles';

export default {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_BG_SEPARATOR,
    padding: 10
  },
  subContainer: {
    alignSelf: 'stretch',
    paddingTop: 5,
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    borderRadius: 8,
    ...shadowActiveStyle
  },
  productTitle: {
    paddingBottom: 10,
    paddingLeft: 10
  },
  title: {
    fontSize: fonts.FONT_SIZE_NORMAL,
    paddingVertical: 5,
    textAlign: 'center'
  },
  titleContainer: {
    borderBottomWidth: 1,
    marginHorizontal: 1,
    borderColor: colors.PRIMARY_BG_SEPARATOR
  },
  buttonStyle: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 22
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: colors.PRIMARY_BG_SEPARATOR,
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 10
  },
  leftTitleTextStyle: {
    color: colors.PRIMARY_ACTIONABLE
  }
};
