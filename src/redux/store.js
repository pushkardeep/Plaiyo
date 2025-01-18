import {configureStore} from '@reduxjs/toolkit';
import persistedReducer from './reducers/persistedReducer ';

import {persistStore} from 'redux-persist';

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export {store, persistor};
