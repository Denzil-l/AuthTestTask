import './WelcomePage.css'
import { useNavigate } from 'react-router-dom'



export const WelcomePage = () => {
    const navigate = useNavigate();

    const handleClick = (type) => {
        if (type == 'register') {
            navigate('/register')
        } else if (type == 'login') {
            navigate('/login')
        }
    }

    return (
        <>
            <div className="logo">
                <img className='logo1' src="./MainLogo.svg" alt="logoPicture" />
                <img className='logo2' src="./MainLogoText.svg" alt="logoText" />
            </div>
            <div className="buttons">
                <button className="register" onClick={() => navigate('/register')}>הרשמה</button>
                <button className="login">יש לי כבר חשבון</button>
            </div>

        </>
    )
}