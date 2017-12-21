import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    marginVertical: 15,
    marginHorizontal: 15 // Horizonatal added separately to override thr components inherit styles
  },
  contentContainerStyles: {
    paddingBottom: 5
  },
  iconStyle: {
    marginBottom: -17
  },
  headerStyle: {
    padding: 10
  },
  footerText: {
    padding: 15,
    alignSelf: 'flex-start',
    fontSize: fonts.FONT_SIZE_SMALL,
    color: colors.PRIMARY_SUBTEXT,
    textAlign: 'right'
  },
  headerColor: colors.SECONDARY_TVISION
};
