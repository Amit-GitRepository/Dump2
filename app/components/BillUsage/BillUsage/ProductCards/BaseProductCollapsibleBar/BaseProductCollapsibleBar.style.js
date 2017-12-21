import {colors, fonts} from '../../../../../themes/constants.styles';
import {shadowActiveStyle} from '../../../../../themes/application.styles';

const sectionStyles = {
  alignSelf: 'stretch',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingTop: 10
};

export default {
  container: {
    marginVertical: 5,
    backgroundColor: colors.TRANSPARENT,
    elevation: 2,
    borderRadius: 8
  },
  subContainer: {
    overflow: 'hidden',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRadius: 8,
    borderColor: colors.PRIMARY_DISABLED_BG_TEXT,
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  cardContainer: {
    flexDirection: 'row'
  },
  iconContainer: {
    marginVertical: -1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32
  },
  iconStyles: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST,
    fontSize: fonts.FONT_SIZE_XXL,
    backgroundColor: colors.TRANSPARENT
  },
  detailContainer: {
    flexGrow: 1,
    flexDirection: 'column'
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '100%'
  },
  leftSection: {...sectionStyles, ...{
    flexGrow: 1,
    paddingLeft: 10
  }},
  statusLeftSection: {...sectionStyles, ...{
    flexGrow: 1,
    paddingLeft: 10,
    paddingTop: 1
  }},
  rightSection: {...sectionStyles, ...{
    paddingRight: 15
  }},
  statusRightSection: {...sectionStyles, ...{
    paddingRight: 15,
    paddingTop: 14
  }},
  amountSection: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingRight: 5,
    marginBottom: -5
  },
  checkbox: {
    paddingLeft: 10,
    alignSelf: 'center',
    marginBottom: 0
  },
  leftTitleText: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    marginBottom: -5
  },
  detailText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    marginBottom: -5
  },
  rightDetailText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    marginBottom: -6,
    alignSelf: 'flex-end',
    paddingRight: 38
  },
  flipColumn: {
    flexDirection: 'column-reverse'
  },
  accordianButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    transform: [{translateX: -16}] // 32/2 :: 32 is the size of left icon
  },
  childContainer: {
    flexGrow: 1,
    backgroundColor: colors.PRIMARY_BG_SEPARATOR,
    borderColor: colors.TRANSPARENT,
    ...shadowActiveStyle
  },
  leftText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    marginBottom: -6,
    paddingBottom: 5,
    alignSelf: 'flex-start'
  },
  statusText: {
    fontSize: fonts.FONT_SIZE_SMALL,
    marginBottom: -5,
    color: colors.PRIMARY_TEXT_TAB_LABEL
  },
  prepaidDetailText: {
    color: colors.PRIMARY_DISABLED_BG_TEXT,
    marginBottom: -5
  },
  notPrepaidRightSection: {
    paddingTop: 5
  },
  prepaidProductCard: {
    height: 78
  },
  postpaidProductCard: {
    height: 68
  }
};
