import { OrderIcon, PowerIcon, UserIcon } from '../icons';

import './header.css'
import { connect } from "react-redux";
import React from 'react';
import { setOpenLogin, userSignOut } from '../../actions';
// import { useRouter } from 'next/router';

function SideNav2(props){
    // const router = useRouter()

    function toggleLogin (){
        props.setOpenLogin(!props.openLogin)
    }

    function logout(){
        props.logout()
        window.location.assign('/login')
    }

    return(
        <div className="sidenav_links_con">
            <div className="sidenav_links">
                {props.auth.authUser &&
                <React.Fragment>
                    <a href="/">
                        <div className={"sidenav_link " + (props.path === '/' && "active")}>
                            <OrderIcon style="sidenav_link_icon" />
                            Order Items
                        </div>
                    </a>
                    <a href="/userprofile">
                        <div className={"sidenav_link " + (props.path === '/userprofile' && "active")}>
                            <UserIcon style="sidenav_link_icon" />
                            My Profile
                        </div>
                    </a>
                </React.Fragment>
                }
            </div>
            <div className="side_bottom">
                {props.auth.authUser &&
                <div onClick={logout} className="sidenav_link">
                    <PowerIcon style="sidenav_link_icon" />
                        <p>Logout</p>
                </div>}
                {!props.auth.authUser &&
                <div onClick={toggleLogin} className="sidenav_link">
                    <PowerIcon style="sidenav_link_icon" />
                        <p>Log In</p>
                </div>}
            </div>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
      logout: () => dispatch(userSignOut()),
      setOpenLogin: (login) => dispatch(setOpenLogin(login)),
    };
  }
  
  function mapStateToProp(state) {
    return {
      path: state.Common.path,
      openLogin: state.Auth.openLogin,
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
    mapDispatchToProps,
  )(SideNav2);