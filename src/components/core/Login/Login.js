import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import classes from "./Login.module.scss";
import { httpGet } from "../../../utils/api/http-calls";
import GoogleLogin from "react-google-login";
import { withRouter } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

class Login extends Component {
  state = {
    imageURL: undefined,
    isSignedIn: false,
  };

  responseGoogle = (response) => {
    if (response.profileObj) {
      this.setState({
        isSignedIn: true,
        imageURL: response.profileObj.imageUrl,
      });
      httpGet("http://localhost:3000/users").then((user) => {
        if (user.data[0].email !== response.profileObj.email) {
          user.data[0].email = response.profileObj.email;
          user.data[0].isAdmin = false;
        }
        localStorage.setItem("email", user.data[0].email);
        localStorage.setItem("isAdmin", user.data[0].isAdmin);
        if (user.data[0].isAdmin) {
          this.props.history.push("/admin-home");
        } else {
          this.props.history.push("/");
        }
      });
    }
  };

  logout = () => {
    this.setState({
      isSignedIn: false,
    });
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");

    this.props.history.push("/");
  };

  adminHome = () => {
    this.props.history.push("/admin-home");
  };
  renderAuthButton = () => {
    if (!this.state.isSignedIn) {
      return (
        <Fragment>
          <GoogleLogin
            clientId="1034712557431-k46smjg7a41lgdb144nrr118ibf6478b.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className={classes.ButtonGroup}
              >
                Login
              </button>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <img
            src={this.state.imageURL}
            className={classes.Profileimg}
            onClick={() => {
              this.adminHome();
            }}
            alt="user-profile-pic"
          ></img>

          <GoogleLogout
            clientId="1034712557431-k46smjg7a41lgdb144nrr118ibf6478b.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.ButtonGroup}
                onClick={renderProps.onClick}
              >
                Logout
              </Button>
            )}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
          ></GoogleLogout>
        </Fragment>
      );
    }
  };
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default withRouter(Login);
