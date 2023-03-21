import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateSong from './CreateSong';
import SongList from './SongList';
import UpdateSong from './UpdateSong';

const App = () => {
  return (
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/CreateSong" element={<CreateSong />} />
        <Route path="/updateSong/:id" element={<UpdateSong />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
