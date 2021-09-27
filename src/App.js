import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActorInfo from './components/ActorInfo/ActorInfo';
import Footer from './components/Footer';

import { AuthProvider } from './AuthContext';

import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

import { GlobalStyle } from './GlobalStyle'
import UserPage from './components/UserPage';
import MyPage from './components/MyPage';

const App = () =>  (
  <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieId' element={<Movie />} />
        <Route path='/person/:actorId' element={<ActorInfo />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/user/:userId' element={<UserPage />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <GlobalStyle />
      <Footer />
    </Router>
  </AuthProvider>
  );


export default App;
