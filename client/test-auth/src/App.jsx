import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import { WelcomePage } from './WelcomePage/WelcomePage'
import { LoadingPage } from './LoadingPage/LoadingPage'
import { RegisterPage } from './RegisterPage/RegisterPage'
import { LoginPage } from './LoginPage/LoginPage'
import { FinalPage } from './FinalPage/FinalPage'
import { useAuth } from './AuthContext/AuthContext'
import { Verify } from './VerifyToken'
import axios from 'axios'




const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth()


  useEffect(() => {

    Verify(isAuthenticated, setIsAuthenticated)
    console.log('я срабатываю только при первом рендере в app.jsx')
  }, [])

  return (
    <div className="container">
      <LoadingPage />
      <div className="pages">
        <Routes>
          {/* Маршруты, доступные только неавторизованным пользователям */}
          {!isAuthenticated && (
            <>
              <Route path='/' element={<WelcomePage />} />
              <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path='/register' element={<RegisterPage />} />
              {/* Перенаправляем любой другой маршрут на / */}
              <Route path='*' element={<Navigate to='/' />} />
            </>
          )}

          {/* Маршруты, доступные только авторизованным пользователям */}
          {isAuthenticated && (
            <>
              <Route path='/final' element={<FinalPage />} />
              {/* Перенаправляем любой другой маршрут на /final */}
              <Route path='*' element={<Navigate to='/final' />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );

  // return (
  //   <div className="container">
  //     <LoadingPage />
  //     <div className="pages">
  //       <Verify check={false}>
  //         <Routes>
  //           <Route path='/' element={<WelcomePage />} />
  //           <Route path='/register' element={<RegisterPage />} />
  //           <Route path='/login' element={<LoginPage />} />
  //         </Routes>
  //       </Verify>

  //       <Verify check={true}>
  //         <Routes>
  //           <Route path='/final' element={<FinalPage />} />
  //         </Routes>
  //       </Verify>

  //     </div>
  //   </div>)
}

export default App

{/* <Verify valid={false}> </Verify>

<Routes>
<Verify valid={false}>
  <Route path='/' element={<WelcomePage />} />
  <Route path='/register' element={<RegisterPage />} />
  <Route path='/login' element={<LoginPage />} />
</Verify>
<Verify valid={true}>
  <Route path='/final' element={<FinalPage />} />
</Verify>

</Routes> */}