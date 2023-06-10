import React from "react";
import "./App.css";
import "./scss/Header.scss";
import "./scss/Footer.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route } from 'react-router-dom';
import AboutPage from './pages/about';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
// import ProfilePage from './pages/profile';
// import GroupPage from './pages/group';
<<<<<<< HEAD
import GroupPage from './pages/group';
import BoardPage from './pages/board/index';
import Post from './pages/board/Post';
import PostDeleteCheck from './pages/board/PostDeleteCheck';
import PostWrite from './pages/board/PostWrite';
=======
>>>>>>> dded4e5be12c73fdab783b87f0b3c96dc102a1f5

function App() {
  return (
    <div className="wrapper">
      <Header />
      {/* <div className="main-content">
        <Contents />
      </div> */}
      {/* git test */}
<<<<<<< HEAD
      <Routes>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/group/*' element={<GroupPage />}></Route>
        
          {/* <Route path='/profile' element={<ProfilePage/>}/> */}
        {/* <Route path='/group' element={<GroupPage />}></Route> */}
        <Route path='/board' element={<BoardPage />}></Route>
        <Route path='/board/post/:postNum' element={<Post />}></Route>
        <Route path='/board/post/delete' element={<PostDeleteCheck />}></Route>
        <Route path='/board/post/write' element={<PostWrite />}></Route>
=======
      <body>
        <Routes>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage/>}/>
          {/* <Route path='/profile' element={<ProfilePage/>}/> */}
        {/* <Route path='/group' element={<GroupPage />}></Route> */}
>>>>>>> dded4e5be12c73fdab783b87f0b3c96dc102a1f5
      </Routes>
      <Footer />
      </body>
    </div>
  );
}

export default App;
