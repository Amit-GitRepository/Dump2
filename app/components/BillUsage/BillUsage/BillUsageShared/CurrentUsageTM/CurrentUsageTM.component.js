import HotExtraPackageCard from '../HotExtraPackageCard/HotExtraPackageCard.component';
import Proptypes from 'prop-types';
import React, {Component} from 'react';
import styles from './CurrentUsageTM.style';
import {Button, Card, CircularProgress, Icon, ISText, List, Modal, Touchable} from '../../../../Shared';
import {bytesToSize} from '../../../../../utils/common.util';
import {colors} from '../../../../../themes/constants.styles';
import {isEmpty, noop} from 'lodash';
import {translate} from '../../../../../language/i18n/helper';
import {View} from 'react-native';

class CurrentUsageTM extends Component {

  state = {
    isVisible: false,
    modalData: [],
    modalHeaderTextKey: ''
  };

  toggleModal = (modalData = [], modalHeaderTextKey = '') => () => {
    const {isVisible} = this.state;
    this.setState({isVisible: !isVisible, modalData, modalHeaderTextKey});
  }

  getConsumedDataContent = (value, titleText, initialValue, unit, isPrepaid, isUnlimited) => {
    const footerText = isPrepaid ? unit : `${translate('BILLS_USAGE_OF')} ${initialValue} ${unit}`;
    const displayValue = (isUnlimited) ? translate('BILLS_USAGE_UNLIMITED') : value;
    return (
      <View style={ isPrepaid ? [styles.detailsContainer, styles.prepaidContainer] : styles.detailsContainer}>
        <ISText type='BOLD' style={styles.infoTopText}>{titleText}</ISText>
        <ISText style={styles.infoSubText}>{`(${translate('BILLS_USAGE_MAIN')} + ${translate('BILLS_USAGE_EXTRA')})`}</ISText>
        <ISText type='MEDIUM' style={[styles.valueText, styles.circularProgressFillStyle]}>{displayValue}</ISText>
        { isUnlimited ? null : <ISText style={styles.infoBottomText}>{footerText}</ISText>}
      </View>
    );
  }

  render () {
    const {hotExtraPackage, sharedNumbers, multiSimNumbers, navigateToBuyExtraPackage, isPrepaid, usageData} = this.props;
    const {isVisible, modalData, modalHeaderTextKey} = this.state;

    const {aggregatedTotalVoiceQuota, aggregatedRemainingVoiceQuota, isUnlimitedVoice, aggregatedTotalDataQuota,
      totalDataQuotaUnit, aggregatedRemainingDataQuota, isUnlimitedData, totalRemainingDataUnit} = usageData.AGGREGATED_QUOTA;

    let dataValue = aggregatedRemainingDataQuota;
    let dataUnit = totalRemainingDataUnit;
    if (!isPrepaid) { // For prepaid: Show remaining and for postpaid show used
      if (totalDataQuotaUnit !== totalRemainingDataUnit) { // Convert Remaining value to the same unit as total value
        const remainingData = bytesToSize(dataValue, totalRemainingDataUnit, totalDataQuotaUnit);
        dataValue = remainingData.value;
        dataUnit = totalDataQuotaUnit;
      }
      dataValue = (aggregatedTotalDataQuota - dataValue).toFixed(1);
    }

    const unlimitedData = isUnlimitedData && !aggregatedRemainingDataQuota && !aggregatedTotalDataQuota; // Display data value only if no total value
    const voiceValue = (isPrepaid) ? aggregatedRemainingVoiceQuota : aggregatedTotalVoiceQuota - aggregatedRemainingVoiceQuota;
    const voicePercentageConsumed = isUnlimitedVoice || isPrepaid ? 0 : (voiceValue * 100) / aggregatedTotalVoiceQuota;
    const dataPercentageConsumed = unlimitedData || isPrepaid ? 0 : (dataValue * 100) / aggregatedTotalDataQuota;

    const hasData = aggregatedTotalDataQuota || unlimitedData;
    const hasVoice = aggregatedTotalVoiceQuota || isUnlimitedVoice;
    const hasPackages = hasData || hasVoice;
    const hasOneOfDataVoice = hasData && !hasVoice || !hasData && hasVoice;
    const hasHotExtraPackage = !isEmpty(hotExtraPackage);
    const hasMultiSimPlan = !isEmpty(multiSimNumbers);
    const hasSharedPlan = !isEmpty(sharedNumbers);
    let hotExtraPackageCaretPosition = null; // means dont show caret

    if (hasHotExtraPackage && hasPackages) {
      if (hasOneOfDataVoice) {
        hotExtraPackageCaretPosition = 'CENTER';
      } else {
        switch (hotExtraPackage.planType) {
        case 'voice': { hotExtraPackageCaretPosition = 'LEFT'; break; }
        case 'data': { hotExtraPackageCaretPosition = 'RIGHT'; break; }
        }
      }
    }
    return (
      <View style={styles.currentUsageContainer}>
        { hasMultiSimPlan ?
          <Touchable onPress={this.toggleModal(multiSimNumbers, 'BILLS_USAGE_MULTI_SIM')}>
            <View style={styles.multiSimContainer}>
              <ISText type='BOLD' style={styles.multiSimText}>{`${translate('BILLS_USAGE_MULTI_SIM')} (${multiSimNumbers.length})`}</ISText>
            </View>
          </Touchable> : null
        }
        <View style={styles.currentUsageWrapper}>
          {
            hasPackages ?
              <View style={styles.currentUsageSubContainer}>
                {
                  hasVoice ?
                    isUnlimitedVoice || isPrepaid ?
                      this.getConsumedDataContent(voiceValue, translate('BILLS_USAGE_TALK'), aggregatedTotalVoiceQuota, translate('BILLS_USAGE_MIN'), isPrepaid, isUnlimitedVoice) :
                      <CircularProgress fill={voicePercentageConsumed} tintColor={colors.SECONDARY_TMOVE}>
                        {this.getConsumedDataContent(voiceValue, translate('BILLS_USAGE_TALK'), aggregatedTotalVoiceQuota, translate('BILLS_USAGE_MIN'), isPrepaid, isUnlimitedVoice)}
                      </CircularProgress>
                    : null
                }

                {hasVoice && hasData ? <View style={styles.separator} /> : null}

                {
                  hasData ?
                    unlimitedData || isPrepaid ?
                      this.getConsumedDataContent(dataValue, translate('BILLS_USAGE_DATA'), aggregatedTotalDataQuota, dataUnit, isPrepaid, unlimitedData) :
                      <CircularProgress fill={dataPercentageConsumed} tintColor={colors.SECONDARY_TMOVE}>
                        {this.getConsumedDataContent(dataValue, translate('BILLS_USAGE_DATA'), aggregatedTotalDataQuota, dataUnit, isPrepaid, unlimitedData)}
                      </CircularProgress>
                    : null
                }

              </View> : null
          }

          {
            hasHotExtraPackage ?
              <HotExtraPackageCard header={translate('BILLS_USAGE__HEP_TITLE')} caretPosition={hotExtraPackageCaretPosition} planValue={hotExtraPackage.planValue} planDescription={hotExtraPackage.planDescription} noOfDays={hotExtraPackage.days} dayDescription={translate('BILLS_USAGE__HEP_DAYS')} cost={hotExtraPackage.cost} costDescription={translate('BILLS_USAGE__HEP_COST_UNIT')} buttonText={translate('BILLS_USAGE__HEP_PAY_BUTTON')} />
              : null
          }
        </View>
        <Button type='inline' textType='BOLD' text={translate('BILLS_USAGE_SEE_OTHER_PACKAGE')} style={styles.otherButton} textStyle={styles.otherButtonText} onPress={navigateToBuyExtraPackage}/>

        {
          hasSharedPlan ?
            <Touchable style={styles.sharedTouchableWrapper} onPress={this.toggleModal(sharedNumbers, 'BILLS_USAGE_SHARED_NUMBER')}>
              <View style={styles.sharedNumbersContainer}>
                <ISText type='BOLD' style={styles.sharedNumbersDescription}>{translate('BILLS_USAGE_SHARED_NUMBER')}</ISText>
                <View style={styles.sharedNoIconWrap}><ISText type='BOLD' style={styles.sharedNumber}>{sharedNumbers.length}</ISText><Icon name='chevron-down' size={15} style={styles.sharedNumberIcon}/>
                </View>
              </View>
            </Touchable> : null
        }
        <Modal isVisible={isVisible} animationIn={'zoomIn'} animationOut={'zoomOut'}
          animationInTiming={1} backdropTransitionInTiming={1} backdropTransitionOutTiming={1}
          animationOutTiming={1} onBackdropPress={this.hideModal}>
          <Card header={translate(modalHeaderTextKey)} containerStyles={styles.modalContainer}>
            <List data={modalData} alignListItemsCenter onPress={this.selectItem} arrowVisibility={false}/>
          </Card>
          <Button onPress={this.toggleModal()} text={translate('STORE_LOCATOR__CANCEL')} style={styles.cancelButton}/>
        </Modal>
      </View>
    );
  }
}

CurrentUsageTM.defaultProps = {
  usageData: {
    AGGREGATED_QUOTA: {}
  },
  hotExtraPackage: null,
  navigateToBuyExtraPackage: noop,
  sharedNumbers: null,
  multiSimNumbers: null,
  isPrepaid: false
};

CurrentUsageTM.propTypes = {
  usageData: Proptypes.shape({
    MAIN_PACKAGE: Proptypes.array,
    EXTRA_PACKAGE: Proptypes.array
  }),
  hotExtraPackage: Proptypes.object,
  isPrepaid: Proptypes.bool,
  navigateToBuyExtraPackage: Proptypes.func,
  multiSimNumbers: Proptypes.array,
  sharedNumbers: Proptypes.array
};

export default CurrentUsageTM;
