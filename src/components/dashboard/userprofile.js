
import { useEffect, useState } from 'react';
import Header from '../Header/Header'
import SideNav from '../Header/sidenav'
// import styles from '../dashboard/UserProfile.module.css';
import './profile.css';
import { connect } from 'react-redux';
import Sidenav2 from '../Header/sidenav2';
import { axiosClient } from '../../util/http-setting';

const UserProfile = (props) => {
    const [status2, setStatus2State] = useState('');
    const [message, setMessageState] = useState('');
    const [formState, setFormState] = useState({
        seller_city: '',
        seller_state: ''
      });
    const { seller_city, seller_state } = formState;
    
    useEffect(() => {
        if(localStorage.getItem('kudade_user')){
            let userProfile = JSON.parse(localStorage.getItem('kudade_user'))
            setFormState(userProfile)
        }
    }, [])

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    function updateProfile(){
        if(localStorage.getItem('kudade_auth_key')){
            let kudade_auth_key = localStorage.getItem('kudade_auth_key')
            axiosClient.defaults.headers.common['Authorization'] = "Basic " + kudade_auth_key;
            axiosClient.put("/account", {
                seller_city: formState.seller_city,
                seller_state: formState.seller_state
            }).then(res => {
                if(res.data.data){
                    console.log(res)
                    setStatus2State('success')
                    setMessageState('Profile updated')
                    setTimeout(() => {
                        setStatus2State('')
                        setMessageState('')
                    }, 5000)
                    localStorage.setItem("kudade_user", JSON.stringify(res.data.data))
                }else{
                    setStatus2State('error')
                    setMessageState('Profile not updated')
                    setTimeout(() => {
                        setStatus2State('')
                        setMessageState('')
                    }, 5000)
                }
            }).catch(err => {
                setStatus2State('error')
                setMessageState('Profile not updated')
                setTimeout(() => {
                    setStatus2State('')
                    setMessageState('')
                }, 5000)
            })
        }
    }

    return (
        <div className="container col2">
            <div className="alert">
                {status2 === "error" && <div className="alert-danger">{message}</div>}
                {status2 === "success" && <div className="alert-success">{message}</div>}
            </div>
        <Header />
        <SideNav />
        <div className="left">
            <Sidenav2 showBottom={false} />
        </div>
        <div className="empty"></div>
        <div className="center">
            <div className="createstore">
                <div className="profile_basic_info_con">
                    <h3>User Profile</h3>
                    <div className="profile_basic_info">
                        <div className="profile_form">
                            <div className="profile_form_col_2">
                                <div className="profile_form_group">
                                    <label htmlFor="seller_city" className="profile_form_label">City</label>
                                    <input value={seller_city} onChange={handleChange}  name="seller_city" type="text" className="profile_form_input" />
                                    {/* {this.props.errors.price && <div className="errorMsg">{this.props.errors.accountname}</div>} */}
                                </div>
                                <div className="profile_form_group">
                                    <label htmlFor="seller_state" className="profile_form_label">State</label>
                                    <input value={seller_state} onChange={handleChange} name="seller_state" type="text" className="profile_form_input" />
                                    {/* {this.props.errors.lastname && <div className="errorMsg">{this.props.errors.lastname}</div>} */}
                                </div>
                            </div>
                            <button className="profile_button" onClick={updateProfile}>Update</button>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        </div>
    )
}

// export default UserProfile

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(UserProfile);