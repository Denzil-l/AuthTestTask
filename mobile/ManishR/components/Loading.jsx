import styled from "styled-components/native"
import { View, Text, Animated, Easing, Image } from 'react-native';
import { useState, useEffect } from "react";
import logo from '../assets/MNSR.png'


export const Loading = () => {
    const [scale] = useState(new Animated.Value(1));
    const pulse = () => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.3, // Увеличиваем масштаб до 1.2
                duration: 1800,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(scale, {
                toValue: 1, // Возвращаем масштаб к исходному
                duration: 1800,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
        ]).start(() => pulse()); // Рекурсивно вызываем анимацию для создания пульсации
    };

    useEffect(() => {
        pulse(); // Запускаем анимацию при монтировании компонента
    }, []);


    return (
        <Wrapper>
            <Animated.View
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'transparent',
                    transform: [{ scale: scale }],
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <LogoImage
                    source={logo}

                />
            </Animated.View>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

`
const LogoImage = styled.Image`
    width: 100%;
    height: 100%;
    object-fit: contain;
`
const LogoText = styled.Image`
    width: 50%;
    object-fit: contain;
`