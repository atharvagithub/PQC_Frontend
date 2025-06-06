import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage/HomePage';
import MainPage from './pages/MainPage/MainPage';
import BlockPage from './pages/BlockPage/BlockPage';
import Navbar from './components/Navbar';

import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-wrapper">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/blockchain" element={<BlockPage />} />
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
