import {colors} from '../../../themes/constants.styles';
import {Platform} from '../../../utils/reactNative.util';

export default {
  container: {
    flex: 1,
    marginBottom: -25  // To hide Google logo(in Android) and Legal(in iOS) from Map
  },
  modal: {
    margin: 0,
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  modalContent: {
    alignSelf: 'flex-start',
    flex: 1
  },
  searchBar: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    padding: 20
  },
  searchInput: {
    flex: 8
  },
  buttonWrapper: {
    flex: 3,
    alignSelf: 'center',
    marginRight: -5,
    marginLeft: 5
  },
  listContainer: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  infoBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: colors.INFOBAR_WITH_ALPHA
  },
  inputBar: {
    borderRadius: 22,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY_ACTIONABLE
  },
  inputText: {
    paddingLeft: 5
  }
};
