import Vuex from 'vuex';

import {alert} from './alert.module';
import {authentication} from './authentication.module';


const store = new Vuex.Store({
    modules: {
        authentication,
    }
});

export default store;