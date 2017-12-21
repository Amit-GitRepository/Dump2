import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderWidth: 0,
    flexDirection: 'row',
    borderRadius: 4
  },
  progressFill: {
    paddingVertical: 5,
    borderRadius: 4
  },
  progressEmpty: {
    paddingVertical: 5,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  }
});
