import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import ProfileScreen from './components/ProfileScreen';
import Home from './components/Home';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import MyLearning from './components/MyLearning';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LearnIT" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/ProfileScreen" element={<ProfileScreen />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/SignupScreen" element={<SignupScreen />} />
        <Route path="/MyLearning" element={<MyLearning />} />
      </Routes>
    </Router>
  );
}

export default App;
