import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import LogRocket from '@logrocket/react-native';
import {configureStore} from '@reduxjs/toolkit';
/**
 * Create store Object with initial state from redux persist use`persiststore` to wrapped `storeInstance`
 * @Sequnce Initial app launch -> create store with `undefined` initial state -> change initial state when state rehydrate from `asynceStorage`
 */

const middlewares = [thunk, LogRocket.reduxMiddleware()];

// debug section remove in productions.
if (__DEV__) {
  console.log('Running in Dev Mode.');
  const createDebugger = require('redux-flipper').default;
  const reselectDebugger = require('reselect-debugger-flipper');
  middlewares.push(createDebugger());
  middlewares.push(reselectDebugger.reduxMiddleware);
}

const store = createStore(reducer, undefined, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export {store, persistor};
