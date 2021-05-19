import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from 'component/App';
import { cardCache } from 'utility/card';

ReactDOM.render(
  <React.StrictMode>
    <App cache={cardCache} />
  </React.StrictMode>,
  document.getElementById('root')
);
