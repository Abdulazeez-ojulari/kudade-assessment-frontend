import './orderItems.css'

function OrderItemRow(props){
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]

    const {orderItem} = props;

    return(
        <div onClick={() => props.openDetailsModal(orderItem)} key={orderItem.id} className="request_tr_div">
            <div className="refId request_tr customer_request_tr">
                <input name='id' type="checkbox" />
                <p className="request_td">{orderItem.id}</p>
                <p className="request_td ">
                    {orderItem.product_category}
                </p>
                <p className="request_td">{orderItem.price}</p>
                <p className="request_td">{orderItem.date && new Date(orderItem.date).getDate() + ' ' + months[new Date(orderItem.date).getMonth()] + ' ,'+ new Date(orderItem.date).getFullYear()}</p>
                
            </div>
        </div>
    )
    
}

export default OrderItemRow;