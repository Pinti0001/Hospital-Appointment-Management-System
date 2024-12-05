import {configureStore} from '@reduxjs/toolkit';
import userInfo from '../slice/userInfo'
export const store = configureStore({
    reducer : {
        userInfo : userInfo
    }
})