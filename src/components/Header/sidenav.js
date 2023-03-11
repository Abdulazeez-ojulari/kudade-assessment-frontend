
import './header.css'
import React from "react";
// import openIcon from "../../../public/assets/icons/eva_menu-open.png"
// import closeIcon from "../../../public/assets/icons/eva_menu-close.png"
import Sidenav2 from './sidenav2';
import { connect } from 'react-redux';
import { CloseFillIcon, UserIcon } from '../icons';

 
function SideNav(props){

    function openSidenav(e){
        document.getElementById('mySidenav').style.display = 'grid';
        document.addEventListener('click', (e) => {
          if(document.getElementById('mySidenav')){
            if(e.target.id !== 'openIcon' && 
              e.target.id !== 'openbutton' &&
              e.target.id !== 'side_top'
            ){
              console.log(e)
              document.getElementById('mySidenav').style.display = 'none';
            }
          }
        })
    
        window.event.returnValue = false
    }

  return(
    <div className="navbar_side">
        <div
        id="openbutton"
        className="openbtn"
        aria-label="Toggle Sidebar"
        >
        <button onClick={openSidenav} id='openIcon' >☰</button>
        </div>
        <div id="mySidenav" className="sidenav">
            <div id='side_top' className="sidenav_top">
                <div className="sidenav_top_row_1">
                  <CloseFillIcon style="actionIcon" />
                <a href="/" className="social_link">
                    {/* <img src={img_logo} alt="logo" className="sidenav_logo} /> */}
                
                </a>
                </div>
                {props.auth.authUser && 
                <div className="sidenav_top_row_2">
                    <UserIcon />
                </div>
                }
            </div>
            <Sidenav2 showBottom={true} />
        </div>
    </div>
  )
}

// export default SideNav;

function mapStateToProp(state) {
  return {
    path: state.Common.path,
    auth: state.Auth
  };
}

export default connect(
  mapStateToProp,
)(SideNav);