import { combineReducers } from 'redux';
import user from './user';
import management from './management';
import common from './common';
import client from './client';

const rootReducer = combineReducers({
    user,
    common,
    management,
    client
});

export default rootReducer;