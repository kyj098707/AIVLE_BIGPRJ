import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutPage from './pages/about';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AgreementPage from './pages/agreement';
import GroupPage from './pages/group';
import BoardPage from './pages/board/index';
import Post from './pages/board/Post';
import Edit from './pages/board/Edit';
import PostDeleteCheck from './pages/board/PostDeleteCheck';
import PostWrite from './pages/board/PostWrite';
import RivalPage from './pages/rival';
import HomePage from './pages/home';
import ProblemPage from './pages/problem';
import HomePage2 from './pages/intro';
import DbPage from "./DbPage";
import UsePage from "./components/register/Use";
import Privacy from "./components/register/Privacy";


import "./App.css";
import "./scss/Header.scss";
import "./scss/Footer.scss";

import TempPage from './pages/temp';
function App() {
  const location = useLocation();
  const isHomePage2 = location.pathname === '/';

  return (
    <div className="wrapper">
      {!isHomePage2 && <Header />} {/* Render Header component if not on HomePage2 */}
      <Routes>
        <Route path='/' element={<HomePage2 />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/agreement' element={<AgreementPage />} />
        <Route path='/group/*' element={<GroupPage />} />
        <Route path='/problem' element={<ProblemPage />} />
        <Route path='/rival' element={<RivalPage />} />
        <Route path='/board' element={<BoardPage />} />
        <Route path='/board/post/:postId' element={<Post />} />
        <Route path='/board/edit/:postId' element={<Edit />} />
        <Route path='/board/post/delete' element={<PostDeleteCheck />} />
        <Route path='/board/post/write' element={<PostWrite />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/home2' element={<HomePage2 />} />
        <Route path='/db' element={<DbPage />} />
        <Route path='/use' element={<UsePage />} />
        <Route path='/privacy' element={<Privacy />} />

        <Route path='/temp' element={<TempPage />} />
      </Routes>
      {!isHomePage2 && <Footer />} {/* Render Footer component if not on HomePage2 */}
    </div>
  );
}

export default App;