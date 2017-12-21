import {colors, fonts} from '../../../themes/constants.styles';

export const secondaryStyles = {
  text: {
    color: colors.PRIMARY_TEXT_TAB_LABEL
  },
  icon: {
    color: colors.PRIMARY_ACTIONABLE
  },
  container: {
    backgroundColor: colors.PRIMARY_BG_TEXT_CONTRAST,
    borderColor: colors.PRIMARY_TEXT_TAB_LABEL,
    borderWidth: 1.5
  }
};

export const inlineStyles = {
  text: {
    color: colors.PRIMARY_ACTIONABLE,
    fontSize: fonts.FONT_SIZE_NORMAL
  },
  container: {
    padding: 5,
    borderWidth: 0,
    backgroundColor: colors.TRANSPARENT
  }
};

export const primaryStyles = {
  container: {
    backgroundColor: colors.PRIMARY_ACTIONABLE
  },
  text: {
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  }
};

export const baseStyles = {
  container: {
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 50
  },
  disabled: {
    opacity: 0.7
  },
  wrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    paddingHorizontal: 10,
    fontSize: fonts.FONT_SIZE_LARGE,
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  text: {
    fontSize: fonts.FONT_SIZE_NORMAL
  }
};
