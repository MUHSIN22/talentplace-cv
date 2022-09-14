import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from './Features/AuthenticationSlice'
import masterReducer from './Features/MasterSlice'
import resumeReducer from './Features/ResumeSlice'
import graphReducer from './Features/GraphSlice'
import editReducer from './Features/EditSlice'
import { combineReducers } from "redux";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'



const persistConfig = {
    key: 'authentication',
    storage: storageSession,
    blacklist: [masterReducer,resumeReducer,graphReducer,editReducer]
}
const reducers = combineReducers({
    authentication: authenticationReducer,
    masters: masterReducer,
    resume: resumeReducer,
    graphs: graphReducer,
    editDetails: editReducer
});
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})