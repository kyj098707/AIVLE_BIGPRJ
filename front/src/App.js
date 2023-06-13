import React from "react";
import "./App.css";
import "./scss/Header.scss";
import "./scss/Footer.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route, Link } from 'react-router-dom';
import AboutPage from './pages/about';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import GroupPage from './pages/group';
import BoardPage from './pages/board/index';
import PostDeleteCheck from './pages/board/PostDeleteCheck';
import PostWrite from './pages/board/PostWrite';
import RivalPage from './pages/rival';
import HomePage from './Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<AboutPage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/group/*' element={<GroupPage />}></Route>
        <Route path='/rival' element={<RivalPage />}></Route>
        <Route path='/board' element={<BoardPage />}></Route>
        <Route path='/board/post/delete' element={<PostDeleteCheck />}></Route>
        <Route path='/board/post/write' element={<PostWrite />}></Route>
        <Route path='/home' element={<HomePage />} /> {/* /home 경로로 이동할 때 HomePage 컴포넌트 렌더링 */}
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;