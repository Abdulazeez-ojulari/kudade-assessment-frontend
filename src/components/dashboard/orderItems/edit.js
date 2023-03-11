
import { useEffect, useState } from 'react';
import Header from '../../Header/Header'
import SideNav from '../../Header/sidenav'
// import styles from '../../dashboard/OrderItemForm.module.css';
import '../profile.css';
import { connect } from 'react-redux';
import GoBack from '../../goBack';

const OrderItemForm = () => {
    const [formState, setFormState] = useState({
        product_id: '',
        product_category: '',
        price: '',
        date: '',
      });
    const { product_id, product_category, price, date } = formState;
    
    useEffect(() => {
        console.log(localStorage.getItem('editOrderItem'))
        if(localStorage.getItem('editOrderItem')){
            let orderItems = JSON.parse(localStorage.getItem('editOrderItem'))
            setFormState(orderItems)
        }
    }, [])

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            {/* <div className="alert">
                {status === "error" && <div className="alert-danger">{message}</div>}
                {status === "success" && <div className="alert-success">{message}</div>}
            </div> */}
        <Header />
        <SideNav />
        <div className="center">
            <div className="createstore">
                <div className="header2">
                    <div className="header2_col_1">
                        <GoBack />
                    </div>
                </div>
                <div className="profile_basic_info_con">
                    <h3>Edit Item</h3>
                    <div className="profile_basic_info">
                        <div className="profile_form">
                            <div className="profile_form_group">
                                <label htmlFor="product_id" className="profile_form_label">Product Id</label>
                                <input 
                                type="text"
                                name="product_id"
                                value={product_id}
                                placeholder="Product Id"
                                onChange={handleChange}
                                className="profile_form_input" />
                                {/* {this.props.errors.accountname && <div className="errorMsg">{this.props.errors.accountname}</div>} */}
                            </div>
                            
                            <div className="profile_form_group">
                                <label htmlFor="product_category" className="profile_form_label">
                                Product Category
                                </label>
                                <input
                                type="text"
                                name="product_category"
                                value={product_category}
                                placeholder="Product Category"
                                onChange={handleChange}
                                className="profile_form_input"
                                />
                            </div>
                            <div className="profile_form_col_2">
                                <div className="profile_form_group">
                                    <label htmlFor="price" className="profile_form_label">Price</label>
                                    <input value={price} onChange={handleChange}  name="price" type="text" className="profile_form_input" />
                                    {/* {this.props.errors.price && <div className="errorMsg">{this.props.errors.accountname}</div>} */}
                                </div>
                                <div className="profile_form_group">
                                    <label htmlFor="date" className="profile_form_label">Date</label>
                                    <input defaultValue={date} onChange={handleChange} name="date" type="datetime-local" className="profile_form_input" />
                                    {/* {this.props.errors.lastname && <div className="errorMsg">{this.props.errors.lastname}</div>} */}
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        </div>
    )
}

// export default OrderItemForm

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(OrderItemForm);