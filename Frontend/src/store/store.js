import {configureStore} from '@reduxjs/toolkit';
import userInfo from '../slice/userInfo'
import hospitalInfo from '../slice/hospitalInfo';
export const store = configureStore({
    reducer : {
        userInfo : userInfo,
        hospitalInfo : hospitalInfo
    }
})