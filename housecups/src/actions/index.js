import axios from 'axios'


//Auth Actions please maintain alphabetical order
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const ADMIN_AUTHORIZED = 'ADMIN_AUTHORIZED';
export const CREATE_USER = 'CREATE_USER';
export const FORGOTPASSWORD = 'FORGOTPASSWORD'
export const RESETPASSWORD = 'RESETPASSWORD'
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';

//Api url To be changed for Production
//const ROOT_URL = 'Insert Production URL here'
const ROOT_URL = 'http://localhost:8080';

export const authError = error => {
    return dispatch => {
        dispatch({type: AUTHENTICATION_ERROR, payload: error})
        setTimeout(() => {
            dispatch({type: AUTHENTICATION_ERROR})
        }, 4000)
    }
};

export const createUser = async (user, history) =>{
    const apiurl = `${ROOT_URL}/signup`;
    try {
        const adduserrequest = await axios.post(apiurl,user);
        history.push('/login');
        return {
            type:CREATE_USER,
            payload:adduserrequest
        }
    } catch(error){
        if(error.message === 'Network Error') return authError('Network Error - Email jaspinder to start server')
        if(error.response.data.message.errmsg){
            const duplicateKey =error.response.data.message.errmsg
            let emailKeyWordPresent = duplicateKey.search(/email/i)
            if(emailKeyWordPresent === -1){
                return(authError('Username Unavailable'))
            }
            return authError('Email already registered')
        } 
        if(error.response.data.message) return authError(error.response.data.message);
    }
};

export const signin = async (user, history) =>{
    const apiurl = `${ROOT_URL}/login`;
    try {
        const signinrequest = await axios.post(apiurl,user);
        localStorage.setItem('token', signinrequest.data.token);
        history.push('/genres');
        return {
            type:SIGNIN,
            payload:signinrequest
        }
    } catch (error){
        return authError(error.response.data.message);
    }     
}
export const forgotPassword = async(email) => {
    try{
        await axios.post(`${ROOT_URL}/forgotpassword`,{email});
        return {
            type:FORGOTPASSWORD
        }
    }catch(error){
        return authError(error.response.data.message);
    }
}

export const resetPassword = async(passwords, history) => {
    let token = localStorage.getItem('token');
    try{
        await axios.post(`${ROOT_URL}/reset`,
            passwords,
            { 
                headers: {
                Authorization: token
                }
            }
        );
        history.push('/login')
        return {
            type:RESETPASSWORD
        }
    }catch(error){
        return authError(error.response.data.message);
    }
}
export const logout = async (history) =>{
    const apiurl = `${ROOT_URL}/logout`;
    const token = localStorage.getItem('token')
    try {
        await axios.get(apiurl,
            { 
                headers: {
                  Authorization: token
                }
            }
        );
        //remove the JWT from local storage
        localStorage.removeItem('token');
        history.push('/login');
        return {
            type:SIGNOUT
        }
    } catch (error){
        return authError(error.response.data.message);
    }
}

export const adminAuth = async (history) => {   
    try{
        const token = localStorage.getItem('token')
        await axios.get(
            `${ROOT_URL}/admin`,
            { 
            headers: {
              Authorization: token
            }
        });
        return {
            type:ADMIN_AUTHORIZED
        }
    } catch (error){
        history.push('/login');
        return authError('You are not authorized as admin');
    }
}





