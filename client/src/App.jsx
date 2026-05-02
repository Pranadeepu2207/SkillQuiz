import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import LoginPage from "./pages/LoginPage/LoginPage"
import SignupPage from './pages/SignupPage/SignupPage'
import Dashboard from './pages/Dashboard/Dashboard'

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App