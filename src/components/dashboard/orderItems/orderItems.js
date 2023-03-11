
import Header from '../../Header/Header';
import SideNav from '../../Header/sidenav';
import '../dashboard.css'
import './orderItems.css'
import { ArrowDownIcon, FillterIcon } from '../../icons';

import Sidenav2 from '../../Header/sidenav2';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import OrderItemRow from './orderItemRow';
import { axiosClient } from '../../../util/http-setting';
import Popup from '../../popups/popup1';

const OrderItems = (props) => {
    const [order_items, setOrderItemsState] = useState([])
    const [limit, setLimitState] = useState(20);
    const [sortBy, setSortByState] = useState("shipping_limit_date");
    const [page, setPageState] = useState(1);
    const [pages, setPagesState] = useState(1);
    const [order_itemCount, setOrderItemsCountState] = useState(0);
    const [status2, setStatus2State] = useState('');
    const [message, setMessageState] = useState('');
    const [changeLimit, setChangeLimitState] = useState(false)
    const [openModal, setOpenModalState] = useState(false)
    const [orderItem, setOrderItemState] = useState({})
    const [loading, setLoadingState] = useState(false)
    

    useEffect(() => {
        if(localStorage.getItem('kudade_auth_key')){
            let kudade_auth_key = localStorage.getItem('kudade_auth_key')
            axiosClient.defaults.headers.common['Authorization'] = "Basic " + kudade_auth_key;
            getOrderItems()
        }
    }, [props.auth]);

    async function nextPage (newPage=page + 1) {
        if(page < pages){
            setPageState(newPage)
            
            getOrderItems(limit, newPage)
        }
      };
    
    async function prevPage (newPage=page - 1) {
        if(page > 1){
            setPageState(newPage)
            getOrderItems(limit, newPage)
        }
      };

    function getOrderItems(newLimit= limit, newPage=page, newSort=sortBy){
        setLoadingState(true)
        axiosClient.get("/order_items?limit="+newLimit+"&offset="+newPage+"&sortBy="+newSort).then(res => {
            if(res.data.data){
                setOrderItemsCountState(res.data.total)
                if(res.data.total > res.data.limit){
                    setPagesState(Math.ceil(res.data.total/res.data.limit))
                }else{
                    setPagesState(1)
                }
                setOrderItemsState(res.data.data)
            }
            setLoadingState(false)
        })
    }

    function toggleChangeLimit(){
        setChangeLimitState(!changeLimit)
    }

    function handleLimitChange(value) {
        setLimitState(value)
        getOrderItems(value)
        toggleChangeLimit()
    }

    function handleSortChange(value){
        setSortByState(value)
        setPageState(1)
        getOrderItems(limit, page, value)
    }

    function openDetailsModal(orderItem){
        setOrderItemState(orderItem)
        setOpenModalState(true)
    }

    function closeModal() {
        setOpenModalState(false)
    }

    function deleteOrderItem(id){
        setLoadingState(true)
        axiosClient.delete("http://localhost:3000/order_items/"+id).then(res => {
            console.log(res.data)
            setStatus2State('success')
            setMessageState('Order item deleted')
            setTimeout(() => {
                setStatus2State('')
                setMessageState('')
            }, 5000)
            getOrderItems()
            closeModal()
        }).catch(error => {
            setStatus2State('error')
            setMessageState('Order item not deleted')
            setTimeout(() => {
                setStatus2State('')
                setMessageState('')
            }, 5000)
            setLoadingState(false)
        });
    }

    return (
    <div className="container col2">
            <div className="alert">
                {status2 === "error" && <div className="alert-danger">{message}</div>}
                {status2 === "success" && <div className="alert-success">{message}</div>}
                {loading && 
                    <div className="spinner-container">
                        <div className="spinner">
                            <div className="spinner-box box-1"></div>
                            <div className="spinner-box box-2"></div>
                            <div className="spinner-box box-3"></div>
                            <div className="spinner-box box-4"></div>
                        </div>
                    </div>
                }
            </div>
        <Header />
        <SideNav />
        <div className="left">
            <Sidenav2 showBottom={false} />
        </div>
        <div className="empty"></div>
        <div className="center">
            <>
                <h3>Order Items</h3>
                <div className="orderItem_container">
                    <div className="orderItem_container_top">
                        <p>{order_itemCount} Items found</p>
                        <div className="select_container">
                            <div onClick={toggleChangeLimit} className="select_box">
                                <p>{limit}</p>
                                <ArrowDownIcon style="navbar_user_icon" />
                            </div>
                            {changeLimit &&
                                <div className="select_options2">
                                    <p onClick={() => handleLimitChange(20)}>20</p>
                                    <p onClick={() => handleLimitChange(30)}>30</p>
                                    <p onClick={() => handleLimitChange(40)}>40</p>
                                    <p onClick={() => handleLimitChange(50)}>50</p>
                                    <p onClick={() => handleLimitChange(60)}>60</p>
                                    <p onClick={() => handleLimitChange(70)}>70</p>
                                    <p onClick={() => handleLimitChange(80)}>80</p>
                                    <p onClick={() => handleLimitChange(90)}>90</p>
                                    <p onClick={() => handleLimitChange(100)}>100</p>
                                </div>}
                        </div>
                    </div>
                    <div className="orderItem">
                    <div className="request_table">
                        <div>
                        <div className="request_tr customer_request_tr">
                            <input name='id' type="checkbox" />
                            {/* <p className="request_th">ID number</p> */}
                            <p className="request_th">ID</p>
                            <p className="request_th">Product Category</p>
                            <p onClick={() => handleSortChange('price')} className="request_th filterth">Price <FillterIcon /></p>
                            <p onClick={() => handleSortChange('shipping_limit_date')} className="request_th filterth">Date Created <FillterIcon /></p>
                        </div>
                        </div>
                        <div>
                            {
                                order_items && order_items.map((order_item) => {
                                    return(
                                        <OrderItemRow openDetailsModal={openDetailsModal} auth={props.auth} key={order_item._id} orderItem={order_item} />
                                    )
                                })
                            }

                        </div>
                    </div>
                    {order_itemCount > 0 &&
                    <div className="user_pagination">
                        <div>
                            {
                                page > 1 &&
                                <>
                                    <p onClick={() => prevPage(1)} className="paginate_btn">&lt;&lt;</p>
                                    <p onClick={() => prevPage()} className="paginate_btn">&lt;</p>
                                </>
                            }

                            {
                                page < pages &&
                                <>
                                    <p onClick={() => nextPage()} className="paginate_btn">&gt;</p>
                                    <p onClick={() => nextPage(pages)} className="paginate_btn">&gt;&gt;</p>
                                </>
                            }
                            
                        </div>
                        <p>{'' + page + ' of ' + pages}</p>
                    </div>
                    }
                    </div>
                </div>
            </>
        </div>
        
        {openModal && 
            <Popup deleteOrderItem={deleteOrderItem} popup='Order Item' openModal={openModal} closeModal={closeModal}
                orderItem={orderItem}
          />
        }
    </div>
    )
}

// export default OrderItems

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(OrderItems);