import React, { Component } from "react";
import "./Auth.css";
import { signin } from "../../actions";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      error: undefined,
      renderedAfterSignUp: false
    };
  }
  signin = e => {
    e.preventDefault();
    this.props.signin(this.state, this.props.history);
  };
  componentWillReceiveProps(props) {
    if (props.signedUpusername && !this.state.renderedAfterSignUp) {
      this.setState({
        username: props.signedUpusername,
        email: props.signedUpusername,
        password: "",
        error: undefined,
        renderedAfterSignUp: true
      });
    } else {
      this.setState({
        password: "",
        error: props.error
      });
    }
  }

  handleUsernameInput = e => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
      email: e.target.value
    });
  };
  handlePasswordInput = e => {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  };
  renderAlert = () => {
    if (!this.state.error) return null;
    return <p style={{ color: "#e50914" }}>{this.state.error}</p>;
  };
  renderSignupSuccess = () => {
    if (!this.props.signedUpusername) return null;
    return (
      <p style={{ color: "#e50914" }}>Sign Up successfull, Please sign in</p>
    );
  };
  renderResetPasswordSuccess = () => {
    if (!this.props.resetPassword) return null;
    return (
      <p style={{ color: "#e50914" }}>
        Password has been reset, Please sign in with new password
      </p>
    );
  };

  render() {
    return (
      <div>
        <div className="Auth__Body">
        <div className="Auth__Body__Imageholder" />
          <div className="Auth__Body__Container" style={{ marginTop: "80px" }}>
            <h1 style={{ marginBottom: "20px" }}>Sign In</h1>
            {this.renderAlert()}
            {this.renderSignupSuccess()}
            {this.renderResetPasswordSuccess()}
            <form onSubmit={this.login}>
              <label>Username or Email</label>
              <input
                onChange={this.handleUsernameInput}
                value={this.state.username}
                type="text"
              />
              <label>Password</label>
              <input
                onChange={this.handlePasswordInput}
                value={this.state.password}
                type="password"
              />
              <p style={{ marginTop: "50px", marginBottom: "0px" }}>
                <Link to={"/forgotpassword"} className="Link">
                  Forgot username or password?
                </Link>
              </p>
              <Button
                style={{ width: "100%", margin: "20px 0px" }}
                bsStyle="primary"
                type="submit"
              >
                Sign In
              </Button>
            </form>
            <p>
              New to Housecups?
              <Link to={"/signup"} className="Link">
                Sign Up now
              </Link>
            </p>
          </div>
          <div className="Auth__Body__Imageholder">
            <img src={require("./trophy.png")} style={{ opacity: 0.1 }} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    signedUpusername: state.auth.signedUpusername,
    resetPassword: state.auth.resetPassword
  };
};

export default connect(mapStateToProps, { signin })(Signin);
