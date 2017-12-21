import noop from 'lodash/noop';
import Proptypes from 'prop-types';
import React from 'react';
import styles from './CurrentUsageCard.style';
import {Banner, ISText, Touchable} from '../../../../Shared';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

const CurrentUsageCard = ({data, bannerSrc, textStyle, onBannerClick}) => (
  <View style={styles.currentUsageContainer}>
    <View style={styles.currentUsageSubContainer}>
      {data.map((usageData, index) => (
        [<View style={styles.usageContainer} key={`usageCard_${index}`}>
          <View style={styles.usageSubContainer}>
            <ISText type='MEDIUM' style={[styles.usageText, textStyle]}>{usageData.usage}</ISText>
            {usageData.unit && <ISText type='BOLD' style={[styles.usageUnitText, textStyle]}>{usageData.unit}</ISText>}
          </View>
          <ISText type='BOLD' style={styles.usageTypeText}>{translate(usageData.type)}</ISText>
        </View>, (index < data.length - 1) ? <View style={styles.seperator} key={`usageCardSeperator_${index}`}/> : null]
      ))}
    </View>
    { bannerSrc && <Touchable onPress={onBannerClick} style={styles.bannerContainer}>
      <Banner source={{uri: bannerSrc}} style={styles.bannerImage}/>
    </Touchable>}
  </View>
);

CurrentUsageCard.defaultProps = {
  data: [],
  textStyle: {},
  onBannerClick: noop
};

CurrentUsageCard.propTypes = {
  data: Proptypes.array,
  bannerSrc: Proptypes.string,
  textStyle: Proptypes.object,
  onBannerClick: Proptypes.func
};

export default CurrentUsageCard;
