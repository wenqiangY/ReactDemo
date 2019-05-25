import {combineReducers} from 'redux';

import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
import tagData from 'reducers/tagData';

export default combineReducers({
    counter,
    userInfo,
    tagData,
})

// import * as reducers from './reducers'
//
// const reducer = combineReducers(reducers)
