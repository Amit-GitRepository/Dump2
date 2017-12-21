import {colors, fonts} from './constants.styles';

// All sytles common across the app goes here

export const container = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.GRAY_NURSE
};

export const contentContainerStyle = {
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'space-between'
};

export const errorTextStyle = {
  color: colors.PRIMARY_ACTIONABLE,
  textAlign: 'center',
  paddingVertical: 5,
  paddingBottom: 10,
  fontSize: fonts.FONT_SIZE_SMALL
};

export const appContainerStyle = {
  flexGrow: 1
};

export const statusBarStyle = {
  backgroundColor: colors.TRANSPARENT,
  barStyle: 'dark-content'
};

export const shadowActiveStyle = {
  shadowColor: colors.SHADOW,
  shadowOpacity: 0.3,
  shadowRadius: 1,
  shadowOffset: {
    width: 1,
    height: 2
  }
};

export const shadowInactiveStyle = {
  shadowColor: colors.SHADOW,
  shadowOpacity: 0.4,
  shadowRadius: 1,
  shadowOffset: {
    width: 1,
    height: 2
  }
};

export const shadowScattered = {
  shadowColor: colors.SHADOW,
  shadowOpacity: 0.5,
  shadowRadius: 2,
  shadowOffset: {
    width: 1,
    height: 2
  }
};
