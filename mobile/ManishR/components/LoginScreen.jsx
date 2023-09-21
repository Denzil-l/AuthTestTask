import { Text, Button } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from 'styled-components/native'
import logo from '../assets/logo2.png'
import { useRef, useState, useEffect } from "react";
import { HoneyPotInput } from "./HoneyPot";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export const LoginScreen = ({ navigation, route }) => {

    const [notification, setNotification] = useState('')

    const [inputValue, setInputValue] = useState('')
    const [honeyPot, setHoneyPot] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')
    const [digits, setDigits] = useState(['', '', '', '', '', '', '', '', '', ''])

    const handleChange = (text) => {
        console.log(text)
        console.log(typeof (text))
        if (/^[0-9]{0,10}$/.test(text)) {
            const data = text.split('')
            const array = []
            for (let i = 0; i < 10; i++) {
                if (data[i]) {
                    array.push(data[i])
                } else {
                    array.push['']
                }

            }
            setInputValue(text)

            setDigits(array)
        }

    }
    const handleSubmit = async () => {
        if (/^[0-9]{10}$/.test(digits.join(''))) {
            if (/^05\d{8}$/.test(digits.join(''))) {
                try {
                    const response = await axios.post('https://servermanishr.onrender.com/auth/login', {
                        honeyPot: honeyPot,
                        phone_number: inputValue,
                        captchaToken: captchaToken
                    })
                    if (response.status === 200 && response.data.message === 'welcome') {
                        navigation.navigate('Home')
                    } else if (response.status === 200 && response.data.message === 'you loged in') {
                        try {
                            await AsyncStorage.setItem('jwtToken', response.data.token);
                            navigation.navigate('Final')

                        } catch (error) {
                            console.log(error)
                        }
                    }
                } catch (error) {
                    console.log(error)
                    if (error.response.status === 400) {
                        console.log('status 400')
                        setNotification('משתמש לא קיים')
                    }
                }


            } else {
                setNotification('המספר שלך חייב להתחיל ב-05')
            }
        } else {
            setNotification('יש למלא את השדה הזה')
        }





    }



    return (
        <Wrapper>
            <LogoImage source={logo} />
            <HoneyPotInput type={'text'} value={honeyPot} setSomething={setHoneyPot} />
            <Label>הכניס/י את מס׳ הטלפון שלך</Label>
            <BeautifulInput >
                <Cell><Digit>{digits[0]}</Digit></Cell>
                <Cell><Digit>{digits[1]}</Digit></Cell>
                <Cell><Digit>{digits[2]}</Digit></Cell>
                <SpecialCell><HR>-</HR></SpecialCell>
                <Cell><Digit>{digits[3]}</Digit></Cell>
                <Cell><Digit>{digits[4]}</Digit></Cell>
                <Cell><Digit>{digits[5]}</Digit></Cell>
                <Cell><Digit>{digits[6]}</Digit></Cell>
                <Cell><Digit>{digits[7]}</Digit></Cell>
                <Cell><Digit>{digits[8]}</Digit></Cell>
                <Cell><Digit>{digits[9]}</Digit></Cell>
                <RealInput autoCompleteType="off"
                    onChangeText={handleChange}
                    value={inputValue}

                    type='text'
                />

            </BeautifulInput>
            <InputError>
                <Errorblock1><ErrorblockText>{notification ? '*' : ''}</ErrorblockText></Errorblock1>
                <Errorblock2><ErrorblockText>{notification}</ErrorblockText></Errorblock2>
            </InputError>
            <SubmitButton onPress={handleSubmit}><SubmitButtonText>אישור</SubmitButtonText></SubmitButton>

        </Wrapper >
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
const SubmitButton = styled.TouchableOpacity`
    border-radius: 30px;
    margin-top: 50px;
    padding: 14px 0px;
    width: 55%;
    background: #39B54A;
`
const SubmitButtonText = styled.Text`
 text-align: center;
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`
const Label = styled.Text`
    margin-top: 81px;
    width: 100%;
    text-align: right;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`
const BeautifulInput = styled.TouchableOpacity`
position: relative;
margin-top: 50px;
padding: 5px;
width: 100%;
height: 50px;
flex-direction: row;
align-items: center;
justify-content: space-between;

`
const Cell = styled.View`
    width: 8%;
    height: 100%;
    border-bottom-color: black;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    align-items: center;
    justify-content: center;
    margin: 0 1px;
`
const SpecialCell = styled.View`
    width: 7%;
    align-items: center;
    justify-content: center;

`
const HR = styled.Text`

    font-weight: 800;
    font-size: 28px;
`
const Digit = styled.Text`

    font-weight: 600;
    font-size: 22px;
`
const RealInput = styled.TextInput`
    position: absolute;
    width: 200%;
    height: 100%;
    top: 0;
    left: -100%;
    opacity: 0;
    
`









const InputError = styled.View`
    width: 100%;
    margin-top: 6px;
    flex-direction: row-reverse;

`
const Errorblock1 = styled.View`
    width: 3%;
    height: 100%;
`
const Errorblock2 = styled.View`
     width: 97%;
    height: 100%;
`
const ErrorblockText = styled.Text`
text-align: right;
`