import {colors, fonts} from '../../../../../themes/constants.styles';

export default {
  container: {
    height: 21,
    width: 40,
    position: 'absolute',
    bottom: 0,
    transform: [{translateX: -16}] // 32/2 :: 32 is the size of left icon
  },
  closedContainer: {
    borderWidth: 0
  },
  accordionStyle: {
    height: 21,
    width: 40
  },
  circularContainer: {
    height: 20,
    width: 40,
    marginBottom: -1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
    borderColor: colors.FRENCH_GREY,
    backgroundColor: colors.GRAY_NURSE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  collapsedArrowStyle: {
    transform: [{rotate: '180deg'}]
  },
  arrowStyle: {
    color: colors.PRIMARY_ACTIONABLE,
    fontSize: fonts.FONT_SIZE_SMALL
  }
};
