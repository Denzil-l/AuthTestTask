import { useState } from 'react'
import { InputWithlabel } from '../InputWithLabel/InputWithLabel'
import { BackButton } from '../BackButton/BackButton'
// import axios from 'axios'
import './RegisterPage.css'

export const RegisterPage = () => {

    //data states
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumbaer] = useState('')
    const [password, setPassword] = useState('')

    const allData = [name, username, email, phoneNumber, password]

    //styles states

    const [nameError, setNameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneNumberError, setPhoneNumbaerError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const allError = [[nameError, setNameError], [usernameError, setUsernameError], [emailError, setEmailError], [phoneNumberError, setPhoneNumbaerError], [passwordError, setPasswordError]]

    const handleClick = async (event) => {
        event.preventDefault();

        setNameError(name == "" ? "emptyError" : !(/^[a-zA-Z\s]{0,60}$/).test(name) ? "השם חייב להכיל רק תווים לטיניים" : "");

        setUsernameError(username == "" ? "emptyError" : !(/^[a-zA-Z]{0,30}$/).test(username) ? "השם חייב להכיל רק תווים לטיניים" : "");

        setEmailError(email == "" ? "emptyError" : !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email) ? "האימייל שלך לא תואם לפורמט" : "");

        setPhoneNumbaerError(phoneNumber == "" ? "emptyError" : !(/^0\d{9}$/).test(phoneNumber) ? "הטלפון שלך לא תואם לפורמט" : "");

        setPasswordError(password == "" ? "emptyError" : !(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/).test(password) ? "הטלפון שלך לא תואם לפורמט" : "");

        let check = true
        allError.forEach(item => {
            item[0] != '' ? check = false : null
        })

        console.log(check)

        //Делаем асинхронный запрос на сервер и отправляем данные
    }

    return (
        <div className='register-page'>
            <nav>
                <img src="./MainLogo.svg" alt="" className="logo-small" />
                <BackButton />
            </nav>
            <form>
                <InputWithlabel name={'מה השם שלך?'} type={'text'} value={name} placeholder={'ישראלה ישראלי'} regexp={/^(?:[a-zA-Z ]{0,55})$/} setSomething={setName} width={'75%'} error={nameError} />

                <InputWithlabel name={'בחר/י שם משתמש'} type={'text'} value={username} placeholder={'ישראלה'} setSomething={setUsername} regexp={/^[a-zA-Z]{0,25}$/} width={'75%'} error={usernameError} />

                <InputWithlabel name={'מה המייל שלך?'} type={'email'} value={email} placeholder={'israela123@example.com'} setSomething={setEmail} regexp={/^.*$/} width={'90%'} error={emailError} />

                <InputWithlabel name={'מה הקוד שקיבלת?'} type={'text'} value={phoneNumber} placeholder={'055-1234567'} setSomething={setPhoneNumbaer} regexp={/^\d{0,10}$/} width={'35%'} error={phoneNumberError} />

                <InputWithlabel name={'סיסמה'} type={'password'} value={password} placeholder={''} setSomething={setPassword} regexp={/^.*$/} width={'90%'} error={passwordError} />
                <span className="notification">הסיסמה חייבת להכיל 8 תווים ולפחות מספר אחד
                    ולפחות אות אחת.</span>
                <button className='register form-button' onClick={handleClick}>אישור</button>
            </form>
        </div>
    )

}