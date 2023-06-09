import React from "react";
import "./App.css";
import "./scss/Header.scss";
import "./scss/Contents.scss";
import "./scss/Footer.scss";
import Header from "./components/Header";
import Contents from "./components/Contents";
import Footer from "./components/Footer";

import { Routes, Route } from 'react-router-dom';
import AboutPage from './pages/about';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ProfilePage from './pages/profile';
import GroupPage from './pages/group';

function App() {
  return (
    <div className="wrapper">
      <Header />
      {/* <div className="main-content">
        <Contents />
      </div> */}
      {/* git test */}
      <body>
        <Routes>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/group' element={<GroupPage />}></Route>
      </Routes>
      <Footer />
      </body>
    </div>
  );
}

export default App;
