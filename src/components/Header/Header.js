
import './header.css'
import React, { useEffect } from "react";
import { ArrowDownIcon, ArrowLeftFillIcon, CartIcon, DashBoardIcon, HomeIcon, Order2Icon, UserIcon } from "../icons";
// import { Auth } from "../auth";
import { connect } from "react-redux";
import { getPath } from "../../actions/Common";
import { setOpenLogin, userSignOut, verifyToken } from "../../actions";

 
function Header(props){

  useEffect(() => {
    props.getPath(window.location.pathname)
    let token = localStorage.getItem('kudade_auth_key');
    let time = localStorage.getItem('kudade_in');
    if(token !== null && time !== null){
      const msInMinute = 60 * 1000;
      let min = Math.abs(Date.now() - time) / msInMinute;
      if(min > 30){
        localStorage.removeItem('kudade_auth_key');
        localStorage.removeItem('kudade_in');
        localStorage.removeItem('kudade_user');
        window.location.assign('/login')
      }else{
        let user = JSON.parse(localStorage.getItem('kudade_user'));
        props.verifyToken(user.seller_id, user.seller_zip_code_prefix)
      }
    }else{
      localStorage.removeItem('kudade_auth_key');
      localStorage.removeItem('kudade_in');
      localStorage.removeItem('kudade_user');
      window.location.assign('/login')
    }
  }, []);

  function toggleUserDetails(e){
    document.getElementById('userdetails').style.display = 'grid';
    document.addEventListener('click', (e) => {
      if(document.getElementById('userdetails')){
        if(e.target.id !== 'userImg' && 
          e.target.id !== 'usericon' &&
          e.target.id !== 'userName'
        )
        document.getElementById('userdetails').style.display = 'none';
      }
    })

    window.event.returnValue = false
  }

  function toggleLogin (){
    props.setOpenLogin(!props.openLogin)
  }

  function logout(){
    props.logout()
  }

  return(
    <>
      <div className="navbar">
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
        <div className="navbar_top_container">
          <div className="navbar_top">
            <a href='/' className="navbar_top_logo_img">
              {/* <img
                src={img_logo}
                alt="logo"
                
              /> */}
            </a>
            <div className="navbar_top_details">
              {(!props.auth.isAuthenticated || props.auth.authUser === null) ?
              // <a href='/login'>
              // <a className="navbar_user_loginbtn">
                  <div onClick={toggleLogin} className="navbar_user_loginbtn">
                    Log In/Register
                  </div>
              // </a>[//\\][//\\][Aa1]
              // </a>
              :
              <div className="navbar_user_info">
                {props.auth.authUser.profile_picture ? 
                <img id="userImg" onClick={(e) => toggleUserDetails(e)} src={props.auth.authUser.profile_picture} alt='User' className="navbar_user_img"/>:
                <UserIcon style="navbar_main_link_icon" />}
                <h2 id="userName" onClick={(e) => toggleUserDetails(e)} className="navbar_user_name">{props.auth.authUser.first_name}</h2>
                <ArrowDownIcon id="usericon" onClick={(e) => toggleUserDetails(e)} style="navbar_user_icon" />
                <div id="userdetails" className="navbar_user_signedin">
                  
                  <a href='/dashboard'>
                    <div className="navbar_user_signedin_link black">
                      <DashBoardIcon style="navbar_main_link_icon" />
                      <h3>Dashboard</h3>
                    </div>
                  </a>
                  <a href='/dashboard/userprofile'>
                    <div className="navbar_user_signedin_link black">
                      {/* <img src={openIcon} alt="profile" /> */}
                      <UserIcon style="navbar_main_link_icon" />
                      <h3>Profile</h3>
                    </div>
                  </a>
                  <div className="navbar_user_signedin_logout">
                    <div>
                      <div onClick={logout} className="navbar_user_signedin_link white">
                        <ArrowLeftFillIcon style="navbar_main_link_icon2" />
                        <h3>Logout</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              }
              <button className="navbar_user_upgradebtn">Upgrage</button>
            </div>
          </div>
        </div>
        
      </div>
      <div className="navbar_down">
        <div className="navbar_down_col ">
          <a href='/'>
            <HomeIcon style="navbar_down_col_icon" />
            <p>Home</p>
          </a>
        </div>
        <div className="navbar_down_col">
          <a href='/dashboard/orders/orders'>
            <Order2Icon style="navbar_down_col_icon" />
            <p>Order</p>
          </a>
        </div>
        <div className="navbar_down_col ">
          <a href='/cart'>
            <CartIcon style="navbar_down_col_icon" />
            <p>Cart</p>
          </a>
        </div>
      </div>
      {/* {props.openLogin &&
      <Auth toggleLogin={toggleLogin} />} */}
    </>
  )
}

// export default Header;

function mapDispatchToProps(dispatch) {
  return {
    getPath: path => dispatch(getPath(path)),
    setOpenLogin: login => dispatch(setOpenLogin(login)),
    verifyToken: (username, password) => dispatch(verifyToken(username, password)),
    logout: () => dispatch(userSignOut()),
  };
}

function mapStateToProp(state) {
  return {
    auth: state.Auth,
    openLogin: state.Auth.openLogin,
    error: state.Common.error,
    message: state.Common.message,
  };
}

export default connect(
  mapStateToProp,
  mapDispatchToProps,
)(Header);

export function Header2(){
    
  return(
    <div className="navbar2">
      <div className="navbar_main_container">
        <div className="navbar_main">
          <ul className="navbar_main_links">
            <li className="navbar_main_link">
              <p >Store</p>
            </li>
            <li className="navbar_main_link">
              <p >Meals</p>
            </li>
            <li className="navbar_main_link">
              <p >Product</p>
            </li>
            <li className="navbar_main_link">
              <p >Kitchen Utensils</p>
            </li>
          </ul>
          
          <div className="navbar_main_grocery">
              <p >Grocery Lists</p>
          </div>
        </div>
      </div>
    </div>
  )
}
