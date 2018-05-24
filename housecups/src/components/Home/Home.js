import React, { Component } from "react";
import "./Home.css";
import { Button } from "react-bootstrap";
import Coverflow from "react-coverflow";

class Home extends Component {
  handleLoginClick = e => {
    e.preventDefault();
    this.props.history.push("/signin");
  };
  handleSignupClick = e => {
    e.preventDefault();
    this.props.history.push("/signup");
  };
  render() {
    return (
      <div>
        <div className="Home__Navbar">
          <Button
            style={{ width: "100px", marginRight: "20px" }}
            bsStyle="primary"
            onClick={this.handleSignupClick}
          >
            Sign Up
          </Button>
          <Button
            style={{ width: "100px" }}
            bsStyle="primary"
            onClick={this.handleLoginClick}
          >
            Sign In
          </Button>
        </div>
        {/* This component from coverflow module */}
        <Coverflow
          width={960}
          height={430}
          displayQuantityOfSide={2}
          navigation={true}
          enableHeading={false}
        >
          
          <img
            src={require("./album-1.png")}
            alt="Album two"
            data-action="http://passer.cc"
          />
          
          <img
            src={require("./album-4.png")}
            alt="Album six"
            data-action="https://medium.com"
          />
          <img
            src={require("./album-3.png")}
            alt="Album seven"
            data-action="http://www.google.com"
          />
          <img
            src={require("./album-1.png")}
            alt="Album one"
            data-action="https://facebook.github.io/react/"
          />
          <img
            src={require("./album-4.png")}
            alt="Album two"
            data-action="http://passer.cc"
          />
          <img
            src={require("./album-3.png")}
            alt="Album three"
            data-action="https://doce.cc/"
          />
       
        </Coverflow>
        <div className="Home__Container">
          <div className="Home__Container_description">
            Please explain somethings over here
          </div>
          <Button
            style={{ width: "210px", marginTop: "20px" }}
            bsStyle="primary"
            onClick={this.handleSignupClick}
          >
            Buy Now
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
