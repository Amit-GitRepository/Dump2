import {colors} from '../../../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../../../themes/application.styles';

export default {
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    ...shadowActiveStyle
  },
  tabContainer: {
    borderTopColor: colors.PRIMARY_TEXT_TAB_LABEL
  },
  productTitle: {
    paddingVertical: 10
  }
};
