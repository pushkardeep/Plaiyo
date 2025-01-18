import {persistReducer} from 'redux-persist';

import persistConfig from '../../configs/redux-persist.config';
import rootReducer from './rootReducer';

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
