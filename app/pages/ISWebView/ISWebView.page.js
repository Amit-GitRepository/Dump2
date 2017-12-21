import ISWebView from '../../components/ISWebView/ISWebView.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class ISWebViewPage extends Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      title: state.params.title
    };
  };

  render () {
    const {navigation} = this.props;
    return (
      <ISWebView navigation={navigation} headers={navigation.state.params.headers} url={navigation.state.params.url} />
    );
  }
}

ISWebViewPage.propTypes = {
  navigation: PropTypes.object
};

export default ISWebViewPage;
