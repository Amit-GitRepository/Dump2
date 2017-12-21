import {colors} from '../../../../../themes/constants.styles';

export default {
  container: {
    alignSelf: 'stretch',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.PRIMARY_DISABLED_BG_TEXT
  },
  titleWrapper: {
    borderColor: colors.PRIMARY_SUBTEXT,
    backgroundColor: colors.PRIMARY_SUBTEXT,
    padding: 5,
    marginHorizontal: -1
  },
  title: {
    textAlign: 'center',
    color: colors.PRIMARY_BG_TEXT_CONTRAST
  },
  iconStyle: {
    transform: [
      {
        rotateX: '180deg'
      }, {
        translateY: -10
      }
    ],
    position: 'absolute',
    top: -25,
    backgroundColor: colors.TRANSPARENT
  },
  content: {
    flexDirection: 'row-reverse',
    alignSelf: 'stretch',
    paddingHorizontal: 10
  },
  contentWrapper: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  payWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 10
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  data: {
    borderColor: colors.TRANSPARENT,
    borderRightColor: colors.PRIMARY_BG_SEPARATOR,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5
  },
  leftText: {
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    alignSelf: 'flex-start'
  },
  centerText: {
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    alignSelf: 'center'
  },
  rightText: {
    color: colors.PRIMARY_TEXT_TAB_LABEL,
    alignSelf: 'flex-end'
  },
  textGrey: {
    color: colors.PRIMARY_SUBTEXT
  },
  buttonText: {
    padding: 0,
    marginTop: -5
  }
};
