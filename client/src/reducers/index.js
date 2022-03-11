import { combineReducers } from "redux";
import auth from './auth';
import pin from './pin';

const reducers = combineReducers({
    auth,
    pin
});

export default reducers;