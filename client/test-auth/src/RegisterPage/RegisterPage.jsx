import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './RegisterPage.css'

import { InputWithlabel } from '../InputWithLabel/InputWithLabel'
import { BackButton } from '../BackButton/BackButton'
import { ModalWindow } from '../ModalWindow/ModalWindow'
import { HoneyPotInput } from '../HoneyPotInput/HoneyPotInput'
import { RecaptchaWindow } from '../RecaptchaWindow/RecaptchaWindow'

import { Verify } from '../VerifyToken'
import { useAuth } from '../AuthContext/AuthContext'
export const RegisterPage = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth()


    useEffect(() => {

        Verify(isAuthenticated, setIsAuthenticated)
        console.log('я срабатываю только при первом рендере в app.jsx')
    }, [])


    const navigate = useNavigate()
    const [seconds, setSeconds] = useState(0);


    const [modalWindow, setModalWindow] = useState('none');
    const [captchaWindow, setCaptchaWindow] = useState('none');
    const [waitingTime, setWaitingTime] = useState(0)
    const [tryCount, setTryCount] = useState(0)

    //Data states
    const [honeyPot, setHoneyPot] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumbaer] = useState('')
    const [password, setPassword] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')
    // const allData = [name, username, email, phoneNumber, password]

    //Error states

    const [nameError, setNameError] = useState()
    const [usernameError, setUsernameError] = useState()
    const [emailError, setEmailError] = useState()
    const [phoneNumberError, setPhoneNumberError] = useState()
    const [passwordError, setPasswordError] = useState()

    // const allError = [[nameError, setNameError], [usernameError, setUsernameError], [emailError, setEmailError], [phoneNumberError, setPhoneNumberError], [passwordError, setPasswordError]]

    //FORM functions:

    const RequestToServer = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/register', {
                honeyPot: honeyPot,
                name: name,
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                captchaToken: captchaToken
            });
            console.log(response);
            if (response.status === 201) {
                setModalWindow('flex')
            }
        } catch (error) {
            if (error.response.status == 409) {
                error.response.data.message == 'username' ? setUsernameError('This username is taken') : error.response.data.message == 'email' ? setEmailError('This email is taken') : error.response.data.message == 'phone' ? setPhoneNumberError('This phone number is taken') : null
                setCaptchaToken('')
            } else {
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
        event.preventDefault();
        console.log(tryCount)
        if (waitingTime > 3 && waitingTime < 8 * 60) {
            //We check all inputs for errors:
            const nameCheck = ErrorSearch(name, setNameError, /^[a-zA-Z\s]{0,60}$/, "השם חייב להכיל рק тווים לטיניים")
            const usernameCheck = ErrorSearch(username, setUsernameError, /^[a-zA-Z]{0,30}$/, "השם חייב להכיל рק тווים לטיניים")
            const emailCheck = ErrorSearch(email, setEmailError, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "האימייל שלך לא тואם לפורמט")
            const phoneNumberCheck = ErrorSearch(phoneNumber, setPhoneNumberError, /^05\d{8}$/, "הטלפון שלך לא тואם לפורמט")
            const passwordCheck = ErrorSearch(password, setPasswordError, /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "הסיסמה חייבת להכיל 8 תווים ולפחות מספר אחד ולפחות אות אחת")
            //If we don't have errors, try to send data:
            if (nameCheck && usernameCheck && emailCheck && phoneNumberCheck && passwordCheck) {
                if (tryCount > 2) {
                    setCaptchaWindow('flex')
                } else {
                    RequestToServer()
                }
            }
            //if user try to send form before 3000ms, he just cant
            //if user try to send dorm after 8 * 60 * 1000ms, page is refreshed 
        } else if (waitingTime > 8 * 60) {
            window.location.reload()
        }
    }

    useEffect(() => {
        setCaptchaWindow('none')
    }, [captchaToken])


    useEffect(() => {
        const timer = setTimeout(() => {
            setWaitingTime(waitingTime + 1)
            console.log(waitingTime)
        }, 1000)
        return () => {
            clearInterval(timer);


        };
    }, [waitingTime])

    // useEffect(() => {
    //     // Функция, которая будет вызываться каждую секунду
    //     const timer = setInterval(() => {
    //         setSeconds((prevSeconds) => prevSeconds + 1);
    //         console.log(seconds)

    //     }, 1000);

    //     // Функция очистки, которая остановит таймер при размонтировании компонента
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []); // 
    return (
        <div className='register-page'>
            <nav>
                <img src="./MainLogo.svg" alt="" className="logo-small" />
                <BackButton />
            </nav>
            <form>
                <HoneyPotInput type={'text'} value={honeyPot} setSomething={setHoneyPot} />

                <InputWithlabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />

                <InputWithlabel name={'בחר/י שם משתמש'} type={'text'} value={username} placeholder={'ישראלה'} setSomething={setUsername} regexp={/^[a-zA-Z]{0,25}$/} width={'75%'} error={usernameError} />

                <InputWithlabel name={'מה המייל שלך?'} type={'email'} value={email} placeholder={'israela123@example.com'} setSomething={setEmail} regexp={/^.*$/} width={'90%'} error={emailError} />

                <InputWithlabel name={'מה הקוד שקיבלת?'} type={'text'} value={phoneNumber} placeholder={'055-1234567'} setSomething={setPhoneNumbaer} regexp={/^\d{0,10}$/} width={'35%'} error={phoneNumberError} />

                <InputWithlabel name={'סיסמה'} type={'password'} value={password} placeholder={''} setSomething={setPassword} regexp={/^.*$/} width={'90%'} error={passwordError} />
                <span className="notification">הסיסמה חייבת להכיל 8 תווים ולפחות מספר אחד
                    ולפחות אות אחת.</span>


                <button className='register form-button' onClick={handleClick}>אישור</button>
            </form>
            <RecaptchaWindow setCaptchaToken={setCaptchaToken} setTryCount={setTryCount} styles={captchaWindow} />
            <ModalWindow text={'You were successfully registered'} styles={modalWindow} />
        </div>
    )

}