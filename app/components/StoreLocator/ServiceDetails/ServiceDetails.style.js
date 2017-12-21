import {shadowScattered} from '../../../themes/application.styles';

export default {
  container: {
    flex: 1,
    margin: 10
  },
  cardWrapperStyles: {
    marginBottom: -15
  },
  shadowContainer: {
    flex: 1,
    borderRadius: 8,
    ...shadowScattered
  }
};
