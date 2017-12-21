import ComponentWithTabPage from '../../pages/ComponentWithTab/ComponentWithTab.page';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class ComponentWithTab extends Component {
  renderWithTab () {}
  render () {
    return (
      <ComponentWithTabPage scrollEnabled={this.props.scrollEnabled}>
        {this.renderWithTab()}
      </ComponentWithTabPage>
    );
  }
}

ComponentWithTab.defaultProps = {
  scrollEnabled: true
};

ComponentWithTab.propTypes = {
  scrollEnabled: PropTypes.bool
};
export default ComponentWithTab;
