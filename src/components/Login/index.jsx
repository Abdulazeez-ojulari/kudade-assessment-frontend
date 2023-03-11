import React, { useState } from "react";
import "./style.css";
// import { Form, Button, Container, Modal, Row, Col } from "react-bootstrap";
// import Axios from "axios";
import { connect } from 'react-redux';
import { userSignIn } from '../../actions';

function Login(props){
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formState;
  console.log(props)

  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function Login(e){
    e.preventDefault();
    props.login(username, password);
  }

  return(
    <>
      <div className="alert">
          {props.message.length > 0 && 
          <div className="alert-success">
            {props.message}
          </div>}
          {props.error.length > 0 &&
          <div className="alert-danger">
            {props.error}
          </div>}
        </div>
      <div className="login">
        <div className="login_col_2">
          <div className="login_top">
          <div onClick={props.toggleLogin} className="login_cancel_con show">
              {/* <img src={closeIcon} className="login_cancel} /> */}
            </div>
            {/* <img
                src={img_logo}
                alt="logo"
                className="login_main_logo_img}
              /> */}
          </div>
          <h2>Welcome Back</h2>
          <h3>Login</h3>
          <div className="login_form">
            <div className="login_form_group">
              <label htmlFor="username" className="login_form_label">
                Username
              </label>
              <input
                type="text" name="username" value={username} placeholder="Your username" 
                onChange={onChange}
                className="login_form_input"
              />
            </div>
            <div className="login_form_group">
              <label htmlFor="password" className="login_form_label">
                Password
              </label>
              <input
                type={"password"} name="password"
                value={password} placeholder="Your password"
                onChange={onChange}
                className="login_form_input"
              />
              
            </div>
          </div>

          <button 
           onClick={Login}
           className="login_button">Login</button>

        </div>   
        <div style={{gridTemplateRows: '1fr'}} className="login_col_1">
          
          <h3>
            Add Convenience to your Home Made Meals
          </h3>
        </div>    
      </div>
    </>
  )
}

function mapStateToProp(state) {
  return {
    auth: state.Auth,
    error: state.Common.error,
    message: state.Common.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(userSignIn(username, password))
  };
}

// export default Login;

export default connect(
  mapStateToProp,
  mapDispatchToProps,
)(Login);
