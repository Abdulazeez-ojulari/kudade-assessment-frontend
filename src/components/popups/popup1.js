import React, { Component } from "react";
import './popup.css';
import { CloseFillIcon } from '../icons';

class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_fetched: false,
        };
    }

    edit = () => {
        localStorage.setItem('editOrderItem', JSON.stringify(this.props.orderItem))
        window.location.assign('/order-item/'+this.props.orderItem.id)
    }

    render() {
        console.log(this.props)

        // const { popup, imageData, imagesData, name, description, categories, descriptionsList, ingredientList, sizesList } = this.props
        // console.log(ingredientList)

        return (
            <>
                {this.props.openModal &&
                    <div className="popup_container">
                        <div className="popup">
                            <div className="popup_col_2">
                                <div className="popup_top">
                                    <div></div>
                                    <div onClick={this.props.closeModal}  className="popup2_cancel_con" >
                                        <CloseFillIcon style="actionIcon" />
                                    </div>
                                    
                                </div>
                                <div className="popup_details">
                                    <h2 className="popup_name">Order Id: {this.props.orderItem.id}</h2>
                                    
                                    <div className="popup_categories">
                                        <h3 className="popup_category_name">Product Id</h3>
                                        <p className="popup_category">{this.props.orderItem.product_id}</p>
                                    </div>
                                    <div className="popup_categories">
                                        <h3 className="popup_category_name">Product Category</h3>
                                        <p className="popup_category">{this.props.orderItem.product_category}</p>
                                    </div>
                                    <div className="popup_categories">
                                        <h3 className="popup_category_name">Price</h3>
                                        <p className="popup_category">{this.props.orderItem.price}</p>
                                    </div>
                                    <div className="popup_categories">
                                        <h3 className="popup_category_name">Date</h3>
                                        <p className="popup_category">{this.props.orderItem.date}</p>
                                    </div>
                                </div>
                                <div className="popup_footer">
                                    <button onClick={this.edit} className="edit_button2">Edit</button>
                                    <i onClick={() => this.props.deleteOrderItem(this.props.orderItem.id)}>
                                        <CloseFillIcon style="actionIconDel" />
                                    </i>
                                </div>
                            </div>


                        </div>
                    </div>}
            </>
        )
    };

}

export default Popup;