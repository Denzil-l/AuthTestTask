
import styled from 'styled-components/native'
import { Text } from "react-native";
import logo from '../assets/MNSR.png'
import logotext from '../assets/TextLogo.png'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



export const HomeScreen = ({ navigation, route }) => {
    return (
        <Wrapper>
            <LogoImage source={logo} />
            <LogoText source={logotext} />
            <RegisterButton onPress={() => navigation.navigate('Register')}>
                <RegisterText>הרשמה</RegisterText>
            </RegisterButton>
            <LoginButton onPress={() => navigation.navigate('Login')}>
                <LoginText>יש לי כבר חשבון</LoginText>
            </LoginButton>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    background: rgb(240,247,247);
    align-items: center;

`
const LogoImage = styled.Image`
    width: 70%;
    margin-top: 216px;
    object-fit: contain;
`
const LogoText = styled.Image`
    margin-top: 24px;
    width: 50%;
    object-fit: contain;
`
const RegisterButton = styled.TouchableOpacity`
    border-radius: 30px;
    padding: 14px 0px;
    width: 80%;
    margin-top: 90px;
    background: #39B54A;
`
const RegisterText = styled.Text`
    text-align: center;
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`
const LoginButton = styled.TouchableOpacity`
    border-radius: 30px;
    padding: 14px 0px;
    border: 2px solid #39B54A;
    width: 80%;
    margin-top: 24px;
    background: transparent;
`
const LoginText = styled.Text`
    text-align: center;
    color: #39B54A;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`