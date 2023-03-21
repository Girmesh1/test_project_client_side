import { configureStore } from '@reduxjs/toolkit';
import songSlice from './slice/songslice';

import createSagaMiddleware from '@redux-saga/core';
import MySaga from '../sagas';


const saga = createSagaMiddleware();

const store = configureStore({
    reducer: {
        songs: songSlice.reducer,
       
        
    },
    middleware: [saga]
 
});

saga.run(MySaga.songSaga)
saga.run(MySaga.addSongSaga)
saga.run(MySaga.updateSongSaga)
saga.run(MySaga.deleteSongSaga)

export default store;