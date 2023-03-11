import {
    INIT_URL,
    USER_DATA,
    USER_TOKEN_SET,
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_ERROR,
    SIGNOUT_USER_SUCCESS,
    IS_AUTHENTICATED,
    OPEN_LOGIN
} from "../constants/ActionTypes";
import { axiosClient } from "../util/http-setting";

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const setOpenLogin = (login) => {
    return (dispatch) => {
        dispatch({ type: OPEN_LOGIN, payload: login });
    }
};

export const userSignIn = ( username, password ) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        dispatch({ type: USER_TOKEN_SET, payload: null });
        dispatch({ type: USER_DATA, payload: null });
        axiosClient.post('/signin', {
            username: username,
            password: password,
        }
        ).then(({ data }) => {
            console.log(" ___ userSignIn RESPONSE ___ ", data);

            axiosClient.defaults.headers.common['Authorization'] = "Basic " + data.token;

            localStorage.setItem('kudade_auth_key', data.token);
            localStorage.setItem('kudade_in', Date.now());
            localStorage.setItem('kudade_user', JSON.stringify(data.data));

            dispatch({ type: FETCH_SUCCESS, payload: 'Login successfull' });
            dispatch({ type: USER_TOKEN_SET, payload: data.token });
            dispatch({ type: USER_DATA, payload: data.data });
            dispatch({ type: IS_AUTHENTICATED, payload: true });
            // dispatch({ type: CUSTOMER_ID, payload: data.customerID });
            // console.log(" ___ userSignIn customerID ", data.customerID);
            setTimeout(() => {
                dispatch({ type: FETCH_SUCCESS, payload: '' });
            }, 5000)
            window.location.assign('/')

        }).catch(({request}) => {
            console.log(request)
            if(request.response){
                console.error("xxx userSignIn Request ERROR xxx", JSON.parse(request.response).message.message);
                dispatch({ type: FETCH_ERROR, payload: JSON.parse(request.response).message.message });
            }else{
                console.error("xxx userSignIn Request ERROR xxx", "Server error");
                dispatch({ type: FETCH_ERROR, payload: "Server error" });
            }
            dispatch({ type: IS_AUTHENTICATED, payload: false });
            setTimeout(() => {
                dispatch({ type: FETCH_ERROR, payload: '' });
            }, 5000)
        });
    }
};

export const userSignOut = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        localStorage.removeItem('kudade_auth_key');
        localStorage.removeItem('kudade_in');
        localStorage.removeItem('kudade_user');
        localStorage.removeItem('editOrderItem');
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SIGNOUT_USER_SUCCESS });
    }
};

export const verifyToken = ( username, password ) => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        dispatch({ type: USER_TOKEN_SET, payload: null });
        dispatch({ type: USER_DATA, payload: null });
        axiosClient.post('/signin', {
            username: username,
            password: password,
        }
        ).then(({ data }) => {
            console.log(" ___ userSignIn RESPONSE ___ ", data);

            axiosClient.defaults.headers.common['Authorization'] = "Basic " + data.token;

            localStorage.setItem('kudade_auth_key', data.token);
            localStorage.setItem('kudade_in', Date.now());
            localStorage.setItem('kudade_user', JSON.stringify(data.data));

            dispatch({ type: USER_TOKEN_SET, payload: data.token });
            dispatch({ type: USER_DATA, payload: data.data });
            dispatch({ type: IS_AUTHENTICATED, payload: true });
            // dispatch({ type: CUSTOMER_ID, payload: data.customerID });
            // console.log(" ___ userSignIn customerID ", data.customerID);

            // window.location.assign('/dashboard')

        }).catch(({request}) => {
            localStorage.removeItem('kudade_auth_key');
            localStorage.removeItem('kudade_in');
            localStorage.removeItem('kudade_user');
            localStorage.removeItem('editOrderItem');
            console.log(request)
            if(request.response){
                console.error("xxx userSignIn Request ERROR xxx", JSON.parse(request.response).message.message);
                dispatch({ type: FETCH_ERROR, payload: JSON.parse(request.response).message.message });
            }else{
                console.error("xxx userSignIn Request ERROR xxx", "Server error");
                dispatch({ type: FETCH_ERROR, payload: "Server error" });
            }
            dispatch({ type: IS_AUTHENTICATED, payload: false });
            
        });
    }
};
