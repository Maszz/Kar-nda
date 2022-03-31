import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import LogRocket from '@logrocket/react-native';

/**
 * Create store Object with initial state from redux persist use`persiststore` to wrapped `storeInstance`
 * @Sequnce Initial app launch -> create store with `undefined` initial state -> change initial state when state rehydrate from `asynceStorage`
 */

const store = createStore(reducer, undefined, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
