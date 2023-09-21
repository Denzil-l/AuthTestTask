import { Text, Button } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from 'styled-components/native'


export const LoginScreen = ({ navigation, route }) => {
    return (
        <Wrapper>
            <Text>Login</Text>
            <Button title="Back" onPress={() => navigation.navigate('Home')}>Back</Button>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    background: rgb(240,247,247);
    justify-content: center;
    align-items: center;

`