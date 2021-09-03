import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActorInfo from './components/ActorInfo/ActorInfo';
import Footer from './components/Footer';

import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

import { GlobalStyle } from './GlobalStyle'

const App = () =>  (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieId' element={<Movie />} />
        <Route path='/actor/:actorId' element={<ActorInfo />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <GlobalStyle />
      {/* <Footer /> */}
    </Router>
  );


export default App;
