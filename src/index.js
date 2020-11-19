import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from "./router/AppRouter"
import 'antd/dist/antd.css';
import { Provider } from "react-redux"
import configureStore from "./store"

const store = configureStore()

ReactDOM.render(
  
  <Provider store={store}>
  <AppRouter>
      
  </AppRouter>
  </Provider>,
  document.getElementById('root')
);
