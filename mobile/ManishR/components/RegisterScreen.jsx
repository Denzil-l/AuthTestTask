import { Text, Button, TextInput, Alert, FlatList, ScrollView, StyleSheet } from "react-native"
import logo from '../assets/MNSR.png'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from 'styled-components/native'
import { useState, useEffect } from "react";
import { InputWithLabel } from "./InputWithLabel";
import { AntDesign } from '@expo/vector-icons';
import { HoneyPotInput } from "./HoneyPot";
import axios from "axios";


export const RegisterScreen = ({ navigation, route }) => {
    const [bigArrayWithInputs, setBigArrayWithInputs] = useState(
        [
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,
            <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />,

        ]
    )


    const [modalWindow, setModalWindow] = useState('none');
    const [captchaWindow, setCaptchaWindow] = useState('none');
    const [waitingTime, setWaitingTime] = useState(0)
    const [tryCount, setTryCount] = useState(0)



    const [honeyPot, setHoneyPot] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumbaer] = useState('')
    const [password, setPassword] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')

    const [nameError, setNameError] = useState()
    const [usernameError, setUsernameError] = useState()
    const [emailError, setEmailError] = useState()
    const [phoneNumberError, setPhoneNumberError] = useState()
    const [passwordError, setPasswordError] = useState()

    const RequestToServerTest = async () => {
        const response = await axios.get('https://servermanishr.onrender.com/')
        console.log('-----------------------------------------------')
        console.log(response.data)
        if (response.status === 200) {
            Alert.alert('Success', `${response.data.message}`)
        }
    }

    const RequestToServer = async () => {
        try {
            const response = await axios.post('https://servermanishr.onrender.com/auth/register', {
                honeyPot: honeyPot,
                name: name,
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                captchaToken: captchaToken
            });
            if (response.status === 201) {
                console.log('-----------------------------------------------')

                Alert.alert('Success', 'You were registered', [
                    {
                        text: 'OK',
                        onPress: () => { navigation.navigate('Home') }
                    }
                ]);
            }
        } catch (error) {
            if (error.response.status == 409) {
                error.response.data.message == 'username' ? setUsernameError('This username is taken') : error.response.data.message == 'email' ? setEmailError('This email is taken') : error.response.data.message == 'phone' ? setPhoneNumberError('This phone number is taken') : null
            } else {
                console.log('-----------------------------------------------')
                Alert.alert('Error', 'Server Error')

                console.log('Server Error')
                console.log(error);

            }
        }
    }
    const ErrorSearch = (error, setError, ErrorRegExp, ErrorMessage) => {
        if (error == '') {
            setError('emptyError')
            setTryCount(tryCount + 1)
            return false
        } else if (!ErrorRegExp.test(error)) {
            setError(ErrorMessage)
            setTryCount(tryCount + 1)
            return false
        } else {
            setError('')
            return true
        }

    }
    const handleClick = async (event) => {

        console.log(tryCount)
        if (waitingTime > 3) {
            //We check all inputs for errors:
            const nameCheck = ErrorSearch(name, setNameError, /^[a-zA-Z\s]{0,60}$/, "השם חייב להכיל рק тווים לטיניים")
            const usernameCheck = ErrorSearch(username, setUsernameError, /^[a-zA-Z]{0,30}$/, "השם חייב להכיל рק тווים לטיניים")
            const emailCheck = ErrorSearch(email, setEmailError, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "האימייל שלך לא тואם לפורמט")
            const phoneNumberCheck = ErrorSearch(phoneNumber, setPhoneNumberError, /^05\d{8}$/, "הטלפון שלך לא тואם לפורמט")
            const passwordCheck = ErrorSearch(password, setPasswordError, /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "הסיסמה חייבת להכיל 8 תווים ולפחות מספר אחד ולפחות אות אחת")
            //If we don't have errors, try to send data:
            if (nameCheck && usernameCheck && emailCheck && phoneNumberCheck && passwordCheck) {
                RequestToServer()

            }
            //if user try to send form before 3000ms, he just cant
            //if user try to send dorm after 8 * 60 * 1000ms, page is refreshed 
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setWaitingTime(waitingTime + 1)
        }, 1000)
        return () => {
            clearInterval(timer);


        };
    }, [waitingTime])
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Wrapper>
                <NavBar>
                    <ButtonBlock onPress={() => navigation.navigate('Home')}>
                        <AntDesign name="right" size={24} color="black" />
                    </ButtonBlock>
                    <LogoBlock>
                        <LogoImage source={logo} />


                    </LogoBlock>
                    <EmptyBlock></EmptyBlock>

                </NavBar>
                <Form>
                    <HoneyPotInput type={'text'} value={honeyPot} setSomething={setHoneyPot} />

                    <InputWithLabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />

                    <InputWithLabel name={'בחר/י שם משתמש'} type={'text'} value={username} placeholder={'ישראלה'} setSomething={setUsername} regexp={/^[a-zA-Z]{0,25}$/} width={'75%'} error={usernameError} />

                    <InputWithLabel name={'מה המייל שלך?'} type={'email'} value={email} placeholder={'israela123@example.com'} setSomething={setEmail} regexp={/^.*$/} width={'90%'} error={emailError} />

                    <InputWithLabel name={'מה הקוד שקיבלת?'} type={'text'} value={phoneNumber} placeholder={'055-1234567'} setSomething={setPhoneNumbaer} regexp={/^\d{0,10}$/} width={'35%'} error={phoneNumberError} />

                    <InputWithLabel name={'סיסמה'} type={'password'} value={password} placeholder={''} setSomething={setPassword} regexp={/^.*$/} width={'90%'} error={passwordError} />


                    <SubmitButton onPress={() => handleClick()}><SubmitButtonText>אישור</SubmitButtonText></SubmitButton>

                </Form>
            </Wrapper>
        </ScrollView>
    )
}

const Wrapper = styled.View`
    padding-top: 50px;
    flex: 1;
    background: rgb(240,247,247);
    align-items: center;

`
const NavBar = styled.View`
    width: 100%;
    height: 15%;
    flex-direction: row-reverse;
`
const EmptyBlock = styled.View`
    height: 100%;
    width: 33.3%;
`
const LogoBlock = styled.View`
    height: 100%;
    width: 33.3%;
    align-items: center;
    justify-content: center;
`
const ButtonBlock = styled.TouchableOpacity`
    height: 100%;
    width: 33.3%;
    flex-direction: row-reverse;
    padding-left: 10px;
`
const SubmitButton = styled.TouchableOpacity`
        border-radius: 30px;
    padding: 14px 0px;
    width: 80%;
    background: #39B54A;
`
const SubmitButtonText = styled.Text`
 text-align: center;
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
`

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Разрешить ScrollView занимать всю доступную высоту
        // padding: 36, // Отступы от краев
        paddingBottom: 150,
    }
})

const LogoImage = styled.Image`
    width: 80%;
    height: 80%;
    object-fit: contain;
`
const Form = styled.View`
    position: relative;
    background: rgb(240,247,247);

    margin-top: 50px;
    padding: 10px;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

`