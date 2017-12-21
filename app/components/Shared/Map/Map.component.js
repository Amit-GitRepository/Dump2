import Icon from '../Icon/Icon.component';
import isEqual from 'lodash/isEqual';
import mapConfig from '../../../config/map.config';
import MapView from 'react-native-map-markerclustering';
import noop from 'lodash/noop';
import pinLocation from '../../../assets/pinLocation.png';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import shopMarker from '../../../assets/shopMarker.png';
import styles from './Map.style';
import Touchable from '../Touchable/Touchable.component';
import trueShopMapViewTestIDs from '../../../config/testid/trueShopMapViewPage';
import {colors} from '../../../themes/constants.styles';
import {Image, View} from 'react-native';
import {Marker} from 'react-native-maps';

class Map extends Component {

  state = {
    markerId: 1,
    initialRegion: this.props.initialRegion
  }

  componentDidUpdate (prevProps) {
    const {initialRegion} = this.props;
    if (initialRegion !== prevProps.initialRegion) {
      this.map._root.animateToRegion(initialRegion, 500);
    }
  }

  componentWillReceiveProps (nextProps) {
    const {initialRegion} = this.props;
    const {markerId} = this.state;
    if (initialRegion !== nextProps.initialRegion) {
      this.setState({markerId: markerId + 1});
    }
  }

  shouldComponentUpdate (nextProps) {
    if (isEqual(nextProps, this.props)) {
      return false;
    }
    return true;
  }

  addMarker = (markerList) => markerList.map((store, index) => {
    const storeName = store.name[this.props.language] || store.name['en'];
    return (<Marker key={index} coordinate={store} title={storeName} onCalloutPress={this.props.onCalloutPress(store)}>
      <Image
        style={styles.marker}
        source={shopMarker}
      />
    </Marker>);
  })

  showCurrentLocation = () => {
    const {currentLocation, initialRegion, onPressCurrLocation} = this.props;
    this.map._root.animateToRegion(currentLocation ? currentLocation : initialRegion, 500);
    onPressCurrLocation();
  }

  setRef = (map) => {
    this.map = map;
  }

  render () {
    const {markerList, currentLocation} = this.props;
    const {markerId, initialRegion} = this.state;
    return (
      <View style={styles.container}>
        <MapView style={styles.map} ref={this.setRef} region={initialRegion}
          clusterColor={colors.MAPCLUSTER} clusterTextColor={colors.PRIMARY_BG_TEXT_CONTRAST}
          clusterBorderColor={colors.PRIMARY_BG_TEXT_CONTRAST}>
          {currentLocation
            ? <Marker key={`currentMarker_${markerId}`} coordinate={currentLocation} disableClustering={true}>
              <Image
                style={styles.marker}
                source={pinLocation}
              />
            </Marker>
            : null}
          {markerList ? this.addMarker(markerList) : null}
        </MapView>
        <View style={styles.buttonList}>
          <View style={styles.buttonWrapper} elevation={4}><Touchable onPress={this.props.onSearchPress}>
            <Icon name='map-search' style={styles.button} accessibilityLabel={trueShopMapViewTestIDs.ICON__SEARCHSTORE} testID={trueShopMapViewTestIDs.ICON__SEARCHSTORE}/>
          </Touchable>
          </View>
          {currentLocation
            ? <View style={styles.buttonWrapper} elevation={4}><Touchable onPress={this.showCurrentLocation}>
              <Icon name='current-position' style={styles.button} accessibilityLabel={trueShopMapViewTestIDs.ICON__GOTOCURRENTLOCATION} testID={trueShopMapViewTestIDs.ICON__GOTOCURRENTLOCATION}/>
            </Touchable>
            </View>
            : null}
          {/* The remark is currently commented out as clustering of markers is still not decided */}
          {/* <Touchable style={styles.buttonWrapper} onPress={null}>
            <Icon name='remark' style={styles.button}/>
          </Touchable> */}
        </View>
      </View>
    );
  }
}

Map.defaultProps = {
  markerList: [],
  initialRegion: mapConfig.initialRegion,
  currentLocation: null,
  onPressCurrLocation: noop,
  onCalloutPress: noop,
  onSearchPress: noop
};

Map.propTypes = {
  markerList: PropTypes.array,
  initialRegion: PropTypes.object,
  currentLocation: PropTypes.object,
  onPressCurrLocation: PropTypes.func,
  onCalloutPress: PropTypes.func,
  onSearchPress: PropTypes.func,
  language: PropTypes.string
};

export default Map;
