import auth0 from "auth0-js";
import axios from "axios";
import React, { Component } from "react";
import { useDispatch } from "react-redux";

/*Aditya Mhatre | 46104007*/
class Auth extends Component {
  constructor(navigate) {
    super();
    this.navigate = navigate;
    this.profile = null;
    this.requestedScopes = "openid profile email read:courses";
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: this.requestedScopes,
    });
  }

  dispatch = useDispatch();

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      // console.log("authResult:" + JSON.stringify(authResult));
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        alert(`Error: ${err.error}, for further info check console.`);
        console.log(err);
      }
      this.navigate("/");
    });
  };

  setSession = (authResult) => {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    const scopes = authResult.scope || this.requestedScopes || "";
    console.log(`Access Token: ${authResult.accessToken} \nScopes: ${scopes}`);
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", scopes);
    this.dispatch({ type: "SETTOKEN", token: authResult.accessToken });
    this.getProfile((pr) => {
      console.log(pr);
      this.dispatch({
        type: "SETUSER",
        user: {
          userID: pr.sub.split("|")[1],
          userName: pr.name,
          userRole: "Customer",
          userEmail: pr.email,
          userPicture: pr.picture,
        },
      });
    });
  };

  isAuthenticated = () => {
    const expiredAt = localStorage.getItem("expires_at");
    const isAuthentic = new Date().getTime() < expiredAt;
    return isAuthentic;
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    this.profile = null;
    this.dispatch({ type: "REMOVEUSER" });
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000/",
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("Access token not found");
    return accessToken;
  };

  getProfile = (callbackFunc) => {
    if (this.profile) return callbackFunc(this.profile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.profile = profile;
      console.log("Profile:" + profile);
      callbackFunc(profile, err);
    });
  };

  userHasScopes(scopes) {
    const grantedScopes = (
      JSON.parse(localStorage.getItem("scopes")) || ""
    ).split(" ");

    return scopes.every((scope) => grantedScopes.includes(scope));
  }

  render() {
    return <div></div>;
  }
}

export default Auth;
