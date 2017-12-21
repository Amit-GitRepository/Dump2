import {colors} from '../../../themes/constants.styles';

const container = {
  borderWidth: 2,
  borderRadius: 5,
  borderColor: colors.PRIMARY_ACTIONABLE,
  padding: 2
};

export default {
  checkedContainer: {
    ...container, ...{
      backgroundColor: colors.PRIMARY_ACTIONABLE
    }
  },
  unCheckedContainer: container,
  checkedIcon: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  uncheckIcon: {
    color: colors.PRIMARY_DISABLED_BG_TEXT
  },
  checkedContainerDisabled: {
    ...container, ...{
      backgroundColor: colors.PRIMARY_ACTIONABLE_DISABLED,
      borderColor: colors.PRIMARY_ACTIONABLE_DISABLED
    }
  },
  unCheckedContainerDisabled: {
    ...container, ...{
      backgroundColor: colors.SECONDARY_TCONVERGENCE_BACKGROUND
    }
  }
};
