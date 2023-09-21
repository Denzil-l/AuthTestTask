import axios from "axios";


export const Verify = async (isAuthenticated, setIsAuthenticated) => {
        console.log('Я в verify')
        try {
            console.log('Я шлю запрос на сервер')
            console.log('вот токен')
            console.log(localStorage.getItem('jwtToken'))

            const response = await axios.post('http://localhost:3001/auth/verify', {
                accessToken: localStorage.getItem('jwtToken')
            })

            if (response.status == 200) {
                console.log("Сервер ответил забись")
                console.log(response)
                setIsAuthenticated('true')
            }

        } catch (error) {
            console.log(error)
            console.log("Сервер ответил что все в ошибке")

            setIsAuthenticated(false)
            console.log(`Аутенфикация ${isAuthenticated}`)

        }

    
}