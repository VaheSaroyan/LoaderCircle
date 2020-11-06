import React from 'react';
import {Shape, Path} from '@react-native-community/art';

export default class Circle extends React.PureComponent {
  render() {
    const {radius} = this.props;

    const path = Path()
      .moveTo(0, -radius / 2)
      .arc(0, radius, 1)
      .arc(0, -radius, 1)
      .close();

    return <Shape {...this.props} d={path} />;
  }
}
