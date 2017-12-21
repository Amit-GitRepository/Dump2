import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    padding: 15,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.PRIMARY_BG_SEPARATOR
  },
  serviceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  serviceNumber: {
    fontSize: fonts.FONT_SIZE_MEDIUM
  },
  trueMoveHPostpaid: {
    color: colors.SECONDARY_TMOVE
  },
  trueMoveHPrepaid: {
    color: colors.SECONDARY_TMOVE
  },
  trueOnline: {
    color: colors.SECONDARY_TONLINE
  },
  trueVision: {
    color: colors.SECONDARY_TVISION
  },
  trueConvergence: {
    color: colors.PRIMARY_ACTIONABLE
  },
  checkbox: {
    marginTop: 10,
    marginRight: 5
  },
  ebillOptionContainer: {
    marginTop: 5
  },
  ebillOptionInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ebillOption: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    marginRight: 70
  },
  ebillOptionValue: {
    fontFamily: fonts.FONT_FAMILY_LIGHT,
    fontSize: fonts.FONT_SIZE_NORMAL,
    flex: 1
  },
  error: {
    color: colors.PRIMARY_ACTIONABLE
  }
};
