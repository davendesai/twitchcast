import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { headShake } from 'react-animations';

const styles = StyleSheet.create({
  headShake: {
    animationName: headShake,
    animationDuration: '1s'
  }
});

export default function makeShaking(Target) {
  class ShakingComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        shouldShake: this.props.shake
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ shouldShake: nextProps.shake });
    }

    render() {
      return (
        <div className={this.state.shouldShake ? css(styles.headShake) : null} >
          <Target { ...this.props } />
        </div>
      );
    }
  }

  ShakingComponent.propTypes = {
    shake: React.PropTypes.bool.isRequired
  }

  return ShakingComponent;
}