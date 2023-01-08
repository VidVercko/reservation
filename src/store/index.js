import { combineReducers } from 'redux';
import user from './user';
import common from './common';
import management from './management';

const rootReducer = combineReducers({
    user,
    common,
    management
});

export default rootReducer;