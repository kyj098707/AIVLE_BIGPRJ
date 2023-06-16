import React from "react";
import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutPage from './pages/about';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import GroupPage from './pages/group';
import BoardPage from './pages/board/index';
import Post from './pages/board/Post';
import PostDeleteCheck from './pages/board/PostDeleteCheck';
import PostWrite from './pages/board/PostWrite';
import RivalPage from './pages/rival';
import HomePage from './Home';
import ProblemPage from './pages/problem';

import "./App.css";
import "./scss/Header.scss";
import "./scss/Footer.scss";


function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/group/*' element={<GroupPage />}></Route>
        <Route path='/problem' element={<ProblemPage />}></Route>
        <Route path='/rival' element={<RivalPage />}></Route>
        <Route path='/board' element={<BoardPage />}></Route>
        <Route path='/board/post' element={<Post />}></Route>
        <Route path='/board/post/delete' element={<PostDeleteCheck />}></Route>
        <Route path='/board/post/write' element={<PostWrite />}></Route>
        <Route path='/home' element={<HomePage />} /> {/* /home 경로로 이동할 때 HomePage 컴포넌트 렌더링 */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;