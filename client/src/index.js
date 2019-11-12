import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import index.css once it's created
import 'client/src/styles/index.scss';
// import api routes once they're created
import Routes from './routes';
// import redux store once it's created
import store from './store';

ReactDOM.render(
// Grab the store from redux using the Provider object
// Display the api routes in order to load the app
    <Provider store={store}>
        <Routes />
    </Provider>,


    document.getElementById('root'));