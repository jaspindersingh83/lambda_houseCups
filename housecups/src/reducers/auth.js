import {
  CREATE_USER,
  SIGNIN,
  AUTHENTICATION_ERROR,
  ADMIN_AUTHORIZED,
  SIGNOUT,
  FORGOTPASSWORD,
  RESETPASSWORD
} from "../actions/index";

const authReducer = (auth = {}, action) => {
  switch (action.type) {
    //When user is created send signedUpusername in props so that username field
    //can be auto populate at first instance of login
    case CREATE_USER:
      return { ...auth, signedUpusername: action.payload.data.username };

    case AUTHENTICATION_ERROR:
      return { ...auth, error: action.payload };

    case SIGNIN:
      return { ...auth };

    case FORGOTPASSWORD:
      return { ...auth, emailSent: true };

    case RESETPASSWORD:
      return { ...auth, resetPassword: true };

    case SIGNOUT:
      return { ...auth };
    //If authorized send auth property of admin as true
    case ADMIN_AUTHORIZED:
      return { ...auth, admin: true };
    default:
      return auth;
  }
};

export default authReducer;
