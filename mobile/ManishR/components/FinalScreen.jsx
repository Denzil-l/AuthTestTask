import styled from "styled-components/native"
import icon from '../assets/logo2.png'

export const FinalScreen = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
            navigation.navigate('Home')

        }

    }
    return (
        <Wrapper>
            <LogoImage source={icon} />
            <Title>This page is not ready</Title>
            <LogoutButton>
                <LogoutText onPress={handleLogout}>להתנתק</LogoutText>
            </LogoutButton>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    background: rgb(240,247,247);
    align-items: center;
    padding: 20px;

`
const LogoImage = styled.Image`
    margin-top: 104px;
    width: 45%;
    height: 25%;
    object-fit: contain;
`
const Title = styled.Text`
text-align: center;
font-size: 20px;
letter-spacing: 2px;

`
const LogoutButton = styled.TouchableOpacity`
border-radius: 30px;
padding: 14px 0px;
border: 2px solid #39B54A;
width: 80%;
margin-top: 24px;
background: transparent;
`
const LogoutText = styled.Text`
text-align: center;
color: #39B54A;
font-size: 18px;
font-style: normal;
font-weight: 600;
`