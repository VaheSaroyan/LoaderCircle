import React from 'react';
import {
  Animated,
  Modal,
  Text,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Surface} from '@react-native-community/art';
import AnimatedCircle from './AnimatedCircle';

const Loader = ({
  size,
  dotRadius,
  color = '#47caad',
  visible,
  background,
  text,
}) => {
  const [state] = React.useState({
    opacities: [
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
    ],
  });
  const [unmounted, setUnmounted] = React.useState(false);
  const eachDegree = 360 / state.opacities.length;
  const timers = [];

  React.useEffect(() => {
    state.opacities.forEach((item, i) => {
      const id = setTimeout(() => {
        _animation(i);
      }, i * 150);
      timers.push(id);
    });
    return () => {
      setUnmounted(true);
      timers.forEach((id) => {
        clearTimeout(id);
      });
    };
  }, [visible]);

  const _animation = (i) => {
    Animated.sequence([
      Animated.timing(state.opacities[i], {
        toValue: 0.1,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(state.opacities[i], {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
    ]).start(() => {
      !unmounted && _animation(i);
    });
  };

  const {opacities} = state;

  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        {background && (
          <ImageBackground source={background} style={styles.backgroundImage} />
        )}
        <Surface width={size + dotRadius} height={size + dotRadius}>
          {opacities.map((item, i) => {
            let radian = (i * eachDegree * Math.PI) / 180;
            let x =
              Math.round((size / 2) * Math.cos(radian)) +
              size / 2 +
              dotRadius / 2;
            let y =
              Math.round((size / 2) * Math.sin(radian)) +
              size / 2 +
              dotRadius / 2;
            return (
              <AnimatedCircle
                key={i}
                radius={dotRadius}
                fill={color}
                x={x}
                y={y}
                opacity={opacities[i]}
              />
            );
          })}
        </Surface>
        <Text style={{position: 'absolute', color}}>{text}</Text>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
export default Loader;
