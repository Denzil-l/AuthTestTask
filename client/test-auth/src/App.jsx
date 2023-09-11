import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import { WelcomePage } from './WelcomePage/WelcomePage'
import { LoadingPage } from './LoadingPage/LoadingPage'
import { RegisterPage } from './RegisterPage/RegisterPage'

const App = () => {
  return (
    <div className="container">
      <LoadingPage />
      <div className="pages">
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </div>
    </div>)
}

export default App
