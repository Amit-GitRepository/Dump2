import {colors, fonts} from '../../../themes/constants.styles';

const precisionText = {
  color: colors.PRIMARY_SUBTEXT,
  paddingBottom: 5
};

export default {
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  unitTextTotal: {
    paddingRight: 3,
    paddingBottom: 6,
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  unitTextIndividulal: {
    paddingRight: 3,
    paddingBottom: 3,
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  amountTextTotal: {
    fontSize: fonts.FONT_SIZE_XXL
  },
  amountTextIndividual: {
    fontSize: fonts.FONT_SIZE_LARGE
  },
  precisionTextTotal: {
    ...precisionText, ...{
      fontSize: fonts.FONT_SIZE_MEDIUM
    }
  },
  precisionTextIndividual: {
    ...precisionText, ...{
      fontSize: fonts.FONT_SIZE_SMALL,
      marginBottom: -1
    }
  }
};
