import { connect } from "react-redux";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import OrderItemForm from "./components/dashboard/orderItems/edit";
import OrderItems from "./components/dashboard/orderItems/orderItems";
import UserProfile from "./components/dashboard/userprofile";
import Login from './components/Login';

function AppRoutes() {
  
  return (
    <Router>
        <Routes>
            <Route exact path="/login"  
            element={ <Login /> }
            />
            <Route exact path="/" element={<OrderItems />} />
            <Route exact path="/order-item/:id" element={<OrderItemForm />} />
            <Route exact path="/userprofile" element={<UserProfile />} />
        </Routes>
    </Router>
  );
}

// export default AppRoutes;


function mapStateToProp(state) {
  return {
    auth: state.Auth
  };
}

export default connect(
  mapStateToProp,
)(AppRoutes);