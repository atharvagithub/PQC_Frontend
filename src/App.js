import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage/HomePage';
import MainPage from './pages/MainPage/MainPage';
import BlockPage from './pages/BlockPage/BlockPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoutes';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-wrapper">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          <Route path="/blockchain" element={<ProtectedRoute><BlockPage /></ProtectedRoute>} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
