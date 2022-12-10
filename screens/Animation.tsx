import React, { useRef, useState } from "react";
import { Animated, Easing,Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 150px;
  height: 150px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function Animation() {
  const [up, setUp] = useState(false);
  const POSITION = useRef(new Animated.ValueXY({x:0, y:250})).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(POSITION, {
      toValue: up ? 250 : -250,
      useNativeDriver: false,
      duration: 1000
    }).start(toggleUp);
  };

  const bgColor = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: [100, 0],
  });

  const rotation = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-360deg", "360deg"],
  });


  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [{ translateY: POSITION.y }, {rotateY  : rotation}],
            borderRadius,
            backgroundColor: bgColor,
          }}
        />
      </Pressable>
    </Container>
  );
}
