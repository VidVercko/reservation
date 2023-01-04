import { combineReducers } from 'redux';
import user from './user';
import common from './common';

const rootReducer = combineReducers({
    user,
    common
});

export default rootReducer;