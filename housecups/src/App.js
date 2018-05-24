import React, { Component } from "react";
import "./App.css";
import reducers from './reducers';
//Components
import Home from "./components/Home/Home";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";

//Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";

//Routers
import { BrowserRouter as Router, Route } from "react-router-dom";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise,ReduxThunk)(createStore);

class App extends Component {
  render() {
    return (
      <Provider  store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <Router>
        <div className="App">
          {/* Please import componenets in alphabetical order */}
          <Route path="/" component={Home} exact />
          {/* <Route path="/forgotpassword" component={Forgotpassword} />
          <Route path="/reset" component={Resetpassword} /> */}
          <Route path="/signin" component={Signin} exact />
          {/* <Route path="/signout" component={Signout} /> */}
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;