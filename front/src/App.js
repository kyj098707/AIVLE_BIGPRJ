import React from "react";
import "./App.css";
import "./scss/Header.scss";
import "./scss/Contents.scss";
import "./scss/Footer.scss";
import Header from "./components/Header";
import Contents from "./components/Contents";
import Footer from "./components/Footer";

import { Routes, Route, Link } from 'react-router-dom';
import AboutPage from './pages/about';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './Home';

function App() {
  return (
    <div className="App">
      <Header />
      {/* git test */}
      <Routes>
        <Route path='/home' element={<HomePage />} /> {/* /home 경로로 이동할 때 HomePage 컴포넌트 렌더링 */}
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;