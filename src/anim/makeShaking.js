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
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        startShaking: this.props.shouldShake
      }
    }

    render() {
      return (
        <Target { ...this.props }
                frameClass={ this.state.startShaking ? css(styles.headShake) : null } />
      );
    }
  }
}