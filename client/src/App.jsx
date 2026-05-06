import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import LoginPage from "./pages/LoginPage/LoginPage"
import SignupPage from './pages/SignupPage/SignupPage'
import Dashboard from './pages/Dashboard/Dashboard'

import Skillspage from './pages/SkillsPage/SkillsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import QuestionsPage from './pages/QuestionsPage/QuestionsPage'


import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
          <Route index element={<Skillspage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='leaderboard' element={<Leaderboard />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/quiz" element={<QuestionsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App