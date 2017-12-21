import {colors, fonts} from '../../../themes/constants.styles';

export default {
  container: {
    padding: 15,
    flex: 1
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY_BG_SEPARATOR
  },
  serviceInfoContainer: {
    marginBottom: 5
  },
  serviceNumber: {
    fontSize: fonts.FONT_SIZE_LARGE
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
  addressContainer: {
    marginTop: 5
  },
  addressHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addressHeader: {
    fontSize: fonts.FONT_SIZE_MEDIUM,
    paddingTop: 4
  },
  address: {
    fontSize: fonts.FONT_SIZE_NORMAL
  }
};
