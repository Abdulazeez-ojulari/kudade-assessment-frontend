import './App.css';
import { Provider } from "react-redux";

import { store } from "./store";
import AppRoutes from './routes';

// export const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
