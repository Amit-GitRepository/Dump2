import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import styles from './ISHeader.style';
import {colors} from '../../../themes/constants.styles';
import {Header} from 'react-navigation';

const ISHeader = (props) => (
  <LinearGradient colors={[colors.PRIMARY_HEADER_BG_START, colors.PRIMARY_HEADER_BG_END]} style={styles.container}>
    <Header {...props} style={styles.header}/>
  </LinearGradient>
);

export default ISHeader;
