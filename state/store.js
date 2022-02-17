import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whilelist: "events"
}

const store = createStore(reducer, undefined, applyMiddleware(thunk));


const persistor = persistStore(store)



export { store, persistor };
